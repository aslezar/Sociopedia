import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	user: null,
	token: null,
	mode: 'dark',
	posts: [],
};
export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setLogin: (state, action) => {
			state.user = action.payload.user;
			state.token = action.payload.token;
		},
		setLogout: (state) => {
			state.user = null;
			state.token = null;
		},
		setMode: (state) => {
			state.mode = state.mode === 'dark' ? 'light' : 'dark';
		},
		setFriends: (state, action) => {
			if (state.user) {
				state.user.friends = action.payload.friends;
			} else {
				console.log('user friends not exist');
			}
		},
		setPosts: (state, action) => {
			state.posts = action.payload.posts;
		},
		setPost: (state, action) => {
			const updatedPost = state.posts.map((post) => {
				if (post._id === action.payload._id) {
					return action.payload.post;
				}
				return post;
			});
			state.posts = updatedPost;
		},
	},
});
export const { setLogin, setLogout, setFriends, setMode, setPosts, setPost } =
	authSlice.actions;
export default authSlice.reducer;
