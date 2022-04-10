import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slice/user.slice'
import emailReducer from './slice/emailSlice'
export const store = configureStore({
  reducer: {
    user: userReducer,
    email: emailReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = ReturnType<typeof store.dispatch>
