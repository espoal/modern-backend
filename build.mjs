import {buildHelper} from '@libs/build'

const external = [
]


await buildHelper({
    name: 'main',
    entryPoints: ['service/server.ts'],
    external,
})


