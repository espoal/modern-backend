import { handler as HealthHandler } from '@pkgs/health'
import { Handler } from './types'

export const mainHandler: Handler = async (stream, headers) => {
	HealthHandler(stream, headers)
}

export const errorHandler = async (err) => {
	console.error({ err })
}
