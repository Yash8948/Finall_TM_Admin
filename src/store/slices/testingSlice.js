import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AUTH_TOKEN,USER_EMAIL,USER_NAME,USER_AVATAR, USER_TYPE } from 'constants/AuthConstant';
import AllDataService from 'services/AllDataService';
export const initialState = {
	loading: false,
	message: '',
	showMessage: false,
	redirect: '',
	token: localStorage.getItem(AUTH_TOKEN) || null
}

export const getDashboard = createAsyncThunk('/AdminDashboard',async (data, { rejectWithValue }) => {

	const xtoken = data
	try {
		const response = await AllDataService.admin_Dashboard(xtoken)
		console.log(response);
	} catch (err) {
		return rejectWithValue(err.response?.data?.message || 'Error')
	}
})


// export const signOut = createAsyncThunk('auth/logout',async () => {
// 	localStorage.removeItem(AUTH_TOKEN);
// 	localStorage.removeItem(USER_EMAIL);
// 	localStorage.removeItem(USER_NAME);
// 	localStorage.removeItem(USER_AVATAR);
// 	localStorage.removeItem(USER_TYPE);
	
// })


export const testingSlice = createSlice({
	name: 'testing',
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
		// signOutSuccess: (state) => {
		// 	state.loading = false
		// 	state.token = null
		// 	state.redirect = '/'
		// },
		showLoading: (state) => {
			state.loading = true
		},
		getDashboardSuccess: (state, action) => {
			state.loading = false
			state.token = action.payload
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(getDashboard.pending, (state) => {
				state.loading = true
			})
			.addCase(getDashboard.fulfilled, (state, action) => {
				state.loading = false
				state.redirect = '/'
				state.token = action.payload
			})
			.addCase(getDashboard.rejected, (state, action) => {
				state.message = action.payload
				state.showMessage = true
				state.loading = false
			})
			// .addCase(signOut.fulfilled, (state) => {
			// 	state.loading = false
			// 	state.token = null
			// 	state.redirect = '/'
			// })
			// .addCase(signOut.rejected, (state) => {
			// 	state.loading = false
			// 	state.token = null
			// 	state.redirect = '/'
			// })
		
	},
})

export const { 
	authenticated,
	showAuthMessage,
	hideAuthMessage,
	// signOutSuccess,
	showLoading,
	getDashboardSuccess
} = testingSlice.actions

export default testingSlice.reducer