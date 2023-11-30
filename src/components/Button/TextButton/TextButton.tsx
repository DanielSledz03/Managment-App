import { colors } from '@constants/colors';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

interface TextButtonProps {
  title: string;
  onPress: () => void;
  containerStyle?: object;
  textStyle?: object;
}

const TextButton = ({ title, onPress, containerStyle, textStyle }: TextButtonProps) => {
  return (
    <TouchableOpacity style={[styles.button, containerStyle]} onPress={onPress}>
      <Text style={[styles.textCompleted, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '48%',
    height: 54,
    borderRadius: 10,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },

  textCompleted: {
    color: colors.white,
    textDecorationLine: 'underline',
    textAlign: 'center',
    fontFamily: 'Jost-Bold',
    fontWeight: 'bold',
  },
});

export default TextButton;
