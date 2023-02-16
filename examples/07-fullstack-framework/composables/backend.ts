import { createPrimClient } from "@doseofted/prim-rpc"
import { createMethodPlugin } from "@doseofted/prim-rpc-plugins/browser"
import type moduleType from "@/hello"

const module = process.server ? (await import("@/hello")).default : {}
export const backend = createPrimClient<typeof moduleType>({
	endpoint: "http://localhost:3000/api/prim",
	methodPlugin: createMethodPlugin(),
	module,
})
