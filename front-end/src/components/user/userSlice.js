import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: '',
        token: '',
        authenticated: false
    },
    reducers: {
        setUsername: (state, action) => {
            state.username = action.payload
        },
        setEmail: (state, action) => {
            state.email = action.payload
        },
        setCountry: (state, action) => {
            state.country = action.payload
        },
        setStars: (state, action) => {
            state.stars = action.payload
        },
        setToken: (state, action) => {
            state.token = action.payload
        },
        setUid: (state, action) => {
            state.uid = action.payload
        },
        authenticate: state => {
            state.authenticated = true
        }
    }
})

export const { setUsername, setEmail, setCountry, setStars, setToken, setUid, authenticate } = userSlice.actions

export const selectUser = state => state.user

export default userSlice.reducer