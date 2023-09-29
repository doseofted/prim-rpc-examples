import { createPrimServer } from "@doseofted/prim-rpc"
import { primFetch } from "@doseofted/prim-rpc-plugins/server-fetch"
import * as module from "./module"
import { createServer } from "node:http"
import { createServerAdapter } from "@whatwg-node/server"

const prim = createPrimServer({ module })
function postprocess(res: Response) {
	res.headers.set("access-control-allow-origin", "http://localhost:5173")
	res.headers.set("access-control-allow-headers", "content-type")
}
// Server routes are automatically created for your functions
const fetch = primFetch({ prim, postprocess })

const fetchAdapter = createServerAdapter(fetch)
createServer(fetchAdapter).listen(3000)
console.log("Prim+RPC is available at http://localhost:3000/prim")

export type Module = typeof module
