import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface ButtonArrowProps {
  title: string;
  onPress: any;
  containerStyle?: object;
  textStyle?: object;
  gradientStyle?: object;
  gradientColors?: string[];
  special?: boolean;
}

const ButtonArrow = ({
  title,
  onPress,
  containerStyle,
  textStyle,
  gradientStyle,
  gradientColors = ['#101010', '#262626'],
  special = false,
}: ButtonArrowProps) => {
  return (
    <TouchableOpacity style={[styles.button, containerStyle]} onPress={onPress}>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={!special ? gradientColors : ['#101010', '#F24848']}
        style={[styles.buttonGradient, gradientStyle]}
      >
        <Text style={[styles.buttonText, textStyle]}>{title}</Text>
        <Image style={styles.arrow} source={require('../../../assets/icons/arrow.png')} />
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '100%',
    marginVertical: 10,
  },
  buttonGradient: {
    width: '100%',
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },

  arrow: {
    height: 15,
    objectFit: 'contain',
  },
});

export default ButtonArrow;
