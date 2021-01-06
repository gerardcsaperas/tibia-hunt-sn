import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: '',
        token: '',
        authenticated: false
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
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

export const { setUser, setToken, setUid, authenticate } = userSlice.actions

export const selectUser = state => state.user

export default userSlice.reducer