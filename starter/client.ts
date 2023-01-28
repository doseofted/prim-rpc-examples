// NOTE: Prim+RPC client setup here

const result = await fetch("http://[::1]:3001/api")
console.log(await result.text())

const p = document.createElement("p")
p.innerText = "Hello from client!"
document.getElementById("root")?.appendChild(p)

export {}
