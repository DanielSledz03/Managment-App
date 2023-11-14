import { colors } from '@constants/colors';
import { useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';

const StartWorkButton = () => {
  const [timer, setTimer] = useState<number | null>(null);
  const [workStarted, setWorkStarted] = useState<boolean>(false);

  const handlePressIn = () => {
    const newTimer = setTimeout(() => {
      Alert.alert('Rozpoczęto pracę', 'Zaczynasz pracę o 8:00.');
      setWorkStarted(true);
    }, 3000) as unknown as number;
    setTimer(newTimer);
  };

  const handlePressOut = () => {
    if (timer !== null) {
      clearTimeout(timer);
      setTimer(null);
    }
  };

  return (
    <TouchableOpacity
      style={styles.counterButton}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={['#F1A51A', '#ECAE0F']}
        style={styles.counterButtonGradient}
      >
        <Icon name={'finger-print-outline'} size={80} color={colors.white} />
        <Text style={styles.counterButtonText}>
          {workStarted
            ? 'Twoja zmiana trwa od 00:15:24. \n\nPrzytrzymaj odcisk przez 3 sekundy, aby zgłosić zakończenie pracy.'
            : 'Przytrzymaj odcisk przez 3 sekundy, aby zgłosić gotowość do pracy.'}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  counterButton: {
    borderRadius: 10,
    width: '100%',
    height: 125,
    backgroundColor: colors.greyMedium2,
  },

  counterButtonGradient: {
    borderRadius: 10,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
  },

  counterButtonText: {
    color: colors.white,
    fontSize: 14,
    fontFamily: 'Jost-SemiBold',
    flex: 1,
    paddingLeft: 10,
  },
});

export default StartWorkButton;
