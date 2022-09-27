import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from 'firebase/auth'

type AuthState = {
	isLoading: boolean
	userInfo: Partial<User> | null
}
type AuthAction = {
	userInfo: Partial<User> | null
}
const initialState: AuthState = {
	isLoading: true,
	userInfo: null,
}
const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setUser: (state: AuthState, action: PayloadAction<AuthAction>) => {
			state.isLoading = false
			state.userInfo = action.payload.userInfo
		},
		removeUser: (state: AuthState) => {
			state.isLoading = false
			state.userInfo = null
		},
	},
})
export const { removeUser, setUser } = authSlice.actions
export default authSlice.reducer
