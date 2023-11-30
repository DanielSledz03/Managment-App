import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@store/index';
import { TaskModalSliceAction } from '@store/Modal/TaskModal.reducer';
import { useQuery } from '@tanstack/react-query';
import { useAxios } from '@/hooks/useAxios';
import { useMemo } from 'react';

const useModalState = () => {
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
