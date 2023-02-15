import { Handler, Route } from './index'

export const notFoundHandler: Handler = async (stream, headers) => {
	stream.respond({
		'content-type': 'text/html; charset=utf-8',
		':status': 404,
	})
	console.log('not found handler!')
	stream.end('<h1>Not found</h1>')
}

export const notFoundRoute: Route = {
	path: '/not-found',
	handler: notFoundHandler,
}
