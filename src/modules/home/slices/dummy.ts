import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { useInjectReducer, useInjectSaga } from 'store/hooks'
import { dummySaga } from '../sagas/dummy'

export const initialState = {
  list: [],
  loading: false,
}

const slice = createSlice({
  name: 'dummy',
  initialState,
  reducers: {
    getDummies(state, action: PayloadAction<{}>) {
      state.loading = true
    },
    getDummiesSuccess(state, action) {
      state.list = action.payload.data
      state.loading = false
    },
    removeAllDummy(state, action: PayloadAction<{}>) {
      state.list = []
    },
  },
})

export const { actions: dummyActions } = slice
export const useDummySlice = () => {
  // @ts-ignore
  useInjectReducer({ key: slice.name, reducer: slice.reducer })
  useInjectSaga({ key: slice.name, saga: dummySaga })
  return { actions: slice.actions }
}
