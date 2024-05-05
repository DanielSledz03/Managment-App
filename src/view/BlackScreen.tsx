import { ActivityIndicator, StyleSheet, View } from 'react-native';

const BlackScreen = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size='large' color='#FFF' />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
});

export default BlackScreen;
