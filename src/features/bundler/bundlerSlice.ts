import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface bundlerState {
    [key: string]:
    | {
        loading: boolean;
        code: string;
        err: string;
    }
    | undefined;
}

const initialState: bundlerState = {}


const bundlerSlice = createSlice({
    name: 'bundlreStatee',
    initialState,
    reducers: {
        bundleStart(state, action: PayloadAction<{ cellId: string }>) {
            state[action.payload.cellId] = {
                loading: true,
                code: '',
                err: '',
            }
        },
        bundleComplete(state, action: PayloadAction<{ cellId: string, bundle: { code: string, err: string } }>) {
            state[action.payload.cellId] = {
                loading: false,
                code: action.payload.bundle.code,
                err: action.payload.bundle.err,
            }
        }
    }

})

export const { bundleStart, bundleComplete } = bundlerSlice.actions
export default bundlerSlice.reducer