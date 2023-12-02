import { colors } from '@constants/colors';
import React, { useState } from 'react';
import { StyleSheet, TextInput, TextInputProps, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface CustomTextInputProps extends TextInputProps {
  icon?: boolean;
}

const Input: React.FC<CustomTextInputProps> = ({ icon = false, ...rest }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const onIconPress = () => {
    if (rest.secureTextEntry) setIsPasswordVisible((prev) => !prev);
  };

  return (
    <View style={styles.container}>
      <TextInput
        autoCapitalize='none'
        style={styles.textInput}
        placeholderTextColor={colors.greyMedium2}
        {...rest}
        secureTextEntry={rest.secureTextEntry ? !isPasswordVisible : false}
      />
      {icon && (
        <TouchableOpacity onPress={onIconPress} style={styles.icon}>
          <Icon
            name={icon && (!isPasswordVisible ? 'eye-off-outline' : 'eye-outline')}
            size={24}
            color={colors.white}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.greyDark2,
    borderRadius: 30,
    borderColor: colors.greyMedium2,
    borderWidth: 2,
    paddingHorizontal: 20,
    marginBottom: 20,
    width: '100%',
  },
  textInput: {
    maxWidth: '100%',
    width: '90%',
    fontSize: 17,
    paddingVertical: 15,
    color: colors.greyMedium2,
  },
  icon: {
    width: '10%',
  },
});

export default Input;
