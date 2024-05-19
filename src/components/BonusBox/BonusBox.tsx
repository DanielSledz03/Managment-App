import GradientText from '@components/GradientText/GradientText';
import { colors } from '@constants/colors';
import { StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface BonusBoxProps {
  title: string;
  amount: string;
  date: string;
}

const BonusBox = ({ title, amount, date: createdAt }: BonusBoxProps) => {
  const date = new Date(createdAt).toLocaleDateString().replace(/\//g, '.');
  return (
    <View style={styles.container}>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={['#101010', '#262626']}
        style={styles.gradientBackground}
      >
        <View style={styles.leftColumn}>
          <Text style={styles.dateText}>{date}</Text>
          <GradientText style={styles.amount}>{amount}</GradientText>
        </View>
        <View style={styles.rightColumn}>
          <Text style={styles.titleText}>{title}</Text>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 75,
    borderRadius: 10,
    marginBottom: 15,
  },

  gradientBackground: {
    borderRadius: 10,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    flexDirection: 'row',
  },

  leftColumn: {
    width: '30%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  rightColumn: {
    width: '70%',
  },

  titleText: {
    color: colors.white,
    fontSize: 16,
    fontFamily: 'Jost',
    fontWeight: 'bold',
  },

  amount: {
    color: colors.white,
    fontSize: 16,
    fontFamily: 'Jost',
    fontWeight: 'bold',
  },

  dateText: {
    color: '#BABABA',
    fontSize: 16,
    fontFamily: 'Jost',
    fontWeight: 'medium',
    marginBottom: 5,
  },
});
export default BonusBox;
