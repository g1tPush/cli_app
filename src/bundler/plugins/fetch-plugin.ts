import * as esbuild from 'esbuild-wasm'
import axios from 'axios'
import localForage from 'localforage'

interface IResolve {
    importer?: string,
    namespace?: string,
    path: string,
    resolveDir?: string
}


const fileCache = localForage.createInstance({
    name: 'fileCache'
});

export const fetchPlugin = (inputCode: string | undefined) => {
    return {
        name: 'fetch-plugin',
        setup(build: esbuild.PluginBuild) {
            build.onLoad({ filter: /(^index\.js$)/ }, async (args: IResolve) => {
                return {
                    loader: 'jsx',
                    contents: `${inputCode}`
                }
            })

            build.onLoad({ filter: /.*/ }, async (args: IResolve) => {
                const cachedResults = await fileCache.getItem<esbuild.OnLoadResult>(args.path)

                if (cachedResults) {
                    return cachedResults
                }
            })

            build.onLoad({ filter: /.css$/ }, async (args: IResolve) => {
                const { data, request } = await axios.get<string>(args.path)
                const escaped = data
                    .replace(/\n/g, '')
                    .replace(/"/g, '\\"')
                    .replace(/'/g, "\\'")

                const contents = `
                    const style = document.createElement('style')
                    style.innerText = '${escaped}'
                    document.head.appendChild(style) 
                `

                const result: esbuild.OnLoadResult = {
                    loader: 'jsx',
                    contents,
                    resolveDir: new URL('./', request.responseURL).pathname
                }

                await fileCache.setItem(args.path, result)

                return result
            })

            build.onLoad({ filter: /.*/ }, async (args: IResolve) => {
                const { data, request } = await axios.get<string>(args.path)

                const result: esbuild.OnLoadResult = {
                    loader: 'jsx',
                    contents: data,
                    resolveDir: new URL('./', request.responseURL).pathname
                }

                await fileCache.setItem(args.path, result)

                return result
            })
        }
    }
}