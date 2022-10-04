import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import type { User } from 'firebase/auth'

interface AuthState {
  isLoading: boolean
  userInfo: Partial<User> | null
}
interface AuthAction {
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
