import { Handler } from './index'

export const errorHandler: Handler = async (err) => {
	console.error({ err })
}
