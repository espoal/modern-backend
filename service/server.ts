import { serverFactory } from '@libs/server'

import { router } from './routes'

const server = serverFactory(router)

server.listen(3000)
