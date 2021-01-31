import { createSlice } from '@reduxjs/toolkit'

export const viewportSlice = createSlice({
    name: 'viewport',
    initialState: {
        width: 0,
        height: 0,
    },
    reducers: {
        setWidth: (state, action) => {
            state.width = action.payload
        },
        setHeight: (state, action) => {
            state.height = action.payload
        }
    }
})

export const { setWidth, setHeight } = viewportSlice.actions

export const selectViewport = state => state.viewport

export default viewportSlice.reducer