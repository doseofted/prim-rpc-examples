# Client/Server Example

In this example, a web server and web browser are bridged with Prim+RPC.

The web server ([`server.ts`](./server.ts)) is pre-configured to use
[Fastify](https://github.com/fastify/fastify) and
[WS Server](https://github.com/websockets/ws) for HTTP and WebSocket connections
respectively (you don't need to be familiar with either to use this example).
Prim+RPC has plugins for both of these frameworks (as well as others).
CORS-specific headers have also been configured so the client can communicate
with the server. The server is ran with
[tsx](https://github.com/esbuild-kit/tsx) which is just a convenient wrapper
around Node to run TypeScript directly.

The client ([`client.ts`](./client.tsx)) is a
[Solid](https://github.com/solidjs/solid) app created using
[Vite](https://github.com/vitejs/vite) (you don't need to be familiar with
either to use this example). It utilizes the Prim+RPC client and uses the web
browser's Fetch and WebSocket API to connect to the web server.

You can start both the server and client, at the same time, by running the
"start" helper script:

```zsh
npm start
```
