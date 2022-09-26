import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from 'firebase/auth'

type AuthState = {
	user: User | null
}
type AuthAction = {
	user: User
}
const initialState: AuthState = {
	user: null,
}
const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setUser: (state: AuthState, action: PayloadAction<AuthAction>) => {
			state.user = action.payload.user
		},
		removeUser: (state: AuthState) => {
			state.user = null
		},
	},
})
export const { removeUser, setUser } = authSlice.actions
export default authSlice.reducer
