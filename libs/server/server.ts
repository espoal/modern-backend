import http2 from 'node:http2'
import fs from 'node:fs'
import { mainHandlerFactory } from './handler'
import { Handler } from './index'

export const errorHandler: Handler = async (err) => {
	console.error({ err })
}

export const serverFactory = (router) => {
	const mainHandler = mainHandlerFactory(router)

	const isProd = process.env.NODE_ENV === 'production'
	const port = process.env.PORT || 8443

	const server = isProd
		? http2.createServer()
		: http2.createSecureServer({
				key: fs.readFileSync('keys/localhost-privkey.pem'),
				cert: fs.readFileSync('keys/localhost-cert.pem'),
		  })

	server.on('stream', mainHandler)
	server.on('error', errorHandler)

	return server
}
