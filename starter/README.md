# Interactive Starter Project

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz_small.svg)](https://stackblitz.com/github/doseofted/prim-rpc-examples/tree/main/starter)

> **Warning** This is not a full example in itself. It is intended to act as a
> starting point for the
> [tutorial on the Prim+RPC documentation website](https://prim.doseofted.me/docs/setup).
> See [other examples](../) for a completely configured project.

In this project, we have a pre-configured web server using the Fetch API and a
website built with Vite that uses the Fetch API to call the function.

- [`server/module.ts`](./server/index.ts) houses your functions
- [`server/index.ts`](./server/index.ts) is Prim+RPC using the Fetch API
- [`client/prim.ts`](./client/prim.ts) is the Prim+RPC client using the Fetch
  API
- [`client/index.ts`](./client/index.ts) is where your functions are called

[Start Setup](https://prim.doseofted.me/docs/setup)

You can start this project in development mode with the following command:

```zsh
pnpm dev
```
