import { colors } from '@constants/colors';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const HeaderBar = () => {
  return (
    <View style={styles.headerBar}>
      <TouchableOpacity style={styles.userIcon}>
        <Image source={require('../../assets/icons/fox.jpg')} style={styles.userIconImage} />
      </TouchableOpacity>

      <TouchableOpacity>
        <Icon name={'bell'} size={36} color={colors.white} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default HeaderBar;
