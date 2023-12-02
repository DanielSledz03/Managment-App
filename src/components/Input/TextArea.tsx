import { colors } from '@constants/colors';
import { StyleSheet, TextInput, TextInputProps, View } from 'react-native';

type CustomTextInputProps = TextInputProps;

const TextArea = ({ ...rest }: CustomTextInputProps) => {
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
    minHeight: 150,
  },
});

export default TextArea;
