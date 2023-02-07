import FormikTextInput from "./FormikTextInput";
import {Pressable, View, StyleSheet} from 'react-native';
import Text from "./Text";
import { Formik } from "formik";
import theme from "../theme";
import * as yup from 'yup';
import useSignIn from "../hooks/useSignIn";
import { useNavigate } from "react-router-native";

const styles = StyleSheet.create({
  button: {
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

export const SignInContainer = ({onSubmit}) => (
  <View>
    <Formik initialValues={initialValues}
    onSubmit={onSubmit}
    validationSchema={validationSchema}
    >
      {({handleSubmit}) => (
        <>
      <FormikTextInput name="username" placeholder="Username"/>
      <FormikTextInput name="password" placeholder="Password" secureTextEntry/>
      <Pressable style={styles.button} onPress={handleSubmit}>
        <Text >Click Here</Text>
      </Pressable>
      </>
      )}
    </Formik>
  </View>

);

const SignInForm = () => {
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;
    try {
      const { data } = await signIn({username, password});
      navigate('/');
    } catch (e) {
      console.log('ERROR');
      console.log(e);
    }
  };
  
  return(<SignInContainer onSubmit={onSubmit}/>)};

export default SignInForm;