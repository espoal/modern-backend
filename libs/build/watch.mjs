import { timeNow } from './time.mjs'

export const watchHelper = (name) => ({
	onRebuild(error, result) {
		if (error) console.error('watch build failed:', error)
		else {
			console.log(`Build successful at time: ${timeNow()} for: ${name}`)
			const { errors, warnings } = result
			console.log({ errors, warnings })
		}
	},
})

export const watchPlugin = (name) => ({
	name: 'watchHelper',
	setup(build) {
		build.onEnd((result) => {
			console.log(`Build successful at: ${timeNow()} for: ${name}`)

			for (const error of result.errors) {
				console.error({ error })
			}
		})
	},
})
