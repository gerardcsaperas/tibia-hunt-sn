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

export const { setUsername, setToken, setUid, authenticate } = userSlice.actions

export const selectUser = state => state.user

export default userSlice.reducer