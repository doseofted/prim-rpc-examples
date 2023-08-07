interface Post {
	photo: File
	caption: string
}

/**
 * Define some function to be called from the client with Prim+RPC.
 * This one will upload a photo for the gallery.
 */
export function submitPhoto(form: Post | HTMLFormElement | FormData) {
	// ...
}

// Ensure function is exposed to client by adding the `.rpc` property
submitPhoto.rpc = true
