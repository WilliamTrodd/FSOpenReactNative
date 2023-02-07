import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from "../graphql/queries";
const useRepositories = (orderBy) => {
  let order, criteria;
  switch(orderBy){
    case('latest'):
      order = 'DESC';
      criteria = 'CREATED_AT';
      break;
    case('highest'):
      order = 'DESC';
      criteria = 'RATING_AVERAGE';
      break;
    case('lowest'):
      order = 'ASC'
      criteria = 'RATING_AVERAGE';
      break;
    default:
      order = 'DESC';
      criteria = 'CREATED_AT';
      break;
  }

  const allRepos = useQuery(GET_REPOSITORIES, {fetchPolicy: 'cache-and-network', variables: {orderBy: criteria, orderDirection: order}});
  const repositories = allRepos.loading ? undefined : allRepos.data.repositories;
  const loading = allRepos.loading;

  return {repositories, loading };
};


export default useRepositories;