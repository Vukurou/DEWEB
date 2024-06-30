import { file, serve } from "bun";

serve({
  port: 3000,
  fetch(req) {
    // Serve all HTTP requests from the `public` directory
    if (req.url.startsWith("/")) {
      return file(`./public${req.url === "/" ? "/index.html" : req.url}`);
    }

    return new Response("Page not found", { status: 404 });
  },
});

console.log("Server running on http://localhost:3000");
