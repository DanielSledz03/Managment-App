import { StyleSheet, View } from 'react-native';

interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  containerStyle?: object;
}

const ModalComponent = ({ children, isOpen, containerStyle }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <View style={styles.container}>
      <View style={[styles.modal, containerStyle]}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 100,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 100,
    paddingHorizontal: 20,
  },

  modal: {
    width: '100%',
    minHeight: 472,
    backgroundColor: '#E1E1E1',
    borderRadius: 10,
  },
});

export default ModalComponent;
