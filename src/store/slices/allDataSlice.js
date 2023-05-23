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

	// const data = localStorage.getItem(AUTH_TOKEN)
    const data = state.token
    console.log(data);
	try {
		// const response = await ExampleService.getDashbaord({data})
		const response = await ExampleService.getDashbaord(data)
		console.log(response);
		
	} catch (err) {
		return rejectWithValue(err.response?.data?.message || 'Error')
        console.log("error");
	}
})


// export default authSlice.reducer