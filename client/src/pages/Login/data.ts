

export interface loginDataState {
    userName: string, 
    password: string,
    message?: string,
    userId?: string,
    firstName?: string,
    lastName?: string,
}

export interface loginState {
    data: loginDataState,
    isLoading: boolean,
    error: boolean
}