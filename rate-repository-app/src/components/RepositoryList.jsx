import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import RepositoryItem from "./RepositoryItem";
import useRepositories from "../hooks/useRepositories";
import theme from '../theme';
import Text from "./Text";
import { useNavigate } from "react-router-native";

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

export const RepositoryListContainer = ({ repositories }) => {

  const navigate = useNavigate();

  const repoNodes = repositories
  ? repositories.edges.map(edge => edge.node)
  : []

  return (<FlatList
    data={repoNodes}
    ItemSeparatorComponent={ItemSeparator}
    renderItem={({item}) => (
      <Pressable onPress={() => navigate(`/${item.id}`)}>
        <RepositoryItem item={item}/>
      </Pressable>
    )}
    keyExtractor={item => item.id}
  />)
}

const RepositoryList = () => {
  const {repositories, loading} = useRepositories();

  if(loading){
    return <><Text>LOADING</Text></>
  }

  return <RepositoryListContainer repositories={repositories} />
};

export default RepositoryList;