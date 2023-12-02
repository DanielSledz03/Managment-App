import GradientButton from '@components/Button/GradientButton/GradientButton';
import TextButton from '@components/Button/TextButton/TextButton';
import TextArea from '@components/Input/TextArea';
import ModalComponent from '@components/Modal/Modal';
import { colors } from '@constants/colors';
import { TaskModalSliceAction } from '@store/Modal/TaskModal.reducer';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { useDispatch } from 'react-redux';
import { useAxios } from '@/hooks/useAxios';
import useModalState from '@/hooks/useModalState';
import { TaskStatus } from '@/types/Task.type';
import { User } from '@/types/User.type';

const TaskModalAssigneeChange = () => {
  const [rejectionReason, setRejctionReason] = useState('');
  const [assigneeId, setAssigneeId] = useState<number | null>(null);
  const dispatch = useDispatch();
  const axios = useAxios();

  const { data: users } = useQuery<User[]>({
    queryKey: ['users'],
    queryFn: async () => {
      return await axios.get('/user').then((res) => res.data);
    },
    refetchOnWindowFocus: true,
  });

  const { openedTaskId, task } = useModalState();

  const handleTaskRejection = async () => {
    try {
      await axios.patch(`/task/${openedTaskId}`, {
        status: TaskStatus.InProgress,
        rejectionReason: rejectionReason,
        userId: assigneeId,
      });

      dispatch(TaskModalSliceAction.toggleAssigneeChangeModalOpen());
    } catch (err) {
      console.log(err.response.data);
    }
  };

  return (
    <ModalComponent containerStyle={styles.container} isOpen={true}>
      {task?.priority && <Text style={styles.priority}>Priorytet</Text>}

      {users && users.length > 0 && (
        <RNPickerSelect
          placeholder={{ label: 'Wybierz osobę', value: null }}
          style={{
            inputIOS: {
              fontSize: 16,
              fontFamily: 'Jost',
              color: colors.black,
              backgroundColor: 'white',
              minHeight: 50,
              paddingLeft: 15,
              marginBottom: 20,
              borderRadius: 15,
              borderWidth: 1,
              borderColor: colors.greyDark3,
            },
            inputAndroid: {
              fontSize: 16,
              fontFamily: 'Jost',
              color: colors.black,
              backgroundColor: 'white',
              borderRadius: 15,
              marginBottom: 20,
              borderWidth: 1,
              borderColor: colors.greyDark3,
            },

            placeholder: { fontSize: 16, fontFamily: 'Jost', color: colors.black },
          }}
          onValueChange={(value) => setAssigneeId(value)}
          items={users.map((user) => ({ label: user.name, value: user.id }))}
        />
      )}

      <Text style={styles.title}>Wpisz powód przepisania zadania:</Text>

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
            dispatch(TaskModalSliceAction.toggleAssigneeChangeModalOpen());
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

export default TaskModalAssigneeChange;
