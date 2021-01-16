import { createSlice } from '@reduxjs/toolkit'

export const characterSlice = createSlice({
    name: 'characters',
    initialState: {
        characters: []
    },
    reducers: {
        setCharacters: (state, action) => {
            state.characters = action.payload
        },
        addCharacter: (state, action) => {
            state.characters.push(action.payload);
        }

    }
})

export const { setCharacters, addCharacter } = characterSlice.actions

export const selectCharacters = state => state.characters

export default characterSlice.reducer