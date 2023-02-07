import process from 'node:process'
import { spawn } from 'node:child_process'

const spawner = async (command) => {
	console.log('spawning server...')

	const commandParts = command.split(' ')
	const commandName = commandParts[0]
	const commandArgs = commandParts.slice(1)

	const spawnedProcess = await spawn(commandName, commandArgs, {
		detached: true,
	})

	spawnedProcess.stdout.on('data', (data) => {
		console.log(`Server stdout: ${data}`)
	})

	spawnedProcess.stderr.on('data', (data) => {
		console.error(`Server stderr: ${data}`)
	})

	spawnedProcess.on('close', (code) => {
		console.log(`Server process exited with code ${code}`)
	})

	return spawnedProcess
}

export const servePlugin = (command = 'yarn start') => ({
	name: 'watchHelper',
	setup(build) {
		let spawnedProcess = false
		process.on('SIGINT', () => {
			console.log('cleaning up process...')
			if (spawnedProcess && !spawnedProcess.killed) {
				process.kill(-spawnedProcess.pid)
			}
		})
		build.onEnd(async (result) => {
			if (spawnedProcess) {
				process.kill(-spawnedProcess.pid)
			}
			spawnedProcess = await spawner(command)
		})
	},
})
