import { Route } from './index'

export type Router = {
	routes: Route[]
	find: (path: string) => Route
}

export const routerFactory = (routes: Route[], notFound: Route): Router => {
	const find = (path: string): Route => {
		return routes.find((route) => route.path === path) ?? notFound
	}

	return {
		routes,
		find,
	}
}
