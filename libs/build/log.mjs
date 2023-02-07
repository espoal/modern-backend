const twoDigits = (n) => {
	if (n > 9) return parseInt(n)
	else return `0${parseInt(n)}`
}

export const timeNow = (date = new Date()) =>
	`${twoDigits(date.getHours())}:${twoDigits(date.getMinutes())}:${twoDigits(
		date.getSeconds(),
	)}`

export const buildLoggerPlugin = (name) => ({
	name: 'serveHelper',
	setup(build) {
		build.onEnd((result) => {
			console.log(`Build successful at: ${timeNow()} for: ${name}`)

			for (const error of result.errors) {
				console.error({ error })
			}
		})
	},
})
