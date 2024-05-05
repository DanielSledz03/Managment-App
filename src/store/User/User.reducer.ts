import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
  name: string;
  email: string;
  id: string;
}

const initialState: UserState = {
  name: '',
  email: '',
  id: '',
};

const UserSlice = createSlice({
  name: 'User',
  initialState,
  reducers: {
    setUserData(state, action: PayloadAction<UserState>) {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.id = action.payload.id;
    },
  },
});

export const UserSliceAction = UserSlice.actions;
export default UserSlice.reducer;
