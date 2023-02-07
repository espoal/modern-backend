import { healthRoute } from '@pkgs/health'
import { routerFactory } from './router'
import { notFoundRoute } from './notFound'

const routes = [healthRoute]

export const router = routerFactory(routes, notFoundRoute)
