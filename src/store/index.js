import { 
  configureStore, 
  combineReducers, 
} from '@reduxjs/toolkit'
import studentsReducer from './students'
import coursesReducer from './courses'
import profileReducer from './profile'

const store = configureStore({
  reducer: {
     students: studentsReducer,
     courses: coursesReducer,
     profile: profileReducer
  },
  middleware: (getDefaultMiddleWare) => getDefaultMiddleWare() 
})

export { store }