import { configureStore } from '@reduxjs/toolkit'
import editorReducer from './editor/editorSlice'
import bundlerReducer from './bundler/bundlerSlice'

export const store = configureStore({
    reducer: {
        editor: editorReducer,
        bundler: bundlerReducer
    }
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState> 