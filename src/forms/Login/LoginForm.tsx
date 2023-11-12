import SimpleButton from '@/components/Button/SimpleButton/SimpleButton';
import Input from '@/components/Input/Input';
import colors from '@/constants/colors';
import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

const LoginForm = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Logowanie</Text>
      <Text style={styles.description}>
        Zaloguj się na swoje konto, aby w pełni korzystać z możliwości aplikacji.
      </Text>

      <Input placeholder='Login' />
      <Input placeholder='Hasło' icon />

      <SimpleButton title='Zaloguj się' onPress={() => {}} />

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
