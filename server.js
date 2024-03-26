import { file, serve } from "bun";

serve({
  port: 3000,
  fetch(req) {
    // Leite alle HTTP-Anfragen an das `public`-Verzeichnis weiter
    if (req.url.startsWith("/")) {
      return file(`./public${req.url === "/" ? "/index.html" : req.url}`);
    }

    return new Response("Seite nicht gefunden", { status: 404 });
  },
});

console.log("Server läuft auf http://localhost:3000");
