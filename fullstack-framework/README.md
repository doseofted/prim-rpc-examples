# Fullstack Framework Example

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz_small.svg)](https://stackblitz.com/github/doseofted/prim-rpc-examples/tree/main/fullstack-framework)

In this example, Prim+RPC is used in the fullstack framework
[Nuxt](https://nuxt.com/).

The module used with Prim+RPC is [`@/hello.ts`](./hello.ts). This is just a
regular JavaScript module. The Prim+RPC server is configured in
[`@/server/api/[...].ts`](./server/api/%5B...%5D.ts) using the method handler
for [H3](https://github.com/unjs/h3) (H3 is the HTTP framework that powers
Nuxt's Nitro server). Files in the `server/api` folder become routes in the HTTP
server. The `[...].ts` file signals to Nuxt that this is a catch-all route.

We define the Prim+RPC client as a composable in
[`@composables/backend.ts`](./composables/backend.ts) so that we can use the
Prim+RPC client anywhere in our app.

The module is used with Prim+RPC in our app's starting point
[`app.vue`](./app.vue). We use Nuxt's `useAsyncData()` to handle the returned
promise (and refetch if given references change).

> **Note** Today, this example only uses a method handler. The callback handler
> (using a WebSocket connection) isn't supported directly with Nuxt yet but it
> is intended to be added in the future.

You can start this example using the following commands:

```zsh
pnpm install
pnpm start
```
