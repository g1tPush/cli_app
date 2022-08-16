import './action-bar.css'
import { useAppDispatch } from '../features/hooks'
import { moveCell, deleteCell } from '../features/editor/editorSlice'

interface ActionBarProps {
    id: string
}

const ActionBar: React.FC<ActionBarProps> = ({ id }) => {
    const dispatch = useAppDispatch()


    return (
        <div>
            <button
                onClick={() => dispatch(moveCell({ id, direction: 'up' }))}
                className='button is-primary is-small'
            >
                <span className='icon'>
                    <i className='fas fa-arrow-up'></i>
                </span>
            </button>
            <button
                onClick={() => dispatch(moveCell({ id, direction: 'down' }))}
                className='button is-primary is-small'
            >
                <span className="icon">
                    <i className="fas fa-arrow-down"></i>
                </span>
            </button>
            <button
                onClick={() => dispatch(deleteCell(id))}
                className='button is-primary is-small'
            >
                <span className="icon">
                    <i className="fas fa-times"></i>
                </span>
            </button>
        </div>
    )
}

export default ActionBar