import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type CellTypes = 'code' | 'text'
type Direction = 'up' | 'down'

interface Cell {
    id: string;
    type: CellTypes;
    content: string;
}

interface editorState {
    loading: boolean;
    error: string | null;
    order: string[];
    data: {
        [key: string]: Cell
    }
}

const initialState: editorState = {
    loading: false,
    error: null,
    order: [],
    data: {},
}

const editorSlice = createSlice({
    name: 'editor',
    initialState,
    reducers: {
        updateCell(state, action: PayloadAction<{ id: string; content: string }>) {
            const { id, content } = action.payload

            state.data[id].content = content
        },
        deleteCell(state, action: PayloadAction<string>) {
            delete state.data[action.payload]
            state.order = state.order.filter((id) => id !== action.payload)
        },
        moveCell(state, action: PayloadAction<{ id: string; direction: Direction }>) {
            const { direction } = action.payload
            const index = state.order.findIndex((id) => id === action.payload.id)
            const targetIndex = direction === 'up' ? index - 1 : index + 1

            if (targetIndex < 0 || targetIndex > state.order.length - 1) {
                return
            }

            state.order[index] = state.order[targetIndex]
            state.order[targetIndex] = action.payload.id
        },
        insertCellBefore(state, action: PayloadAction<{ id: string | null; type: CellTypes }>) {
            const cell: Cell = {
                content: '',
                type: action.payload.type,
                id: randomId(),
            }

            state.data[cell.id] = cell

            const foundIndex = state.order.findIndex(
                (id) => id === action.payload.id
            )

            if (foundIndex < 0) {
                state.order.unshift(cell.id)
            } else {
                state.order.splice(foundIndex + 1, 0, cell.id)
            }
        }
    }
})

const randomId = () => {
    return Math.random().toString(36).substr(2, 5);
}

export const { updateCell, deleteCell, moveCell, insertCellBefore } = editorSlice.actions
export default editorSlice.reducer