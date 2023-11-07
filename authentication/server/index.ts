import { createPrimServer } from "@doseofted/prim-rpc"
import { primFetch } from "@doseofted/prim-rpc-plugins/server-fetch"
import { createServer } from "node:http"
import { createServerAdapter } from "@whatwg-node/server"
import { contextTransform } from "./context"
import * as module from "./module"

const prim = createPrimServer({ module })
function postprocess(res: Response) {
	res.headers.set("access-control-allow-origin", "https://localhost:3000")
	res.headers.set("access-control-allow-headers", "content-type")
	res.headers.set("access-control-allow-credentials", "true")
}
const fetch = primFetch({ prim, postprocess, contextTransform })

const fetchAdapter = createServerAdapter(fetch)
createServer(fetchAdapter).listen(3001)
console.log("Prim+RPC is available at http://localhost:3001/prim")

export type Module = typeof module
