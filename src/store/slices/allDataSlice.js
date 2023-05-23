import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AUTH_TOKEN,USER_EMAIL,USER_NAME,USER_AVATAR, USER_TYPE } from 'constants/AuthConstant';
import ExampleService from 'services/ExampleService';
import Swal from 'sweetalert2'
export const initialState = {
	loading: false,
	message: '',
	showMessage: false,
	redirect: '',
	token: localStorage.getItem(AUTH_TOKEN) || null
}

export const signIn = createAsyncThunk('/AdminDashboard',async (data, { rejectWithValue }) => {

	const data = localStorage.getItem(AUTH_TOKEN)
    console.log(data);
	try {
		const response = await ExampleService.getDashbaord({data})
		console.log(response);

		
	} catch (err) {
		return rejectWithValue(err.response?.data?.message || 'Error')
	}
})



export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		authenticated: (state, action) => {
			state.loading = false
			state.redirect = '/'
			state.token = action.payload
		},
		showAuthMessage: (state, action) => {
			state.message = action.payload
			state.showMessage = true
			state.loading = false
		},
		hideAuthMessage: (state) => {
			state.message = ''
			state.showMessage = false
		},
		signOutSuccess: (state) => {
			state.loading = false
			state.token = null
			state.redirect = '/'
		},
		showLoading: (state) => {
			state.loading = true
		},
		signInSuccess: (state, action) => {
			state.loading = false
			state.token = action.payload
		}
	},
	// extraReducers: (builder) => {
	// 	builder
	// 		.addCase(signIn.pending, (state) => {
	// 			state.loading = true
	// 		})
	// 		.addCase(signIn.fulfilled, (state, action) => {
	// 			state.loading = false
	// 			state.redirect = '/'
	// 			state.token = action.payload
	// 		})
	// 		.addCase(signIn.rejected, (state, action) => {
	// 			state.message = action.payload
	// 			state.showMessage = true
	// 			state.loading = false
	// 		})
	// 		.addCase(signOut.fulfilled, (state) => {
	// 			state.loading = false
	// 			state.token = null
	// 			state.redirect = '/'
	// 		})
	// 		.addCase(signOut.rejected, (state) => {
	// 			state.loading = false
	// 			state.token = null
	// 			state.redirect = '/'
	// 		})
	// },
})

export const { 
	authenticated,
	showAuthMessage,
	hideAuthMessage,
	signOutSuccess,
	showLoading,
	signInSuccess
} = authSlice.actions

export default authSlice.reducer