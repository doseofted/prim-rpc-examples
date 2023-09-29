import { createServer } from "node:http"
import { createServerAdapter } from "@whatwg-node/server"

// TODO: Create the Prim+RPC server here

const fetchAdapter = createServerAdapter(() => new Response("Not implemented"))
createServer(fetchAdapter).listen(3000)
console.log("Server is running at http://localhost:3000/")
