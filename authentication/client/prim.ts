import { createPrimClient } from "@doseofted/prim-rpc"
import { createMethodPlugin } from "@doseofted/prim-rpc-plugins/browser-fetch"
import type { Module } from "@example/server"

export const client = createPrimClient<Module>({
	endpoint: "http://localhost:3001/prim",
	methodPlugin: createMethodPlugin({ credentials: "include" }),
})
export default client
