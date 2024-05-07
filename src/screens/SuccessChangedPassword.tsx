import { colors } from '@constants/colors';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';

const SuccessChangedPassword = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Zmiana hasła</Text>

      <Image style={styles.icon} source={require('../assets/icons/checkbox.png')} />

      <Text style={styles.description}>
        Hasło zostało zmienione, możesz wrócić do ustawień konta.
      </Text>

      <TouchableOpacity onPress={() => navigation.navigate('Account')}>
        <Text style={styles.link}>Powrót</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: colors.greyDark2,
    justifyContent: 'center',
    alignItems: 'center',
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

  icon: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },

  description: {
    color: colors.greenBright,
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
  },

  link: {
    color: colors.greyLight2,
    fontSize: 16,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
});

export default SuccessChangedPassword;
