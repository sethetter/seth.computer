import serve from "lume/cms/server/proxy.ts";

const ADMIN_USER = {
  username: Deno.env.get("LUME_CMS_ADMIN_USER") ?? "admin",
  password: Deno.env.get("LUME_CMS_ADMIN_PASS"),
};

if (!ADMIN_USER.password) {
  throw new Error("Must set LUME_CMS_ADMIN_PASS");
}

export default serve({
  serve: "_cms.lume.ts",
  git: true,
  auth: {
    method: "basic",
    users: {
      [ADMIN_USER.username]: ADMIN_USER.password,
    },
  },
  env: {
    LUME_LOGS: "error",
  },
});
