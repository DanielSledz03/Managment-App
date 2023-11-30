import { colors } from '@constants/colors';
import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const TextArea = ({ ...rest }) => {
  return (
    <View style={styles.container}>
      <TextInput
        autoCapitalize='none'
        style={styles.textInput}
        placeholderTextColor={colors.greyMedium2}
        multiline
        placeholder='Aktualnie brak czasu, zajmuję się sprzątaniem alejki, jest dużo
        towaru do wyłożenia na półki...'
        numberOfLines={5}
        {...rest}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: 10,
    width: '100%',
  },
  textInput: {
    width: '100%',
    fontSize: 12,
    color: colors.greyDark8,
    fontFamily: 'Jost',
    textAlignVertical: 'top',
    padding: 10,
  },
});

export default TextArea;
