import { useQuery } from '@apollo/client';
import {useParams} from 'react-router-native';
import { GET_SINGLE_REPO } from "../graphql/queries";
const useRepository = () => {

  const {id} = useParams();

  const allData = useQuery(GET_SINGLE_REPO, {
    fetchPolicy: 'cache-and-network', 
    variables: {repositoryId: id}});
  
  const repo = allData.loading ? undefined : allData.data;
  const loading = allData.loading;

 return { repo, loading };
};

export default useRepository;