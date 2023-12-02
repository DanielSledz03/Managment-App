import { colors } from '@constants/colors';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface TabButtonProps {
  title: string;
  isSelected?: boolean;
  onPress: () => void;
}

const TabButton = ({ title, isSelected, onPress }: TabButtonProps) => {
  return (
    <TouchableOpacity
      style={[styles.button, isSelected ? styles.selected : null]}
      onPress={onPress}
    >
      {isSelected ? (
        <LinearGradient
          style={styles.buttonGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={['#F1A51A', '#ECAE0F']}
        >
          <Text style={[styles.text, isSelected ? styles.selectedText : null]}>{title}</Text>
        </LinearGradient>
      ) : (
        <Text style={styles.textCompleted}>{title}</Text>
      )}
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
  buttonGradient: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selected: {
    backgroundColor: '#FFD700',
  },
  text: {
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Jost-Bold',
  },
  textCompleted: {
    color: colors.white,
    textDecorationLine: 'underline',
    textAlign: 'center',
    fontFamily: 'Jost-Bold',
    fontWeight: 'bold',
  },
  selectedText: {
    fontWeight: 'bold',
  },
});

export default TabButton;
