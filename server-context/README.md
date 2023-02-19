# Server Context Example

In this example, a web server and web browser are bridged with Prim+RPC. The
project setup is similar to the [Client / Server Example](../client-server)
however in this example the server sets and reads from a cookie through
functions defined with Prim+RPC. This is an example of passing server context to
your defined functions.

> **Note** For cookie to be properly set, visit URL given in
> [server/index.ts](./server/index.ts#L26)

Notice that when you change the name on the page and refresh that the name is
still saved. This cookie is saved to a cookie that's unavailable to the webpage
unless requested from the server.

You can start both the server and client, at the same time, by running the
"start" helper script:

```zsh
pnpm install
pnpm start
```
