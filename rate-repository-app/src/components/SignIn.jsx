import FormikTextInput from "./FormikTextInput";
import {Pressable, View, StyleSheet} from 'react-native';
import Text from "./Text";
import { Formik } from "formik";
import theme from "../theme";
import * as yup from 'yup';

const styles = StyleSheet.create({
  signInButton: {
    backgroundColor: theme.colors.button,
    alignItems: 'center',
    margin: 5,
    paddingVertical: 10,
    borderRadius: 2,
    borderWidth: 2,
    borderColor: theme.colors.tertiary,
    color: theme.colors.textPrimary
  }
})

const initialValues = {
  username: '',
  password: '',
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required'),
  password: yup
    .string()
    .required('Password is required')
  })

const SignIn = ({onSubmit}) => (
  <View>
    <FormikTextInput name="username" placeholder="Username"/>
    <FormikTextInput name="password" placeholder="Password" secureTextEntry/>
    <Pressable style={styles.signInButton} onPress={onSubmit}>
      <Text >Click Here</Text>
    </Pressable>
  </View>

);

const SignInForm = () => (
  <Formik initialValues={initialValues} 
          onSubmit={(values) => {console.log(values)}}
          validationSchema={validationSchema}
  >
    {({ handleSubmit }) => (
      <SignIn onSubmit={handleSubmit}/>
      )}
  </Formik>

);

export default SignInForm;