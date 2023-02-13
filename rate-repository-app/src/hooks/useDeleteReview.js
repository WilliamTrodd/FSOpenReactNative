import { useApolloClient, useMutation } from "@apollo/client";
import { DELETE_REVIEW } from "../graphql/mutations";

const useDeleteReview = () => {
  const apolloClient = useApolloClient();
  const [delReview, result] = useMutation(DELETE_REVIEW);
  const deleteReview = async(deleteReviewId) => {
    const response = await delReview({variables: {deleteReviewId: deleteReviewId}});
    apolloClient.resetStore();

    return response;
  };
  return [deleteReview, result];

};

export default useDeleteReview;