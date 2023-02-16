import { createPrimServer } from "@doseofted/prim-rpc"
import { defineH3PrimHandler } from "@doseofted/prim-rpc-plugins/h3"
import module from "@/hello"

const prim = createPrimServer({
	prefix: "/api/prim",
	module,
})

export default defineH3PrimHandler({ prim })
