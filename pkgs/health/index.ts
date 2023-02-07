import { Route } from '@modern/service/types'

import { handler } from './handler'

export const healthRoute: Route = {
	path: '/health',
	handler,
}
