import { IncomingHttpHeaders, ServerHttp2Stream } from 'node:http2'

export type Handler = (
	stream: ServerHttp2Stream,
	headers: IncomingHttpHeaders,
) => void

export { serverFactory } from './server'
