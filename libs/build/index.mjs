import esbuild from 'esbuild'
// import { pnpPlugin } from '@yarnpkg/esbuild-plugin-pnp'
import { watchPlugin, servePlugin } from './watch.mjs'
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

const spawner = async () => {

	console.log('spawning process...')

	const spawnedProcess = await spawn('yarn', ['start'], { detached: true })


	spawnedProcess.stdout.on('data', (data) => {
		console.log(`stdout: ${data}`);
	});

	spawnedProcess.stderr.on('data', (data) => {
		console.error(`stderr: ${data}`);
	});

	spawnedProcess.on('close', (code) => {
		console.log(`child process exited with code ${code}`);
	});

	return spawnedProcess
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

	const isProd = process.env.NODE_ENV === 'production'
	const shouldWatch = argv.includes('watch')
	const shouldServe = argv.includes('serve')

	console.log(
		`Starting ${isProd ? 'production' : 'dev'} build for: ${name}`,
	)


	options.plugins.push(watchPlugin(name))

	if (isProd) {
		options.minify = true
	}

	if (shouldWatch) {
		const ctx = await esbuild.context(options)
		await ctx.watch()
	} else if (shouldServe) {
		await esbuild.build(options)
		options.plugins.push(servePlugin(spawner))
		const ctx = await esbuild.context(options)
		await ctx.watch()
	} else {
		await esbuild.build(options)
	}
}
