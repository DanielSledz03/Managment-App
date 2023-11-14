import GradientText from '@/components/GradientText/GradientText';
import StartWorkButton from '@/components/StartWorkButton/StartWorkButton';
import { Image, StyleSheet, Text, View } from 'react-native';
import userIcon from '../../../assets/icons/fox.jpg';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { colors } from '@constants';

const Dashboard = () => {
  const today = new Date().toLocaleDateString('pl-PL', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <View style={styles.container}>
      <View style={styles.headerBar}>
        <View style={styles.userIcon}>
          <Image source={userIcon} style={styles.userIconImage} />
        </View>

        <Icon name={'bell'} size={36} color={colors.white} />
      </View>
      <Text style={styles.date}>{today}</Text>

      <GradientText style={styles.heading}>Dzień dobry Julia!</GradientText>

      <StartWorkButton />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: colors.greyDark2,
  },

  headerBar: {
    width: '100%',
    marginBottom: 30,
    justifyContent: 'space-between',
    paddingTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },

  userIcon: {
    width: 50,
    height: 50,
    borderRadius: 100,
    backgroundColor: colors.greyMedium2,
    borderWidth: 1,
    borderColor: colors.orange,
  },

  userIconImage: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
  },

  heading: {
    fontSize: 34,
    color: colors.white,
    marginBottom: 20,
    fontFamily: 'Jost-SemiBold',
  },

  date: {
    fontSize: 16,
    color: colors.white,
    fontFamily: 'Jost-Regular',
  },
});

export default Dashboard;
