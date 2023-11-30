import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface TaskModalState {
  isOpen: boolean;
  openedTaskId?: string;
  restoreTaskModalOpen?: boolean;
}

const initialState: TaskModalState = {
  isOpen: false,
  openedTaskId: undefined,
  restoreTaskModalOpen: false,
};

const TaskModalSlice = createSlice({
  name: 'TaskModal',
  initialState,
  reducers: {
    toggleModalOpen(state, action: PayloadAction<string | undefined>) {
      state.isOpen = !state.isOpen;
      state.openedTaskId = action.payload;
    },

    toggleRestoreModalOpen(state) {
      state.restoreTaskModalOpen = !state.restoreTaskModalOpen;
    },
  },
});

export const TaskModalSliceAction = TaskModalSlice.actions;
export default TaskModalSlice.reducer;
