import { colors } from '@constants/colors';
import { Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import GradientText from '@/components/GradientText/GradientText';
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
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const [oldPasswordError, setOldPasswordError] = useState(false);

  const mutationFn = useCallback(async () => {
    return await axios
      .post(Config.HOSTNAME + '/auth/changePassword', {
        email: user.email,
        newPassword: newPassword,
        oldPassword: oldPassword,
      })
      .then(async () => {
        Alert.alert('Sukces', 'Zmieniono hasło!', [
          { text: 'OK', onPress: () => navigation.navigate('Account') },
        ]);
      })
      .catch((err) => {
        Alert.alert('Błąd', 'Nie udało się zmienić hasła.');
        console.log(err);
      });
  }, []);

  const mutation = useMutation({
    mutationFn,
  });

  const handleSubmit = () => {
    const isPasswordValid =
      newPassword.length >= 8 &&
      /[A-Z]/.test(newPassword) &&
      /[!@#$%^&*(),.?":{}|<>]/.test(newPassword);

    console.log(isPasswordValid);

    if (!isPasswordValid) {
      setPasswordMismatch(true);
      return;
    }

    if (newPassword === confirmNewPassword) {
      mutation.mutate();
    } else {
      setPasswordMismatch(true);
    }
  };

  console.log(passwordMismatch);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.wrapper}>
      <TouchableOpacity onPress={() => navigation.navigate('Account')} style={styles.backIcon}>
        <Image
          style={{ objectFit: 'contain', width: 28 }}
          source={require('../assets/icons/leftArrow.png')}
        />
      </TouchableOpacity>
      <Text style={styles.heading}>Zmiana hasła</Text>
      <Text style={[styles.errorText, !passwordMismatch ? { opacity: 0 } : null]}>
        Nowe hasło nie spełnia wymagań
      </Text>
      <Input
        value={oldPassword}
        onChangeText={(e) => setOldPassword(e)}
        placeholder='Obecne hasło'
        secureTextEntry
        icon
      />
      <Input
        icon
        placeholder='Nowe hasło'
        value={newPassword}
        onChangeText={(e) => setNewPassword(e)}
        secureTextEntry
        error={passwordMismatch && newPassword !== confirmNewPassword && newPassword === ''}
      />
      <Input
        placeholder='Potwierdź nowe hasło'
        icon
        value={confirmNewPassword}
        secureTextEntry
        onChangeText={(e) => setConfirmNewPassword(e)}
        error={passwordMismatch && newPassword !== confirmNewPassword}
      />

      <GradientButton title='Potwierdź' onPress={handleSubmit} />
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

  inputError: {
    borderColor: 'red',
    borderWidth: 1,
  },

  errorText: {
    color: colors.red,
    marginBottom: 25,
  },
});

export default ChangePassword;
