import { configureStore } from '@reduxjs/toolkit';
import AuthReducer from './Auth/Auth.reducer';
import TaskModalReducer from './Modal/TaskModal.reducer';

const store = configureStore({
  reducer: {
    auth: AuthReducer,
    taskModal: TaskModalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
