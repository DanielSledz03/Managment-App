import GradientButton from '@components/Button/GradientButton/GradientButton';
import TextButton from '@components/Button/TextButton/TextButton';
import TextArea from '@components/Input/TextArea';
import ModalComponent from '@components/Modal/Modal';
import { colors } from '@constants/colors';
import { TaskModalSliceAction } from '@store/Modal/TaskModal.reducer';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { useAxios } from '@/hooks/useAxios';
import useModalState from '@/hooks/useModalState';
import { TaskStatus } from '@/types/Task.type';

const TaskRejectionModal = () => {
  const [rejectionReason, setRejctionReason] = useState('');
  const dispatch = useDispatch();
  const axios = useAxios();
  const { openedTaskId, task } = useModalState();

  const handleTaskRejection = async () => {
    try {
      await axios.patch(`/task/${openedTaskId}`, {
        status: TaskStatus.Rejected,
        rejectionReason: rejectionReason,
      });

      dispatch(TaskModalSliceAction.toggleRejectionModalOpen());
      dispatch(TaskModalSliceAction.toggleModalOpen());
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ModalComponent containerStyle={styles.container} isOpen={true}>
      {task?.priority && <Text style={styles.priority}>Priorytet</Text>}

      <Text style={styles.title}>Wpisz powód odrzucenia zadania:</Text>

      <TextArea onChangeText={(e) => setRejctionReason(e)} value={rejectionReason} />

      <View style={styles.buttonsRow}>
        <GradientButton
          title='Potwierdź'
          onPress={() => handleTaskRejection()}
          containerStyle={styles.submitButton}
          textStyle={{ fontSize: 16 }}
          gradientStyle={{ borderRadius: 10 }}
        />
        <TextButton
          title='Wróć do zadania'
          onPress={() => {
            dispatch(TaskModalSliceAction.toggleRejectionModalOpen());
          }}
          containerStyle={styles.backButton}
          textStyle={{ color: colors.darkSlate, fontSize: 16 }}
        />
      </View>
    </ModalComponent>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    paddingVertical: 15,
    paddingHorizontal: 15,
    justifyContent: 'center',
  },

  priority: {
    position: 'absolute',
    left: 15,
    top: 15,
    fontSize: 12,
    fontWeight: '500',
    fontFamily: 'Jost',
    color: colors.redBright,
  },

  title: {
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'Jost',
    color: colors.black,
    marginBottom: 10,
  },

  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    alignItems: 'center',
  },

  submitButton: {
    width: '48%',
  },

  backButton: {
    width: '49%',
    borderRadius: 10,
  },
});

export default TaskRejectionModal;
