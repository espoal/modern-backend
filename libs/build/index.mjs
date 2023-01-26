import esbuild from 'esbuild'
import { pnpPlugin } from '@yarnpkg/esbuild-plugin-pnp'
import { watchPlugin } from './watch.mjs'

const baseOptions = {
	plugins: [pnpPlugin()],
	bundle: true,
	splitting: false,
	format: 'esm',
	publicPath: '/',
	platform: 'node',
	target: 'esnext',
	treeShaking: true,
	outExtension: { '.js': '.mjs' },
	tsconfig: 'tsconfig.json',
}

export const buildHelper = async ({
	name,
	entryPoints = ['No entrypoint specified'],
	external = [],
	outDir = '',
	minify = false,
	watch = false,
}) => {
	const options = {
		...baseOptions,
		entryPoints,
		external,
		outdir: `dist/${outDir}`,
	}

	console.log(
		`Starting ${options.isProd ? 'production' : 'dev'} build for: ${name}`,
	)

	options.plugins.push(watchPlugin(name))

	if (minify) {
		options.minify = true
	}

	if (watch) {
		const ctx = await esbuild.context(options)
		await ctx.watch()
	} else {
		await esbuild.build(options)
	}
}
