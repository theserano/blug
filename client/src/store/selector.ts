import { RootState } from "./index";

// selectors for signup
export const selectSignUpFormData = (state: RootState) => state.signup.data;
export const selectSignUpStatus = (state: RootState) => state.signup.isLoading;
export const selectSignUpError = (state: RootState) => state.signup.error;