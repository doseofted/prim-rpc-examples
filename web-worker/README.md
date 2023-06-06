# Web Worker Example

<!-- [![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz_small.svg)](https://stackblitz.com/github/doseofted/prim-rpc-examples/tree/main/web-worker) -->

In this example, a website and its Web Worker are bridged with Prim+RPC. The
website will act as a client and the Web Worker will act as the server.

While it's just as easy to use the Web Worker's built-in "message" event in this
simple example, that can become tedious when there are many functions defined in
a Web Worker, especially when you want to maintain TypeScript interfaces on
those messages. Prim+RPC helps bridge this gap.

While not shown in this example, it's also possible to reverse the order so that
the website acts as the server and the Web Worker acts as the client. You could
even have both the website and Web Worker act as both the client and server (by
setting up both the Prim+RPC client/server on the website and worker). For
simplicity, these examples are not shown here but a more complex example may be
created in the future to demonstrate this functionality.

The application ([`index.ts`](./index.tsx)) is a
[Solid](https://github.com/solidjs/solid) app created using
[Vite](https://github.com/vitejs/vite) (you don't need to be familiar with
either to use this example).

```zsh
pnpm install
pnpm start
```
