import { colors } from '@constants/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootState } from '@store/index';
import { useMutation } from '@tanstack/react-query';
import { formatTimeDiff } from '@utils/formatTimeDiff';
import axios from 'axios';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Alert, Animated, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Config from 'react-native-config';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';

const StartWorkButton = () => {
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  const [workStarted, setWorkStarted] = useState(false);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [currentTime, setCurrentTime] = useState<Date | null>(null);
  const iconScale = useRef(new Animated.Value(!workStarted ? 1 : 1.175)).current;
  const user = useSelector((state: RootState) => state.user);

  const animateIcon = useCallback((scaleToValue: number) => {
    Animated.timing(iconScale, {
      toValue: scaleToValue,
      duration: 3000,
      useNativeDriver: true,
    }).start();
  }, []);

  const handlePressIn = useCallback(async () => {
    animateIcon(workStarted ? 1 : 1.175);
    const startTimeStored = await AsyncStorage.getItem('startTime');

    if (!startTimeStored) {
      // Start new work session
      setTimer(
        setTimeout(async () => {
          const startTime = new Date();
          Alert.alert(
            'Rozpoczęto pracę',
            `Zaczynasz pracę o ${startTime.toLocaleTimeString('pl-PL')}`,
          );
          setWorkStarted(true);
          setStartTime(startTime);
          await AsyncStorage.setItem('startTime', startTime.toISOString());
          const shiftCreationResponse = await axios.post(`${Config.HOSTNAME}/shifts/create`, {
            startTime: startTime.toISOString(),
            userId: user.id,
            date: startTime.toISOString(),
          });
          await AsyncStorage.setItem('shiftId', shiftCreationResponse.data.id.toString());
        }, 3000),
      );
    } else {
      // End current work session
      setTimer(
        setTimeout(async () => {
          const endTime = new Date();
          Alert.alert(
            'Zakończono pracę',
            `Zakończyłeś pracę o ${endTime.toLocaleTimeString('pl-PL')}`,
          );
          setWorkStarted(false);
          setStartTime(null);
          setCurrentTime(null);
          await AsyncStorage.removeItem('startTime');
          const shiftId = await AsyncStorage.getItem('shiftId');
          if (shiftId) {
            await axios.patch(`${Config.HOSTNAME}/shifts`, {
              endTime: endTime.toISOString(),
              id: parseInt(shiftId),
            });
            await AsyncStorage.removeItem('shiftId');
          }
        }, 3000),
      );
    }
  }, [workStarted, user.id]);

  const handlePressOut = useCallback(() => {
    if (timer) {
      clearTimeout(timer);
      setTimer(null);
    }
    if (!workStarted) {
      animateIcon(1);
    }
  }, [timer, workStarted]);

  useEffect(() => {
    const checkStoredTime = async () => {
      const startTimeStored = await AsyncStorage.getItem('startTime');
      if (startTimeStored) {
        setStartTime(new Date(startTimeStored));
        setWorkStarted(true);
        setCurrentTime(new Date());
        if (!workStarted) {
          animateIcon(1.175);
        } else {
          animateIcon(1);
        }
      }
    };
    checkStoredTime();

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, []);

  useEffect(() => {
    if (workStarted) {
      const interval = setInterval(() => {
        setCurrentTime(new Date());
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [workStarted]);

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
            ? `Twoja zmiana trwa od ${formatTimeDiff(startTime, currentTime)}
               \nPrzytrzymaj odcisk przez 3 sekundy, aby zgłosić zakończenie pracy.`
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
