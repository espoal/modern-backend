import { healthRoute } from '@pkgs/health'
import { routerFactory, notFoundRoute } from '@libs/router'

const routes = [healthRoute]

export const router = routerFactory(routes, notFoundRoute)
