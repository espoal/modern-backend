import http2 from 'node:http2'
import fs from 'node:fs'
import { handler as HealthHandler } from '@pkgs/health'
import { Handler } from './types'

export { Handler }

const server = http2.createSecureServer({
	key: fs.readFileSync('keys/localhost-privkey.pem'),
	cert: fs.readFileSync('keys/localhost-cert.pem'),
})

const mainHandler: Handler = async (stream, headers) => {
	HealthHandler(stream, headers)
}

server.on('stream', mainHandler)

server.on('error', (err) => console.error(err))

server.listen(8443)
