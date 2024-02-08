import axios from 'axios';
import { loginDataState, loginState } from './../../pages/Login/data';
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";


const API_BASE_URL = 'http://localhost:5000'

const initialDataState: loginDataState = {
    userName: "",
    password: ""
}

const initialState: loginState = {
    data: {...initialDataState},
    isLoading: false,
    error: false
}

export const sendLoginFormData = createAsyncThunk('login/sendLoginForm', async (formData: loginDataState) => {
    const response = await axios.post(`${API_BASE_URL}/api/users/login`, formData);
    return response.data
})

export const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        setField: (state, action: PayloadAction<{field: keyof loginDataState; value: string}>) => {
            const {field, value} = action.payload;
            state.data[field] = value
        },
        reset: (state) => {
            state.data.userName = "";
            state.data.password = ""
        }
    },
    extraReducers: (builder) => {
        builder.addCase(sendLoginFormData.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(sendLoginFormData.fulfilled, (state, action) => {
            state.isLoading = false;
            state.error = false;
            state.data = action.payload;
        })
        .addCase(sendLoginFormData.rejected, (state) => {
            state.error = true;
            state.isLoading = false;
        })
    }
})


export  const {setField, reset} = loginSlice.actions

export default loginSlice.reducer;