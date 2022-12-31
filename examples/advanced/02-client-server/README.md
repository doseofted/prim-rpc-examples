# Client/Server Example

In this example, a separate client and server are bridged with Prim+RPC.

The server (contained in [`server.ts`](./server.ts)) is pre-configured to use
[Fastify](https://github.com/fastify/fastify) and
[WS Server](https://github.com/websockets/ws) for HTTP and WebSocket connections
respectively. Prim+RPC has plugins for both of these frameworks. The server is
served with [tsx](https://github.com/esbuild-kit/tsx) which is a wrapper around
Node to run TypeScript without the explicit compilation step.

The client (contained in [`client.ts`](./client.tsx)) is a
[Solid](https://github.com/solidjs/solid) app created using
[Vite](https://github.com/vitejs/vite). It utilizes the Prim+RPC client and uses
the browser's Fetch and WebSocket API to connect to the server.
