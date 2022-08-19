import React from 'react'
import { useAppSelector } from '../features/hooks'
import CellListItem from './cell-list-item'
import AddCell from './add-cell'
import { Fragment } from 'react'

const CellList: React.FC = () => {
    const cells = useAppSelector(({ editor: { order, data } }) => {
        return order.map((id) => {
            return data[id]
        })
    })

    const renderedCells = cells.map((cell) => {
        return (
            <React.Fragment key={cell.id}>
                <CellListItem cell={cell} />
                <AddCell previousCellId={cell.id} />
            </React.Fragment>
        )
    })

    return (
        <div>
            <AddCell forceVisible={cells.length === 0} previousCellId={null} />
            {renderedCells}
        </div>
    )
}


export default CellList