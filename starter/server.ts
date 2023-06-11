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

export function sayHello(x: string, y: string) {
	return `${x}, meet ${y}.`
}

fastify.get<{ Querystring: { x: string; y: string } }>(
	"/api",
	(request, reply) => {
		const { x, y } = request.query
		const message = sayHello(x, y)
		reply.send(message)
	}
)
fastify.get("/health", () => "ok") // simple health check

// NOTE: Prim+RPC server setup will go here

const address = await fastify.listen({ port: 3001 })
console.log("Server available at", address)
