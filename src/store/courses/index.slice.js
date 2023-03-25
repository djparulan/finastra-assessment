import { createSlice } from '@reduxjs/toolkit'

const initialState = {
   data: [],
   currencyType: {},
   exchangeRate: {}
}

export const coursesSlice = createSlice({
   name: "courses",
   initialState,
   reducers: {
      storeCourses: (state, { payload }) => {
         state.data = payload
      },
      storeCoursesExchangeRates: (state, { payload }) => {
         state.exchangeRate = payload
      },
      storeCurrencyTypes: (state, { payload }) => {
         state.currencyType = payload
      },
      resetCourses: (state) => {
         state.data = []
      },
   }
})

export default coursesSlice