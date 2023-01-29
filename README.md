# Prim+RPC Examples

Examples of Prim+RPC usage:

- [Simple Testing](./examples/01-simple-test/)
- [Client/Server Example](./examples/02-client-server/)
- [Web Worker](./examples/03-web-worker)
- [Monorepo Setup](./examples/04-monorepo)
- [Custom JSON Handler](./examples/05-custom-handler)
- [Server Context](./examples/06-server-context)
- Fullstack Framework[^1]
- Electron IPC[^1]

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
