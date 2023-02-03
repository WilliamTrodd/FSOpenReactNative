import { FlatList, View, StyleSheet } from 'react-native';
import RepositoryItem from "./RepositoryItem";
import useRepositories from "../hooks/useRepositories";
import theme from '../theme';
import Text from "./Text";

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: theme.colors.primary,
  },
  text: {
    color: theme.colors.textPrimary,
    fontSize: 24,
    fontWeight: 700
  }
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  const {repositories, loading} = useRepositories();

  const repoNodes = repositories
  ? repositories.edges.map(edge => edge.node)
  : []

  if(loading){
    return <><Text>LOADING</Text></>
  }

  return (
    <FlatList
      data={repoNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({item}) => (
        <RepositoryItem item={item}/>)}
      keyExtractor={item => item.id}
    />
  );
};

export default RepositoryList;