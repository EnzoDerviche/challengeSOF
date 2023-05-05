import { configureStore } from "@reduxjs/toolkit";
import fireReducer from "./fireSlice";

export const store = configureStore({
    reducer: {
        fires: fireReducer,
    }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type Dispatch = typeof store.dispatch
