import {
  Type,
  type TSchema,
  type Static,
  TypeBoxError,
} from "@sinclair/typebox";
import { Value, ValueError } from "@sinclair/typebox/value";

const ANTHROPIC_API_KEY = Deno.env.get("ANTHROPIC_API_KEY");
const ANTHROPIC_URL = "https://api.anthropic.com";

class AnthropicError extends Error {}

interface LlmTool {
  name: string;
  description: string;
  input_schema: TSchema;
}

/**
 * Extracts data from content using a tool from the LLM.
 */
export async function useTool<TTool extends LlmTool = LlmTool>(
  content: string,
  tool: TTool
): Promise<Static<TTool["input_schema"]>> {
  const resp = await fetch(`${ANTHROPIC_URL}/v1/messages`, {
    method: "POST",
    headers: {
      "x-api-key": `${ANTHROPIC_API_KEY}`,
      "content-type": "application/json",
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-3-5-sonnet-20240620",
      max_tokens: 4096,
      system: [
        "You are an assistant optimized for performing operations on text data.",
        "A user will provide you with content, and you will use the tool you have",
        "available to perform an operation on it, described by the tool.",
      ].join("\n"),
      messages: [
        { role: "user", content: `Here is the content:\n\n---\n\n${content}` },
      ],
      tools: [
        {
          ...tool,
          // Convert this from a typebox schema to a JSON schema.
          input_schema: Type.Strict(tool.input_schema),
        },
      ],
      tool_choice: {
        type: "tool",
        name: tool.name,
      },
    }),
  });

  if (!resp.ok) {
    throw new AnthropicError("anthropic request failed", {
      cause: { status: resp.status, text: await resp.text() },
    });
  }

  const LlmMessageResponseSchema = Type.Object({
    content: Type.Array(
      Type.Object({
        type: Type.Literal("tool_use"),
        name: Type.String(),
        input: tool.input_schema,
      }),
      { minItems: 1, maxItems: 1 }
    ),
  });

  const respJson = await resp.json();

  if (!Value.Check(LlmMessageResponseSchema, respJson)) {
    const errors = [...Value.Errors(LlmMessageResponseSchema, respJson)];
    throw new AnthropicError("failed to decode response from anthropic", {
      cause: errors,
    });
  }

  const data = Value.Decode(LlmMessageResponseSchema, respJson);
  return data.content[0].input;
}
