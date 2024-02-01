
interface ToastType {
    [key: string]: string,
}

export const toastStyle: ToastType = {
    color: '#000',
    fontSize: '13px',
    padding: '5px',
}

export interface  SignUpState {
    firstName: string,
    lastName: string,
    username: string,
    password: string,
    confirmPassword: string,
}

export interface SignUpDataState {
    isLoading: boolean,
    data: number,
    error: boolean,
}