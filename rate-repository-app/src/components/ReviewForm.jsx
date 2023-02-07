import { View, Pressable, StyleSheet } from 'react-native';
import Text from "./Text";
import FormikTextInput from "./FormikTextInput";
import theme from "../theme";
import * as yup from "yup";
import { Formik } from "formik";
import useAddReview from "../hooks/useAddReview";
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
  ownerName:'',
  repoName:'',
  rating:'',
  review:''
}

const validationSchema = yup.object().shape({
  ownerName: yup
    .string()
    .required('Owner name is required.'),
  repositoryName: yup
    .string()
    .required('Repo name is required'),
  rating: yup
    .number()
    .min(0)
    .max(100)
    .required('Rating is required'),
  text: yup
    .string()
    .notRequired()
})

export const ReviewFormContainer = ({onSubmit}) => (
  <View>
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
      >
        {({handleSubmit}) => (
          <>
            <FormikTextInput name="ownerName" placeholder="Repository Owner"/>
            <FormikTextInput name="repositoryName" placeholder="Repository Name"/>
            <FormikTextInput name="rating" placeholder="0-100"/>
            <FormikTextInput name="text" placeholder="Review" multiline={true}/>
            <Pressable style={styles.button} onPress={handleSubmit}>
              <Text>Create a review</Text>
            </Pressable>
          </>
        )}
      </Formik>
  </View>
);


const ReviewForm = () => {
  const [addReview] = useAddReview();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const ownerName = values.ownerName;
    const rating = parseInt(values.rating);
    const repositoryName = values.repositoryName;
    const text = values.text ? values.text : "";
    try {
      const {data} = await addReview({ownerName, rating, repositoryName, text});
      navigate(`/${data.createReview.repository.id}`)
    } catch (e) {
      console.log('ERROR');
      console.log(e);
    }
  };

  return <ReviewFormContainer onSubmit={onSubmit}/>
}

export default ReviewForm;