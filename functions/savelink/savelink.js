// import { S3Client } from "@aws-sdk/client-s3";
import fetch from "node-fetch"

// const s3 = new S3Client();

// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
const handler = async (event) => {
  try {
    // TODO: check auth headers (how do I get secrets?)
    // const body = JSON.parse(event.body);
    const links = await getLinks();

    return {
      statusCode: 200,
      body: JSON.stringify(links),
    };
  } catch (error) {
    return { statusCode: 500, body: error.toString() };
  }
};

async function getLinks() {
  const resp = await fetch("https://linksave-data.s3.amazonaws.com/linksave.json");
  if (!resp.ok) throw new Error("Response not ok!")
  return await resp.json();
}

module.exports = { handler };