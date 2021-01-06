import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../components/user/userSlice'
import viewportReducer from '../components/layout/viewportSlice'

export default configureStore({
  reducer: {
    viewport: viewportReducer,
    user: userReducer
  }
})