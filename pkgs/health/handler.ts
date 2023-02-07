import { Handler } from '@modern/service/types'
import { ServerHttp2Stream } from 'node:http2'

export const handler: Handler = async (stream: ServerHttp2Stream, headers) => {
	// stream is a Duplex
	stream.respond({
		'content-type': 'text/html; charset=utf-8',
		':status': 200,
	})
	stream.end(`<h1>I'm ok!!!</h1>`)
}
