// Simple server to serve vector tiles locally for development purposes.

function addCors(response: Response): Response {
  response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  return response;
}

Bun.serve({
  port: 3030,
  routes: {
    "/tiles/:set/:z/:x/:y": async (req) => {
      const file = `./output/tiles/${req.params.set}/${req.params.z}/${req.params.x}/${req.params.y}`;
      try {
        const data = await Bun.file(file).arrayBuffer();
        return addCors(
          new Response(data, {
            headers: {
              "Content-Type": "application/x-protobuf",
              "Content-Encoding": "gzip",
              "Cache-Control": "public, max-age=60",
            },
          })
        );
      } catch (error) {
        return addCors(
          new Response("Tile not found", {
            status: 404,
            headers: { "Content-Type": "text/plain" },
          })
        );
      }
    },
    "/hillshade/:z/:x/:y": async (req) => {
      const file = `./output/hillshade/${req.params.z}/${req.params.x}/${req.params.y}`;
      try {
        const data = await Bun.file(file).arrayBuffer();
        return addCors(
          new Response(data, {
            headers: {
              "Content-Type": "image/png",
              "Cache-Control": "public, max-age=60",
            },
          })
        );
      } catch (error) {
        return addCors(
          new Response("Tile not found", {
            status: 404,
            headers: { "Content-Type": "text/plain" },
          })
        );
      }
    },
  },
});
