import { RootState } from '@store/index';
import { TaskModalSliceAction } from '@store/Modal/TaskModal.reducer';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAxios } from '@/hooks/useAxios';
import { Task } from '@/types/Task.type';

interface ModalState {
  isModalOpen: boolean;
  openedTaskId: string | undefined;
  task: Task | null;
  date: string | null;
  refetch: () => any;
  toggleModal: () => any;
}

const useModalState = (): ModalState => {
  const dispatch = useDispatch();
  const axios = useAxios();
  const { isOpen, openedTaskId } = useSelector((state: RootState) => state.taskModal);

  const { data: task, refetch } = useQuery({
    queryKey: ['tasks', openedTaskId],
    queryFn: async () => {
      return await axios.get(`/task/${openedTaskId}`).then((res) => res.data);
    },
  });

  const date = useMemo(() => {
    return task
      ? new Date(task.createdAt).toLocaleDateString('pl-PL', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
        })
      : null;
  }, [task]);

  const toggleModal = () => {
    dispatch(TaskModalSliceAction.toggleModalOpen());
  };

  return { isModalOpen: isOpen, openedTaskId, task, date, refetch, toggleModal };
};

export default useModalState;
