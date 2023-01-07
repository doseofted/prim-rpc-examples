import { createPrimServer } from "@doseofted/prim-rpc"
import {
	createCallbackHandler,
	createMethodHandler,
} from "@doseofted/prim-rpc-plugins/web-worker"

function makeUpperCase(message: string) {
	return message.toUpperCase()
}
makeUpperCase.rpc = true

const module = { makeUpperCase }
export type { module }

const { methodHandler } = createMethodHandler({ worker: self })
const { callbackHandler, jsonHandler } = createCallbackHandler({ worker: self })
createPrimServer({
	module,
	methodHandler,
	callbackHandler,
	jsonHandler,
})
