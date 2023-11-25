import { colors } from '@constants/colors';
import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface Props {
  title: string;
  value: string;
  onPress?: () => void;
}

export const InfoCard = ({ title, value, onPress }: Props) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.cardContainer}>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={['#101010', '#262626']}
        style={styles.gradientBackground}
      >
        <Text style={styles.titleText}>{title}</Text>
        <Text style={styles.valueText}>{value}</Text>

        <Image style={styles.arrowIcon} source={require('../../assets/icons/arrow.png')} />
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: '47%',
    height: 125,
    borderRadius: 10,
  },

  gradientBackground: {
    borderRadius: 10,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },

  titleText: {
    color: colors.white,
    fontSize: 16,
    fontFamily: 'Jost-Medium',
  },

  valueText: {
    color: colors.white,
    fontSize: 32,
    fontFamily: 'Jost-Bold',
  },

  arrowIcon: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    width: 12,
    height: 15,
    objectFit: 'contain',
  },
});
