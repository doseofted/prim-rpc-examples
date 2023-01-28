import path from "node:path"
import Fastify from "fastify"
import cors from "@fastify/cors"
import staticHost from "@fastify/static"

const fastify = Fastify()
await fastify.register(cors)

const root = path.join(new URL("", import.meta.url).pathname, "..", "dist")
if (process.env.npm_lifecycle_event === "start") {
	await fastify.register(staticHost, { root })
}

fastify.get("/api", () => "Hello from server!")

// NOTE: Prim+RPC server setup here

const address = await fastify.listen({ port: 3001 })
console.log("Server available at", address)
