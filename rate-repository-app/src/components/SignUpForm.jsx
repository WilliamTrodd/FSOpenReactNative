import FormikTextInput from "./FormikTextInput";
import {Pressable, View, StyleSheet} from 'react-native';
import Text from "./Text";
import { Formik } from "formik";
import theme from "../theme";
import * as yup from 'yup';
import useSignUp from "../hooks/useSignUp";
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

const initialValues={
  username: '',
  password: '',
  confirmation: '',
};

const validationSchema= yup.object().shape({
  username: yup
    .string()
    .min(1, 'Username must be more than 1 character')
    .max(30,'Username must be 30 characters or less')
    .required('Username is required'),
  password: yup
    .string()
    .min(5, 'Password must be at least 5 characters')
    .max(50,'Password must be 50 characters or less')
    .required('Password is required'),
  confirmation: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords do not match')
    .required('Password confirmation is required')
}); 

const SignUpContainer = ({onSubmit}) => (
  <View>
    <Formik 
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
      >
        {({handleSubmit}) => (
          <>
            <FormikTextInput name="username" placeholder="Username"/>
            <FormikTextInput name="password" placeholder="Password" secureTextEntry/>
            <FormikTextInput name="confirmation" placeholder="Password confirmation" secureTextEntry/>
            <Pressable style={styles.button} onPress={handleSubmit}>
              <Text>Sign up</Text>
            </Pressable>
          </>
        )}
    </Formik>
  </View>
);

const SignUpForm = () => {
  const [signUp] = useSignUp();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const {username, password} = values;
    try {
      const { data } = await signUp({username, password});
      navigate('/');
    } catch (e) {
      console.log('ERROR');
      console.log(e);
    }
  };

  return(<SignUpContainer onSubmit={onSubmit}/>)
}

export default SignUpForm;