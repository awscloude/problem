import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null,
  token: null,
  status: false
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.user = action.payload.user
      state.token = action.payload.token
      state.status = action.payload.status
    },
  },
})

export const { setAuth } = authSlice.actions

export default authSlice.reducer