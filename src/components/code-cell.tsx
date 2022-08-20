import './code-cell.css'
import { useEffect } from 'react'
import CodeEditor from '../components/code-editor'
import Preview from '../components/preview'
import Resizable from './resizable'
import { useAppDispatch, useAppSelector } from '../features/hooks'
import { updateCell } from '../features/editor/editorSlice'
import { createBundle } from '../features/hooks'

type CellTypes = 'code' | 'text'

interface Cell {
    id: string;
    type: CellTypes;
    content: string;
}

interface CodeCellProps {
    cell: Cell
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
    const dispatch = useAppDispatch()
    const bundle = useAppSelector((state) => state.bundler[cell.id])

    useEffect(() => {
        if (!bundle) {
            const starteBundle = createBundle(cell.id, cell.content)
            starteBundle(dispatch)
            return
        }

        const timer = setTimeout(() => {
            const starteBundle = createBundle(cell.id, cell.content)
            starteBundle(dispatch)
        }, 1000)

        return () => {
            clearTimeout(timer)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cell.content, cell.id])

    return (
        <Resizable direction='vertical'>
            <div style={{ height: 'calc(100% - 10px)', display: 'flex', flexDirection: 'row' }}>
                <Resizable direction='horizontal'>
                    <CodeEditor
                        initialValue={cell.content}
                        onChange={(value) => dispatch(updateCell({ id: cell.id, content: value || '' }))
                        }
                    />
                </Resizable>
                <div className="progress-wrapper">
                    <Preview code={bundle?.code} err={bundle?.err} />
                </div>
            </div>
        </Resizable>
    )
}

export default CodeCell
