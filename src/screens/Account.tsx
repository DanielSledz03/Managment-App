import GradientButton from '@components/Button/GradientButton/GradientButton';
import { colors } from '@constants/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthSliceActions } from '@store/Auth/Auth.reducer';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import GradientText from '@/components/GradientText/GradientText';
import { RootState } from '@store/index';
import ButtonArrow from '@components/Button/ButtonArrow/ButtonArrow';
import { useState } from 'react';
import AuthorsModal from '@view/AccountModals/AuthorsModal/AuthorsModal';
import { useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '@/navigation/TabNavigation';

const Account = ({ navigation }: any) => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const [authorModalVisible, setAuthorModalVisible] = useState(false);

  return (
    <>
      {authorModalVisible && (
        <AuthorsModal
          isModalOpen={authorModalVisible}
          closeModal={() => setAuthorModalVisible(false)}
        />
      )}
      <ScrollView style={styles.container}>
        <View style={styles.innerContainer}>
          <GradientText style={styles.heading}>Konto</GradientText>
          <Text style={styles.heading}>Użytkownik: {user.name}</Text>

          <ButtonArrow
            title='Zmiana hasła'
            onPress={() => {
              navigation.navigate('ChangePassword');
            }}
          />

          <ButtonArrow title='Testowe powiadomienie' onPress={() => {}} />

          <ButtonArrow
            title='Autorzy aplikacji'
            onPress={() => {
              setAuthorModalVisible(true);
            }}
          />

          <ButtonArrow
            title='Wyloguj'
            onPress={() => {
              AsyncStorage.clear();
              dispatch(AuthSliceActions.setAccessToken(null));
              dispatch(AuthSliceActions.setRefreshToken(null));
            }}
            special
          />

          <Text style={styles.appVersionText}>Wersja aplikacji: 0.0.5</Text>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: colors.greyDark2,
    marginBottom: 90,
    paddingTop: 30,
  },

  innerContainer: {
    flex: 1,
    height: '100%',
    justifyContent: 'space-between',
  },

  heading: {
    width: '100%',
    textAlign: 'center',
    fontSize: 32,
    color: colors.white,
    marginBottom: 30,
    fontWeight: 'bold',
    fontFamily: 'Jost',
  },

  tabButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },

  appVersionText: {
    color: colors.greyLight1,
    fontSize: 12,
    fontFamily: 'Jost-Medium',
    textAlign: 'center',
    marginTop: 30,
  },
});

export default Account;
