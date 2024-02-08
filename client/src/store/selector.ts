import { RootState } from "./index";

// selectors for signup
export const selectSignUpFormData = (state: RootState) => state.signup.data;
export const selectSignUpStatus = (state: RootState) => state.signup.isLoading;
export const selectSignUpError = (state: RootState) => state.signup.error;

// slecectors for login
export const selectLoginFormData = (state: RootState) => state.login.data;
export const selectLoginStatus = (state: RootState) => state.login.isLoading;
export const selectLoginError = (state: RootState) => state.login.error;