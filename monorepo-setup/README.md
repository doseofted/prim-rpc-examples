# Monorepo Example

<!-- [![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz_small.svg)](https://stackblitz.com/github/doseofted/prim-rpc-examples/tree/main/monorepo-setup) -->

In this example, a web server and web browser are bridged with Prim+RPC. This is
very similar to the [Client / Server Example](../client-server) except that this
example splits the client, server, and module into separate packages in a
monolithic repository (monorepo).

See the [Client / Server Example](../client-server) to understand how the client
and server packages are configured. The "module" package is simply a plain
JavaScript module and is used directly by the server while its type definitions
are used by the client.

You can start this example by running the helper script (configured with
[Turbo](https://github.com/vercel/turbo)):

```zsh
pnpm install
pnpm start
```
