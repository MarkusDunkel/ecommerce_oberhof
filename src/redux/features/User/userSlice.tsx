import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    currentUser: null
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setCurrentUser(state, action) {
            const currentUser = action.payload
            state.currentUser = currentUser
        }
    }
})

export const { setCurrentUser } = userSlice.actions

export default userSlice.reducer