import { createSlice } from '@reduxjs/toolkit'

interface InitState {
    id: string | null,
    email?: string | null,
    displayName?: string | null,
    createdDate?: string | null
};

const initialState: InitState = { id: null }

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action) {
            const userData = action.payload
            console.log('userData', userData);
            if (userData) {
                console.log('inside');
                state.id = userData.id
                state.displayName = userData.displayName
                state.email = userData.email
            }
            else {
                state.id = null
                state.displayName = null
                state.email = null
            };
        }
    }
}
);

export const { setUser } = userSlice.actions

export default userSlice.reducer