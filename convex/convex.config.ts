import { defineApp } from "convex/server";
import agent from "@convex-dev/agent/convex.config";
import staticHosting from "@convex-dev/static-hosting/convex.config";

// Auth discovery and static files share the app's root HTTP router.
const app = defineApp();
app.use(staticHosting);
app.use(agent);

export default app;
