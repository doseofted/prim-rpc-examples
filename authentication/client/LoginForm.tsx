import { Show } from "solid-js"
import { createAutoAnimate } from "@formkit/auto-animate/solid"
import { client } from "./prim"

interface LoginFormProps {
	signUp?: boolean
	onsubmit?: () => void
	onerror?: (error: unknown) => void
}

export function LoginForm(props: LoginFormProps) {
	const [container] = createAutoAnimate()
	async function signUp(event: SubmitEvent) {
		try {
			await (props.signUp ? client.createAccount(event) : client.login(event))
			props.onsubmit?.()
		} catch (error) {
			props.onerror?.(error)
		}
	}
	return (
		<form ref={container} onsubmit={signUp} class="card-body grid gap-2">
			<Show when={props.signUp}>
				<div class="form-control">
					<label for="name" class="label label-text">
						Name
					</label>
					<input id="name" name="name" type="text" class="input input-bordered" />
				</div>
			</Show>
			<div class="form-control">
				<label for="email" class="label label-text">
					Email
				</label>
				<input id="email" name="email" type="email" class="input input-bordered" />
			</div>
			<div class="form-control">
				<label for="password" class="label label-text">
					Password
				</label>
				<input id="password" name="password" type="password" class="input input-bordered" />
			</div>
			<input class="btn btn-neutral mt-4" type="submit" value={props.signUp ? "Sign Up" : "Log In"} />
		</form>
	)
}
