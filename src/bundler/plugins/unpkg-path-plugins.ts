import * as esbuild from 'esbuild-wasm'

interface IResolve {
    importer?: string,
    namespace?: string,
    path: string,
    resolveDir?: string
}

// interface ILoad {
//     path: string,
//     namespace: string
// }

export const unpkgPathPlugin = () => {
    return {
        name: 'unpkg-path-plugin',
        setup(build: esbuild.PluginBuild) {
            // index.js
            build.onResolve({ filter: /(^index\.js$)/ }, () => {
                return { path: 'index.js', namespace: 'a' }
            })

            // relative path
            build.onResolve({ filter: /^\.+\// }, async (args: IResolve) => {
                return {
                    namespace: 'a',
                    path: new URL(args.path, `https://unpkg.com${args.resolveDir}/`).href
                }
            })

            // main file
            build.onResolve({ filter: /.*/ }, async (args: IResolve) => {
                return {
                    path: `https://unpkg.com/${args.path}`,
                    namespace: 'a'
                }
            })
        }
    }
}