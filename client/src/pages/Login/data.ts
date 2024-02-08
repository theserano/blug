

export interface loginDataState {
    userName: string, 
    password: string,
    message?: string
}

export interface loginState {
    data: loginDataState,
    isLoading: boolean,
    error: boolean
}