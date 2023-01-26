import { timeNow } from './time.mjs'
import process from "node:process"


export const servePlugin = (spawner) => ({
	name: 'watchHelper',
	setup(build) {
		let spawnedProcess = false
		process.on('SIGINT', () => {
			console.log('cleaning up process...')
			if (spawnedProcess) {
				process.kill(-spawnedProcess.pid)
			}
		})
		build.onEnd(async (result) => {
			if (spawnedProcess) {
				await process.kill(-spawnedProcess.pid)
			}
			spawnedProcess = await spawner()
		})
	},
})

export const watchPlugin = (name) => ({
	name: 'serveHelper',
	setup(build) {
		build.onEnd((result) => {
			console.log(`Build successful at: ${timeNow()} for: ${name}`)

			for (const error of result.errors) {
				console.error({ error })
			}
		})
	}
})
