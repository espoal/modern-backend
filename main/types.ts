import http2 from 'node:http2'

export type Handler = (
	stream: http2.ServerHttp2Stream,
	headers: http2.IncomingHttpHeaders,
) => void
