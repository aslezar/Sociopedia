import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	user: null,
	token: null,
	mode: 'dark',
	post: [],
};
export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		login: (state, action) => {
			state.user = action.payload.user;
			state.token = action.payload.token;
		},
		logout: (state) => {
			state.user = null;
			state.token = null;
		},
		setMode: (state) => {
			state.mode = state.mode === 'dark' ? 'light' : 'dark';
		},
	},
});
export const { login, logout, setMode } = authSlice.actions;
export const selectUser = (state) => state.auth.user;
export const selectToken = (state) => state.auth.token;
export const selectMode = (state) => state.auth.mode;
export default authSlice.reducer;
