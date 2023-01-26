import {buildHelper} from '@libs/build'
import {argv} from 'node:process'

const external = [
]


await buildHelper({
    name: 'main',
    entryPoints: ['service/server.ts'],
    external,
    ssr: true,
    isProd: argv.includes('prod'),
    watch: argv.includes('watch'),
})


