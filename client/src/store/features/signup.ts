import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { SignUpState, SignUpDataState } from "../../pages/Signup/data";
import axios from "axios";


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

const initialState : SignUpState = {
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    confirmPassword: '',
}

const initialDataState: SignUpDataState = {
    isLoading: false,
    data:  0,
    error: false,
}

export const SendSignUpFormData = createAsyncThunk("sendSignUpFormData", async (data) => {
    const response = await axios.post(`${API_BASE_URL}/api/users/sign-up`, data);
    return response.status;
})

export const signupDataSlice = createSlice({
    name: 'signUpData',
    initialState: initialDataState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(SendSignUpFormData.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(SendSignUpFormData.fulfilled, (state, action: PayloadAction<number>) => {
            state.isLoading = false
            state.data = action.payload
        })
        builder.addCase(SendSignUpFormData.rejected, (state) => {
            state.error = true
        })
    }
})


export const signupSlice = createSlice({
    name: "signup",
    initialState,
    reducers: {
        setField: (state, action: PayloadAction<{field: keyof SignUpState, value: string}>) => {
            const {field, value} = action.payload;
            state[field] = value;
        }
    }
})

export const { setField } = signupSlice.actions;

export default signupSlice.reducer;