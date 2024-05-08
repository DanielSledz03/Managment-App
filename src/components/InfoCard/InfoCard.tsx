import { colors } from '@constants/colors';
import { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TextStyle, TouchableOpacity, ViewStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface Props {
  title: string;
  value: string | (() => Promise<string>);
  onPress?: () => void;
  styleForValue?: TextStyle;
  style?: ViewStyle;
}

export const InfoCard = ({ title, value, onPress, style, styleForValue }: Props) => {
  const [resolvedValue, setResolvedValue] = useState('');

  useEffect(() => {
    if (typeof value === 'function') {
      value().then(setResolvedValue);
    } else {
      setResolvedValue(value);
    }
  }, [value]);

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.cardContainer, style]}
      activeOpacity={onPress ? 0.06 : 1}
    >
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={['#101010', '#262626']}
        style={styles.gradientBackground}
      >
        <Text style={styles.titleText}>{title}</Text>
        <Text style={[styles.valueText, styleForValue]}>{resolvedValue}</Text>

        {onPress && (
          <Image style={styles.arrowIcon} source={require('../../assets/icons/arrow.png')} />
        )}
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
    fontSize: 15,
    fontFamily: 'Jost-Medium',
    marginBottom: 10,
    textAlign: 'center',
  },

  valueText: {
    color: colors.white,
    fontSize: 32,
    fontFamily: 'Jost',
    fontWeight: 'bold',
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
