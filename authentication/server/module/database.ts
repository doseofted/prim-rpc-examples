import { JSONPreset as ExampleDatabase } from "lowdb/node"
import { mkdir } from "node:fs/promises"

await mkdir(".data", { recursive: true })

type DataShape = {
	users: { email: string; password: string; name: string }[]
	sessions: { email: string; id: string }[]
}
export const db = await ExampleDatabase<DataShape>(".data/example.json", {
	users: [],
	sessions: [],
})
