import coursesReducer from './index.slice'

export const {
  storeCourses,
  storeCurrencyTypes,
  storeCoursesExchangeRates,
  resetCourses
} = coursesReducer.actions


export default coursesReducer.reducer