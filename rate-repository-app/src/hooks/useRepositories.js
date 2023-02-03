import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from "../graphql/queries";
const useRepositories = () => {
  const allRepos = useQuery(GET_REPOSITORIES, {fetchPolicy: 'cache-and-network'});

  const repositories = allRepos.loading ? undefined : allRepos.data.repositories;
  const loading = allRepos.loading;

  return {repositories, loading };
};


export default useRepositories;