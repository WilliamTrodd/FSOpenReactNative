import { TextInput as NativeTextInput, StyleSheet } from 'react-native';
import theme from "../theme";

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: theme.colors.input,
    margin: 5,
    padding:5,
    borderRadius: 4,
    borderColor: theme.colors.tertiary,
    borderWidth: 1,
    fontSize: theme.fontSizes.subheading,
    fontFamily: theme.fonts.main
  }
});

const TextInput = ({ style, error, ...props }) => {
  const textInputStyle = styles.textInput;
  return <NativeTextInput style={textInputStyle} {...props} />;
};

export default TextInput;