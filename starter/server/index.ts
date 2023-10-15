import { createServer } from "node:http"
import { createServerAdapter } from "@whatwg-node/server"

// TODO: Create the Prim+RPC server here

const cors = {
	"access-control-allow-origin": "http://localhost:5173",
	"access-control-allow-headers": "content-type",
}
const fetchAdapter = createServerAdapter(
	() => new Response("Not implemented", { headers: cors })
)
createServer(fetchAdapter).listen(3000)
console.log("Server is running at http://localhost:3000/")
