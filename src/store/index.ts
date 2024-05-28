import AuthReducer from './Auth/Auth.reducer';
import TaskModalReducer from './Modal/TaskModal.reducer';
import UserReducer from './User/User.reducer';
import CalendarDayModalReducer from './Modal/CalendarDay.reducer';

import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: {
    auth: AuthReducer,
    taskModal: TaskModalReducer,
    user: UserReducer,
    calendarDayModal: CalendarDayModalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
