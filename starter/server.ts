import Fastify from "fastify"
import cors from "@fastify/cors"

const fastify = Fastify()
await fastify.register(cors)
fastify.get("/", () => "Hello from server!")

// NOTE: Prim+RPC server setup here

const address = await fastify.listen({ port: 3001 })
console.log("Server available at", address)
