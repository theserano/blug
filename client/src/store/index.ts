import { configureStore } from "@reduxjs/toolkit";
import signupReducer from "./features/signup";
import loginReducer from "./features/login"

const store = configureStore({
    reducer: {
        signup: signupReducer,
        login: loginReducer,
    },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store;
