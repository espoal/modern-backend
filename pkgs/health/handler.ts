import { Handler } from '@modern/service/types'

export const handler: Handler = async (stream, headers) => {
	// stream is a Duplex
	stream.respond({
		'content-type': 'text/html; charset=utf-8',
		':status': 200,
	})
	stream.end('<h1>Hello world!!</h1>')
}
