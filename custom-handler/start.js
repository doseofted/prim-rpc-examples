#!/usr/bin/env zx
// NOTE: this is just a helper script to start server and client at the same time
import { $, echo, chalk as c } from "zx"

echo`${c.green`Client`} available at ${c.green`http://prim.localhost:3000`}`
echo`${c.blue`Server`} available at ${c.blue`http://prim.localhost:3001`}`
echo``

const processes = {
	client: $`pnpm client`,
	server: $`pnpm serve`,
}

process.on("SIGTERM", () =>
	Object.values(processes).forEach(({ kill }) => kill("SIGTERM"))
)
