import { colors } from '@constants/colors';
import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native';

const CloseButton = ({ onPress }: { onPress: () => any }) => (
  <TouchableOpacity onPress={onPress} style={styles.closeContainer}>
    <Image style={styles.closeIcon} source={require('../../assets/icons/closeIcon.png')} />
    <Text style={styles.closeText}>Zamknij</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  closeContainer: {
    position: 'absolute',
    right: 15,
    top: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },

  closeIcon: {
    width: 20,
    height: 20,
    marginBottom: 5,
  },

  closeText: {
    fontSize: 12,
    fontWeight: '500',
    fontFamily: 'Jost',
    color: colors.darkSlate,
  },
});

export default CloseButton;
