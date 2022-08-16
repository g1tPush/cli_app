import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { RootState, AppDispatch } from './store'

import { bundleStart, bundleComplete } from './bundler/bundlerSlice'
import bundle from '../bundler/index'


export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const createBundle = (cellId: string, input: string) => {
    return async (dispatch: AppDispatch) => {
        dispatch(bundleStart({
            cellId
        }))

        const result = await bundle(input)

        dispatch(bundleComplete({
            cellId,
            bundle: result
        }))
    }
}