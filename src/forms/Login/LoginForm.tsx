import SimpleButton from '@/components/Button/SimpleButton/SimpleButton';
import Input from '@/components/Input/Input';
import colors from '@/constants/colors';
import { RootState } from '@/store';
import { AuthSliceActions } from '@/store/Auth/Auth.reducer';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

const LoginForm = () => {
  const dispatch = useDispatch();
  const { login, password } = useSelector((state: RootState) => state.auth);

  const mutation = useMutation({
    mutationFn: async () => {
      return await axios
        .post('http://192.168.0.164:3000/auth/signin', {
          email: login,
          password: password,
        })
        .then((res: { data: { access_token: string } }) => {
          Alert.alert('Sukces', 'Zalogowano pomyślnie!');
          dispatch(AuthSliceActions.setAccessToken(res.data.access_token));
          console.log(res.data.access_token);
        })
        .catch((err) => {
          Alert.alert('Błąd', 'Nie udało się zalogować.');
          console.log(err);
        });
    },
  });

  const handleSubmit = () => {
    mutation.mutate();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Logowanie</Text>
      <Text style={styles.description}>
        Zaloguj się na swoje konto, aby w pełni korzystać z możliwości aplikacji.
      </Text>

      <Input
        value={login}
        placeholder='Login'
        onChangeText={(e) => dispatch(AuthSliceActions.setLogin(e))}
      />
      <Input
        secureTextEntry={true}
        value={password}
        placeholder='Hasło'
        onChangeText={(e) => dispatch(AuthSliceActions.setPassword(e))}
      />

      <SimpleButton title='Zaloguj się' onPress={handleSubmit} />

      <Text style={styles.resetPassword}>Nie pamiętam hasła</Text>
    </View>
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
