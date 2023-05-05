import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { RootState, Dispatch } from './store'

type DispatchFunc = () => Dispatch
export const useAppDispatch: DispatchFunc = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector