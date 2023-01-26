import http2 from 'node:http2'
import fs from 'node:fs'
import { mainHandler, errorHandler } from './handlers'

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

console.log(`Listening on port: ${port}`)

server.listen(port)
