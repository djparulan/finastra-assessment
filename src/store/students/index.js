import studentsReducer from './index.slice'

export const {
  storeStudents,
  setStudentId,
  resetStudents,
} = studentsReducer.actions


export default studentsReducer.reducer