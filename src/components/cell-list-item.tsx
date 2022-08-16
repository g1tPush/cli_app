import './cell-list-item.css'
import CodeCell from './code-cell'
import TextEditor from './text-editor'
import ActionBar from './action-bar'

type CellTypes = 'code' | 'text'

interface Cell {
    id: string;
    type: CellTypes;
    content: string;
}

interface CellListItemProps {
    cell: Cell
}

const CellListItem: React.FC<CellListItemProps> = ({ cell }) => {
    let child: JSX.Element

    if (cell.type === 'code') {
        child = <>
            <div className='action-bar-wrapper'>
                <ActionBar id={cell.id} />
            </div>
            <CodeCell cell={cell} />
        </>
    } else {
        child = <>
            <div className='action-bar-wrapper'>
                <ActionBar id={cell.id} />
            </div>
            <TextEditor cell={cell} />
        </>
    }


    return (
        <div>
            {child}
        </div>
    )
}


export default CellListItem