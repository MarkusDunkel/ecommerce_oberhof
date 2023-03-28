import { createSlice } from '@reduxjs/toolkit'

interface InitState {
    currentUser: string | null
};

const initialState: InitState = { currentUser: null }

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setCurrentUser(state, action) {
            const currentUserData = action.payload
            console.log('currentUserData', currentUserData);
            // const name = currentUserData.displayName
            if (currentUserData) { state.currentUser = currentUserData.displayName }
            else { state.currentUser = null };
        }
    }
}
);

export const { setCurrentUser } = userSlice.actions

export default userSlice.reducer