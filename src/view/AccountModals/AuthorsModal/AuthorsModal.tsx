import CloseButton from '@components/Modal/CloseButton';
import ModalComponent from '@components/Modal/Modal';
import { colors } from '@constants/colors';

import { StyleSheet, Text, View } from 'react-native';

interface AuthorsModalProps {
  isModalOpen: boolean;
  closeModal: () => void;
}

const AuthorsModal = ({ isModalOpen, closeModal }: AuthorsModalProps) => {
  return (
    <ModalComponent containerStyle={styles.container} isOpen={isModalOpen}>
      <CloseButton onPress={closeModal} />
      <Text style={styles.title}>Autorzy aplikacji</Text>
      <Text style={styles.author}>Programista: Daniel Śledź</Text>
      <Text style={styles.author}>Design: Szymon Kanik & Daniel Śledź</Text>
    </ModalComponent>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    paddingVertical: 15,
    paddingHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 300,
  },

  title: {
    fontSize: 34,
    fontWeight: '600',
    fontFamily: 'Jost',
    color: colors.black,
    marginBottom: 15,
  },

  author: {
    fontSize: 16,
    fontWeight: '400',
    fontFamily: 'Jost',
    color: colors.greyDark8,
    marginBottom: 10,
  },
});

export default AuthorsModal;
