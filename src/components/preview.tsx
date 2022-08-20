import './preview.css'
import { useRef, useEffect } from 'react'

interface PreviewProps {
    code: string | undefined,
    err: string | undefined
}

const html = `
<html>
    <head></head>
    <body>
        <div id='root'></div>
        <script>
            window.addEventListener('message', (event) => {
                const handleError = (err) => {
                    const root = document.querySelector('#root')
                    root.innerHTML = '<div style="color: red">'+ err + '</div>'
                    console.error(err)
                }
                window.addEventListener('error', (event) => {
                    event.preventDefault()
                    handleError(event.error)
                })
                try {
                    eval(event.data)
                } catch (err) {
                    handleError(err)
                }
            }, false)
        </script>
    </body>
</html>
`

const Preview: React.FC<PreviewProps> = ({ code, err }) => {
    const iframe = useRef<any>()

    useEffect(() => {
        iframe.current.srcdoc = html
        let timer = setTimeout(() => {
            iframe.current.contentWindow.postMessage(code, '*')
        }, 50)

        return () => {
            clearTimeout(timer)
        }
    }, [code])

    const restart = () => {
        iframe.current.contentWindow.postMessage(code, '*')
    }

    return (
        <div className='preview-wrapper'>
            <>
                <iframe
                    style={{ background: 'white', height: '100%' }}
                    title='review'
                    ref={iframe}
                    sandbox='allow-scripts'
                    srcDoc={html}
                    onLoad={restart}
                />
                {
                    err && <div className='preview-error'>{err}</div>
                }
            </>
        </div>
    )
}

export default Preview