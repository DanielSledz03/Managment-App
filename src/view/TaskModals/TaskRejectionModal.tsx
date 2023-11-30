import GradientButton from '@components/Button/GradientButton/GradientButton';
import TextButton from '@components/Button/TextButton/TextButton';
import Input from '@components/Input/Input';
import TextArea from '@components/Input/TextArea';
import ModalComponent from '@components/Modal/Modal';
import { colors } from '@constants/colors';
import { RootState } from '@store/index';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';

const TaskRejectionModal = () => {
  const isModalOpen = useSelector((state: RootState) => state.taskModal.isOpen);

  return (
    <ModalComponent containerStyle={styles.container} isOpen={isModalOpen}>
      <Text style={styles.priority}>Priorytet</Text>

      <Text style={styles.title}>Wpisz powód odrzucenia zadania:</Text>

      <TextArea />

      <View style={styles.buttonsRow}>
        <GradientButton
          title='Potwierdź'
          onPress={() => null}
          containerStyle={styles.submitButton}
          textStyle={{ fontSize: 16 }}
          gradientStyle={{ borderRadius: 10 }}
        />
        <TextButton
          title='Wróć do zadania'
          onPress={() => null}
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
