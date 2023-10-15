// TODO: call your function using Prim+RPC here

const app = document.getElementById("app")
if (!app) throw new Error("No #app element found")
app.innerText = "Not implemented (yet)"

// NOTE: ignore this bit: it's just here to make sure the server is running
if (import.meta.env.DEV)
	fetch("http://localhost:3000").catch(() => setTimeout(location.reload, 300))
