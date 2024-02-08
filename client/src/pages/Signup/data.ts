
interface ToastType {
    [key: string]: string,
}

export const toastStyle: ToastType = {
    color: '#000',
    fontSize: '13px',
    padding: '5px',
}

export interface  SignUpDataState {
    firstName: string,
    lastName: string,
    userName: string,
    password: string,
    confirmPassword: string,
    message?: string,
}

export interface SignUpState {
    isLoading: boolean,
    data: SignUpDataState,
    error: boolean,
}