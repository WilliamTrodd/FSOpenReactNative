import { useQuery } from '@apollo/client';
import {useParams} from 'react-router-native';
import { GET_SINGLE_REPO } from "../graphql/queries";
const useRepository = (variables) => {

  const {id} = useParams();

  const queryVars = {...variables, repositoryId: id}

  const {data, loading, fetchMore, ...result} = useQuery(GET_SINGLE_REPO, {
    fetchPolicy: 'cache-and-network', 
    variables: queryVars});
    
  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repository.reviews.hasNextPage;

    if (!canFetchMore){
      return;
    }
    fetchMore({
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,
        ...variables,
      },
    });
  };
  
  const repository = data?.repository;

 return { repository, fetchMore: handleFetchMore, loading, ...result };
};

export default useRepository;