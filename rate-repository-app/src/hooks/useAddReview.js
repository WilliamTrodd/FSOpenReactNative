import { useApolloClient, useMutation } from "@apollo/client";
import { ADD_REVIEW } from "../graphql/mutations";

const useAddReview = () => {
  const apolloClient = useApolloClient();
  const [addReview, result] = useMutation(ADD_REVIEW);
  const sendReview = async({ ownerName, rating, repositoryName, text }) => {
    const review = {
      ownerName: ownerName,
      rating: rating,
      repositoryName: repositoryName,
      text: text
    };
    const response = await addReview({variables: {review}});
    apolloClient.resetStore();

    return response;
  };
  return [sendReview, result];
};

export default useAddReview;