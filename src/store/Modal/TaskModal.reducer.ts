import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface TaskModalState {
  isOpen: boolean;
  openedTaskId?: string;
  restoreTaskModalOpen?: boolean;
  rejectionTaskModalOpen?: boolean;
  assigneeChangeModalOpen?: boolean;
  completedTaskModalOpen?: boolean;
}

const initialState: TaskModalState = {
  isOpen: false,
  openedTaskId: undefined,
  restoreTaskModalOpen: false,
  rejectionTaskModalOpen: false,
  assigneeChangeModalOpen: false,
  completedTaskModalOpen: false,
};

const TaskModalSlice = createSlice({
  name: 'TaskModal',
  initialState,
  reducers: {
    toggleModalOpen(state, action: PayloadAction<string | undefined>) {
      state.isOpen = !state.isOpen;
      state.openedTaskId = action.payload;
    },

    toggleCompletedModalOpen(state, action: PayloadAction<string | undefined>) {
      state.completedTaskModalOpen = !state.completedTaskModalOpen;
      state.openedTaskId = action.payload;
    },

    toggleRestoreModalOpen(state) {
      state.restoreTaskModalOpen = !state.restoreTaskModalOpen;
    },

    toggleRejectionModalOpen(state) {
      state.rejectionTaskModalOpen = !state.rejectionTaskModalOpen;
    },

    toggleAssigneeChangeModalOpen(state) {
      state.assigneeChangeModalOpen = !state.assigneeChangeModalOpen;
    },
  },
});

export const TaskModalSliceAction = TaskModalSlice.actions;
export default TaskModalSlice.reducer;
