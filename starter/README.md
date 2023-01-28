# Interactive Starter Project

> **Warning** This is not a full example in itself. It is intended to act as a
> starting point for the
> [tutorial on the Prim+RPC documentation website](https://prim.doseofted.com/docs/setup).
> See [other examples](../examples) for a completely configured project.

In this project, we have a pre-configured web server using the
[Fastify](https://github.com/fastify/fastify) framework and a website built with
the [Solid](https://github.com/solidjs/solid) framework. These frameworks are
chosen only to reduce boilerplate code so that we can instead focus on Prim+RPC
setup.

The website requests a message from the web server by using the Fetch API which
makes an HTTP request to the web server which in turn will call `sayHello()` on
the server.

Notice how you first have to both explicitly fetch the result on the client and
explicitly define a route on the server. With Prim+RPC, we can simply call the
function from the server as if it exists on the client already (without
importing the code itself). In this tutorial, we'll learn how to do this with
Prim+RPC.

[Start Tutorial](https://prim.doseofted.com/docs/setup)
