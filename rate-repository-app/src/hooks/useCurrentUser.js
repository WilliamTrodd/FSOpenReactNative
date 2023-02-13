import { useQuery } from "@apollo/client";
import { LOGGED_IN } from "../graphql/queries";

const useCurrentUser = (variables) => {
  const {data, loading, fetchMore } = useQuery(LOGGED_IN, {
    fetchPolicy: 'cache-and-network',
    variables: variables
  });

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.me.reviews.pageInfo.hasNextPage;
    console.log(canFetchMore)
    if(!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.me.reviews.pageInfo.endCursor,
        ...variables
      },
    });
  };


  return {data, fetchMore:handleFetchMore, loading };
};

export default useCurrentUser;