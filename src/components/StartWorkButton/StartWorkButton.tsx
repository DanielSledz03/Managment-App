import { colors } from '@constants/colors';
import { formatTimeDiff } from '@utils/formatTimeDiff';
import { useEffect, useRef, useState } from 'react';
import { Alert, Animated, StyleSheet, Text, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';

const StartWorkButton = () => {
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  const [workStarted, setWorkStarted] = useState<boolean>(false);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [currentTime, setCurrentTime] = useState<Date | null>(null);
  const iconScale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.timing(iconScale, {
      toValue: workStarted ? 1 : 1.175,
      duration: 3000,
      useNativeDriver: true,
    }).start();

    const newTimer = setTimeout(() => {
      if (!workStarted) {
        Alert.alert(
          'Rozpoczęto pracę',
          `Zaczynasz pracę o ${new Date()?.toLocaleTimeString('pl-PL', {
            hour: 'numeric',
            minute: 'numeric',
          })}`,
        );
        setWorkStarted(true);
        setStartTime(new Date());
      } else {
        Alert.alert(
          'Zakończono pracę',
          `Zakończyłeś pracę o ${currentTime?.toLocaleDateString('pl-PL', {
            hour: 'numeric',
            minute: 'numeric',
          })}.`,
        );
        setWorkStarted(false);
        setStartTime(null);
      }
    }, 3000);
    setTimer(newTimer);
  };

  const handlePressOut = () => {
    if (timer !== null) {
      clearTimeout(timer);
      setTimer(null);
    }

    if (!workStarted) {
      Animated.timing(iconScale, {
        toValue: !workStarted ? 1 : 1.175,
        duration: 2000,
        useNativeDriver: true,
      }).start();
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (workStarted && startTime) {
      interval = setInterval(() => {
        setCurrentTime(new Date());
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [workStarted, startTime]);

  return (
    <TouchableOpacity
      activeOpacity={1}
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
        <Animated.View style={{ transform: [{ scale: iconScale }] }}>
          <Icon name={'finger-print-outline'} size={80} color={colors.white} />
        </Animated.View>
        <Text style={styles.counterButtonText}>
          {workStarted
            ? `Twoja zmiana trwa od ${formatTimeDiff(
                startTime,
                currentTime,
              )}\n\nPrzytrzymaj odcisk przez 3 sekundy, aby zgłosić zakończenie pracy.`
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
