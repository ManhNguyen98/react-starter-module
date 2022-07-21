import {
  useInjectReducer as useReducer,
  useInjectSaga as useSaga,
} from 'redux-injectors'
import { Saga } from 'redux-saga'
import { SagaInjectionModes } from 'redux-injectors'
import { Reducer, AnyAction } from '@reduxjs/toolkit'

type RequiredRootState = Required<any>

export interface InjectReducerParams {
  key: string
  reducer: Reducer<RequiredRootState, AnyAction>
}

export interface InjectSagaParams {
  key: string
  saga: Saga
  mode?: SagaInjectionModes
}

/* Wrap redux-injectors with stricter types */

export function useInjectReducer(params: InjectReducerParams) {
  return useReducer(params)
}

export function useInjectSaga(params: InjectSagaParams) {
  return useSaga(params)
}
