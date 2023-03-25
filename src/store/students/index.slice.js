import { createSlice } from '@reduxjs/toolkit'

const initialState = {
   data: [],
   id: ''
}

export const studentsSlice = createSlice({
   name: "students",
   initialState,
   reducers: {
      storeStudents: (state, { payload }) => {
         state.data = payload
      },
      setStudentId: (state, {payload}) => {
         state.id = payload
      },
      resetStudents: (state) => {
         state.data = []
      },
   }
})

export default studentsSlice