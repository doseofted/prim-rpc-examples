# Prim+RPC Examples

Examples of Prim+RPC usage. Referenced in
[Prim+RPC documentation](http://prim.doseofted.com/docs/examples):

- [Simple Testing](./simple-test/)
- [Client/Server Example](./client-server/)
- [Web Worker](./web-worker)
- [Monorepo Setup](./monorepo-setup)
- [Custom JSON Handler](./custom-handler)
- [Server Context](./server-context)
- [Fullstack Framework](./fullstack-framework)
- Electron IPC[^1]

You can
[download examples individually](http://prim.doseofted.com/docs/examples) from
the documentation website or you may
[download the repository](https://github.com/doseofted/prim-rpc-examples) for
all examples.

You can install dependencies in all examples by running the following commands:

```zsh
corepack enable
pnpm install
```

## Todo

Before publishing examples the following tasks should be completed:

- [ ] Replace all RPC-related `workspace:*` references with actual packages
      (instead of local build)

[^1]: Example yet to be created
