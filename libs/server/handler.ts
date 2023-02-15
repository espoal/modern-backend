import { Handler } from './index'

export const mainHandlerFactory =
	(router): Handler =>
	async (stream, headers) => {
		const path = headers[':path'] ?? ''

		let matchedRoute = router.find(path)
		console.log('Serving route: ', matchedRoute.path)
		matchedRoute.handler(stream, headers)
	}
