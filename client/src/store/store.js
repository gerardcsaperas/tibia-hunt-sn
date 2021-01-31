import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../components/user/userSlice'
import charactersReducer from '../components/character/characterSlice'
import viewportReducer from '../components/layout/viewportSlice'

export default configureStore({
  reducer: {
    viewport: viewportReducer,
    user: userReducer,
    characters: charactersReducer
  }
})