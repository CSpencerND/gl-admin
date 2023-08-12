import { createNextRouteHandler } from "uploadthing/next";

import { utFileRouter } from "./core";

// Export routes for Next App Router
export const { GET, POST } = createNextRouteHandler({
    router: utFileRouter,
});
