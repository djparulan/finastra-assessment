import profileReducer from './index.slice'

export const {
  storeProfile,
  setStudentId,
  resetProfile
} = profileReducer.actions


export default profileReducer.reducer