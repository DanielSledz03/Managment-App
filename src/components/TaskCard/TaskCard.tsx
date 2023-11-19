import { colors } from '@constants/colors';
import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface Props {
  taskTime: string;
  title: string;
  priority?: boolean;
}

export const TaskCard = ({ taskTime, title, priority }: Props) => {
  return (
    <TouchableOpacity style={styles.cardContainer}>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={['#101010', '#262626']}
        style={styles.gradientBackground}
      >
        <Text style={styles.timeText}>{taskTime}</Text>
        <Text style={styles.titleText}>{title}</Text>

        <Image style={styles.arrowIcon} source={require('../../assets/icons/arrow.png')} />

        {priority && <Text style={styles.priorityLabel}>Priorytet</Text>}
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: '100%',
    height: 107,
    borderRadius: 10,
    marginBottom: 15,
  },

  gradientBackground: {
    borderRadius: 10,
    width: '100%',
    height: '100%',
    alignItems: 'flex-start',
    justifyContent: 'center',
    position: 'relative',
    paddingHorizontal: 20,
  },

  timeText: {
    position: 'absolute',
    top: 10,
    left: 20,
    color: colors.greyLight1,
    fontSize: 11,
    fontFamily: 'Jost-Medium',
  },

  titleText: {
    color: colors.white,
    fontSize: 16,
    fontFamily: 'Jost-Medium',
  },

  arrowIcon: {
    position: 'absolute',
    right: 10,
    bottom: '50%',
    transform: [{ translateY: 7.5 }],
    width: 12,
    height: 15,
    objectFit: 'contain',
  },

  priorityLabel: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    color: colors.redBright,
    fontSize: 12,
    fontFamily: 'Jost-Medium',
  },
});
