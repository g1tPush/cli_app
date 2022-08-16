import './add-cell.css'
import { useAppDispatch } from '../features/hooks'
import { insertCellBefore } from '../features/editor/editorSlice'

interface AddCellProps {
    previousCellId: string | null;
    forceVisible?: boolean;
}

const AddCell: React.FC<AddCellProps> = ({ forceVisible, previousCellId }) => {
    const dispatch = useAppDispatch()

    return (
        <div className={`add-cell ${forceVisible && 'force-visible'}`}>
            <div className="add-buttons">
                <button
                    className="button is-rounded is-primary is-small"
                    onClick={() => dispatch(insertCellBefore({ id: previousCellId, type: 'code' }))}
                >
                    <span className="icon is-small">
                        <i className="fas fa-plus" />
                    </span>
                    <span>Code</span>
                </button>
                <button
                    className="button is-rounded is-primary is-small"
                    onClick={() => dispatch(insertCellBefore({ id: previousCellId, type: 'text' }))}
                >
                    <span className="icon is-small">
                        <i className="fas fa-plus" />
                    </span>
                    <span>Text</span>
                </button>
            </div>
            <div className="divider"></div>
        </div>
    );
};

export default AddCell;