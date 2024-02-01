import { createSlice } from "@reduxjs/toolkit";
import { pageData } from "../../pages/Login/data";


export const appRouteSlice = createSlice({
    name: 'appRouter',
    initialState: {
        route: pageData,
    },
    reducers: {
        
    },
})