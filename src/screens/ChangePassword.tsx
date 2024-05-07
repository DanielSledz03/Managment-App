import { colors } from '@constants/colors';
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import Input from '@components/Input/Input';
import GradientButton from '@components/Button/GradientButton/GradientButton';
import { useCallback, useState } from 'react';
import axios from 'axios';
import Config from 'react-native-config';
import { useMutation } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { RootState } from '@store/index';

const ChangePassword = ({ navigation }: any) => {
  const user = useSelector((state: RootState) => state.user);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [error, setError] = useState('');
  const [oldPasswordError, setOldPasswordError] = useState(false);

  const mutationFn = useCallback(async () => {
    if (!oldPassword) {
      setOldPasswordError(true);
      Alert.alert('Błąd', 'Podaj obecne hasło.');
      return;
    }
    try {
      await axios.post(Config.HOSTNAME + '/auth/changePassword', {
        email: user.email,
        newPassword,
        oldPassword,
      });
      Alert.alert('Sukces', 'Hasło zostało zmienione!', [
        { text: 'OK', onPress: () => navigation.navigate('Account') },
      ]);
    } catch (err: any) {
      if (err.response.data.message.message === 'Invalid old password') {
        setOldPasswordError(true);
        setError('Nieprawidłowe stare hasło.');
        return;
      }

      setOldPasswordError(true);
      setError('Wystąpił błąd.');
    }
  }, [user.email, newPassword, oldPassword, navigation]);

  const mutation = useMutation({
    mutationFn,
  });

  const validatePassword = (password: string) => {
    return (
      password.length >= 8 && /[A-Z]/.test(password) && /[!@#$%^&*(),.?":{}|<>]/.test(password)
    );
  };

  const handleSubmit = () => {
    setOldPasswordError(false);
    if (!oldPassword) {
      setOldPasswordError(true);
      setError('Musisz wprowadzić obecne hasło.');
      return;
    }
    if (!validatePassword(newPassword)) {
      setError('Nowe hasło nie spełnia wymagań.');
      return;
    }
    if (newPassword !== confirmNewPassword) {
      setError('Hasła nie są zgodne.');
      return;
    }
    setError('');
    mutation.mutate();
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.wrapper}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backIcon}>
        <Image
          style={{ objectFit: 'contain', width: 28 }}
          source={require('../assets/icons/leftArrow.png')}
        />
      </TouchableOpacity>
      <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={50}>
        <Text style={styles.heading}>Zmiana hasła</Text>
        <Text style={[styles.errorText, { opacity: error ? 1 : 0 }]}>{error}</Text>
        <Input
          value={oldPassword}
          onChangeText={setOldPassword}
          placeholder='Obecne hasło'
          secureTextEntry
          icon
          error={oldPasswordError}
        />
        <Input
          icon
          placeholder='Nowe hasło'
          value={newPassword}
          onChangeText={setNewPassword}
          secureTextEntry
          error={!!error}
        />
        <Input
          placeholder='Potwierdź nowe hasło'
          icon
          value={confirmNewPassword}
          onChangeText={setConfirmNewPassword}
          secureTextEntry
          error={!!error}
        />
        <GradientButton title='Potwierdź' onPress={handleSubmit} />
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: colors.greyDark2,
  },

  wrapper: { justifyContent: 'center', alignItems: 'center', flex: 1, position: 'relative' },

  backIcon: {
    position: 'absolute',
    top: 40,
    left: 0,
    width: 28,
    height: 28,
  },

  heading: {
    width: '100%',
    textAlign: 'center',
    fontSize: 34,
    color: colors.white,
    marginBottom: 20,
    fontFamily: 'Jost',
    fontWeight: 'bold',
  },

  errorText: {
    color: colors.red,
    marginBottom: 25,
    textAlign: 'center',
  },
});

export default ChangePassword;
