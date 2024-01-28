# Interactive Starter Project

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz_small.svg)](https://stackblitz.com/github/doseofted/prim-rpc-examples/tree/main/starter)

> **Warning**
>
> This is not a full example in itself. It is intended to act as a
> starting point for the
> [tutorial on the Prim+RPC documentation website](https://prim.doseofted.me/docs/learn/setup).
> See [other examples](../) for a completely configured project.

In this project, we have a web server in Node and a website built with Vite:

- [`server/module.ts`](./server/index.ts) is where your functions are created
- [`server/index.ts`](./server/index.ts) is the Prim+RPC server, using the Fetch API
- [`client/prim.ts`](./client/prim.ts) is the Prim+RPC client, using the Fetch API
- [`client/index.ts`](./client/index.ts) is where your functions are called

[Start Setup](https://prim.doseofted.me/docs/learn/setup)

You can start this project in development mode by running:

```zsh
npm install
npm dev
```
