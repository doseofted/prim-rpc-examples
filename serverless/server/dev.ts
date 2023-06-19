import app from "."
import { serve } from "@hono/node-server"

// if testing project locally, start a local Node.js server for testing
// (not needed when deployed to a serverless environment)
serve(app).listen(3001)
console.log("Serving", `http://localhost:3001`)
