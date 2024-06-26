import SimpleButton from '@components/Button/GradientButton/GradientButton';
import { colors } from '@constants/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useCallback } from 'react';
import { Alert, KeyboardAvoidingView, StyleSheet, Text } from 'react-native';
import Config from 'react-native-config';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import Input from '@/components/Input/Input';
import { RootState } from '@/store';
import { AuthSliceActions } from '@/store/Auth/Auth.reducer';

const LoginForm = () => {
  const dispatch = useDispatch();
  const { login, password } = useSelector((state: RootState) => state.auth);

  const mutationFn = useCallback(async () => {
    return await axios
      .post(Config.HOSTNAME + '/auth/signin', {
        email: login,
        password: password,
      })
      .then(async (res: { data: { access_token: string; refresh_token: string } }) => {
        Alert.alert('Sukces', 'Zalogowano pomyślnie!');

        const accessToken = JSON.stringify(res.data.access_token);
        await AsyncStorage.setItem('access_token', accessToken);

        const refreshToken = JSON.stringify(res.data.refresh_token);
        await AsyncStorage.setItem('refresh_token', refreshToken);

        dispatch(AuthSliceActions.setAccessToken(res.data.access_token));
        dispatch(AuthSliceActions.setRefreshToken(res.data.refresh_token));
      })
      .catch((err) => {
        Alert.alert('Błąd', 'Nie udało się zalogować.');
        console.log(err);
      });
  }, [dispatch, login, password]);

  const mutation = useMutation({
    mutationFn,
  });

  const handleSubmit = () => {
    mutation.mutate();
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={50}> */}
      <Text style={styles.heading}>Logowanie</Text>
      <Text style={styles.description}>
        Zaloguj się na swoje konto, aby w pełni korzystać z możliwości aplikacji.
      </Text>

      <Input
        value={login}
        placeholder='Login'
        onChangeText={(e) => dispatch(AuthSliceActions.setLogin(e))}
        autoComplete='email'
      />
      <Input
        secureTextEntry={true}
        value={password}
        icon
        placeholder='Hasło'
        onChangeText={(e) => dispatch(AuthSliceActions.setPassword(e))}
      />

      <SimpleButton title='Zaloguj się' onPress={handleSubmit} />
      {/* </KeyboardAvoidingView> */}

      <Text style={styles.resetPassword}>Nie pamiętam hasła</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.greyDark2,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 25,
  },

  heading: {
    fontSize: 34,
    color: colors.white,
    fontFamily: 'Jost-SemiBold',
    marginBottom: 10,
    textAlign: 'center',
  },

  description: {
    fontSize: 16,
    color: colors.greyMedium2,
    fontFamily: 'Jost-Medium',
    textAlign: 'center',
    marginBottom: 25,
  },

  resetPassword: {
    fontSize: 17,
    color: colors.greyMedium2,
    fontFamily: 'Jost-Regular',
    textAlign: 'center',
    marginTop: 15,
    textDecorationLine: 'underline',
  },
});

export default LoginForm;
