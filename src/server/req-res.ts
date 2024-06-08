export const wrapHandler = (handler: (req: Request) => Promise<any>) => {
  return async (req: Request) => {
    let data = null;
    let error = null;

    await handler(req)
      .then((result) => {
        data = result;
      })
      .catch((e) => {
        error = e instanceof Error ? e.message : "An error occurred";
      });

    return new Response(JSON.stringify({ error, data }), {
      status: error ? 400 : 200,
      headers: { "Content-Type": "application/json" },
    });
  };
};
