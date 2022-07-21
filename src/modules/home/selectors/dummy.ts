import { createSelector } from '@reduxjs/toolkit'
import { initialState } from '../slices/dummy'

const selectSlice = (state) => state?.dummy || initialState

export const selectDummies = createSelector(
  [selectSlice],
  (state) => state.list,
)

export const selectLoadingDummy = createSelector(
  [selectSlice],
  (state) => state.loading,
)
