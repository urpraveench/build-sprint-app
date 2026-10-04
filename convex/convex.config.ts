import { defineApp } from "convex/server";
import staticHosting from "@convex-dev/static-hosting/convex.config";

// Auth discovery and static files share the app's root HTTP router.
const app = defineApp();
app.use(staticHosting);

export default app;
