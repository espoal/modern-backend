import esbuild from 'esbuild'
// import { pnpPlugin } from '@yarnpkg/esbuild-plugin-pnp'
import { servePlugin } from './serve.mjs'
import { buildLoggerPlugin } from './log.mjs'
import { argv } from 'node:process'
import { spawn } from 'node:child_process'

const baseOptions = {
	plugins: [],
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
}) => {
	const options = {
		...baseOptions,
		entryPoints,
		external,
		outdir: `dist/${outDir}`,
	}

	const isProd = process.env.NODE_ENV === 'production' || argv.includes('prod')
	const shouldServe = argv.includes('serve')
	const shouldWatch = argv.includes('watch') || shouldServe

	const envType = isProd ? 'prod' : 'dev'
	const buildType = shouldWatch || shouldServe ? 'watch' : 'build'

	console.log(`Starting ${buildType} in ${envType} for: ${name}`)

	options.plugins.push(buildLoggerPlugin(name))
	options.minify ||= isProd

	if (shouldServe) {
		await esbuild.build(options)
		options.plugins.push(servePlugin())
	}

	if (shouldWatch) {
		const ctx = await esbuild.context(options)
		await ctx.watch()
	} else {
		await esbuild.build(options)
	}
}
