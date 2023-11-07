import { z } from "zod"

export const loginSchema = z.object({
	email: z.coerce.string().email(),
	password: z.coerce
		.string()
		.min(8, "Password must be at least 8 characters")
		.max(24, "Password must be under 24 characters"),
})
export type LoginOptions = z.infer<typeof loginSchema>

export const createAccountSchema = loginSchema.extend({
	name: z.coerce.string().min(1, "Name is required"),
})
export type CreateAccountOptions = z.infer<typeof createAccountSchema>
