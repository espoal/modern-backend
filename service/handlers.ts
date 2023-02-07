import { Handler } from './types'
import { router } from './routes'




export const mainHandler: Handler = async (stream, headers) => {
	const path = headers[':path'] ?? ''

	let matchedRoute = router.find(path)
	console.log({ matchedRoute })
	matchedRoute.handler(stream, headers)
}

export const errorHandler = async (err) => {
	console.error({ err })
}


