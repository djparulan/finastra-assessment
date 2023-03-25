import { createSlice } from '@reduxjs/toolkit'

const initialState = {
   data: []
}

export const profileSlice = createSlice({
   name: "profile",
   initialState,
   reducers: {
      storeProfile: (state, { payload }) => {
         state.data = payload
      },
      resetProfile: (state) => {
         state.data = []
      },
   }
})

export default profileSlice