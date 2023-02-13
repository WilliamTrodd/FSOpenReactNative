import RepositoryItem from "./RepositoryItem";
import useRepository from "../hooks/useRepository";
import Text from './Text'
import ReviewList from "./ReviewList";

const RepositoryView = () => {

  const {repository, loading, fetchMore} = useRepository({first: 5});

  if(loading) {
    return <Text>LOADING</Text>;
  }

  const reviews = repository
    ? repository.reviews.edges.map(edge => edge.node)
    : []

  return (
    <ReviewList reviews={reviews} fetchMore={fetchMore} headerItem={ <RepositoryItem item={repository} singleView={true}/>} />
  );
};

export default RepositoryView;