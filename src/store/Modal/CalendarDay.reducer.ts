import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CalendarDayModalState {
  isOpen: boolean;
  date?: string;
}

const initialState: CalendarDayModalState = {
  isOpen: false,
  date: undefined,
};

const CalendarDayModalSlice = createSlice({
  name: 'CalendarDayModal',
  initialState,
  reducers: {
    toggleModalOpen(state, action: PayloadAction<string>) {
      state.isOpen = !state.isOpen;
      state.date = action.payload;
    },
  },
});

export const CalendarDaySliceAction = CalendarDayModalSlice.actions;
export default CalendarDayModalSlice.reducer;
