import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { SignUpState, SignUpDataState } from "../../pages/Signup/data";
import axios from "axios";


const API_BASE_URL = 'http://localhost:5000'

const initialDataState: SignUpDataState = {
  firstName: "",
  lastName: "",
  userName: "",
  password: "",
  confirmPassword: "",
};

const initialState: SignUpState = {
  isLoading: false,
  data: {...initialDataState},
  error: false,
};

// Pass the formData as an argument
export const sendSignUpFormData = createAsyncThunk("signup/sendData", async (formData: SignUpDataState) => {
  const response = await axios.post(`${API_BASE_URL}/api/users/sign-up`, formData);
  return response.data;
});

export const signupSlice = createSlice({
  name: "signup",
  initialState,
  reducers: {
    setField: (state, action: PayloadAction<{ field: keyof SignUpDataState; value: string }>) => {
      const { field, value } = action.payload;
      state.data[field] = value;
    },
    reset: (state) => {
      state.data.firstName = ''
      state.data.lastName = ''
      state.data.userName = ''
      state.data.password = ''
      state.data.confirmPassword = ''
    }
  },
  extraReducers: (builder) => {
    builder.addCase(sendSignUpFormData.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(sendSignUpFormData.fulfilled, (state, action: PayloadAction<SignUpDataState>) => {
      state.isLoading = false;
      state.error = false;
      state.data = action.payload;
    });
    builder.addCase(sendSignUpFormData.rejected, (state) => {
      state.error = true;
      state.isLoading = false;
    });
  },
});

export const { setField, reset } = signupSlice.actions;

export default signupSlice.reducer;
