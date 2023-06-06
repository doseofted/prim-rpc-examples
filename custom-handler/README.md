# Custom JSON Handler Example

<!-- [![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz_small.svg)](https://stackblitz.com/github/doseofted/prim-rpc-examples/tree/main/custom-handler) -->

In this example, a web server and web browser are bridged with Prim+RPC. This is
very similar to the [Client / Server Example](../client-server) except that this
example uses YAML in place of the default JSON handler. This examples also uses
Express in place of Fastify as a server framework.

You may try to experiment with other JSON handlers like
[`superjson`](https://github.com/blitz-js/superjson),
[`devalue`](https://github.com/Rich-Harris/devalue),
[`destr`](https://www.npmjs.com/package/destr), or some other alternative
JSON-like handler.

You can start both the server and client, at the same time, by running the
"start" helper script:

```zsh
pnpm install
pnpm start
```
