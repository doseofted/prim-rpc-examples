import client from "./prim"

// Function calls are automatically translated into RPC in the background
const message = await client.sayHello()
console.log(message) // Hello world!

const app = document.getElementById("app")
if (!app) throw new Error("No #app element found")
app.innerText = message
