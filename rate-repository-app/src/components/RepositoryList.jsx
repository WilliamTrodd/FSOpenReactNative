import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import RepositoryItem from "./RepositoryItem";
import useRepositories from "../hooks/useRepositories";
import theme from '../theme';
import Text from "./Text";
import { useNavigate } from "react-router-native";
import {useState} from 'react';
import {Picker} from '@react-native-picker/picker';

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: theme.colors.primary,
  },
  text: {
    color: theme.colors.textPrimary,
    fontSize: 24,
    fontWeight: 700
  },
  pickerText: {
    color: theme.colors.primary,
  },
  picker: {
    backgroundColor: theme.colors.textPrimary,
  }
});

const ItemSeparator = () => <View style={styles.separator} />;

const SortPicker = ({sort, setSort}) => {
  const [selectedSort, setSelectedSort] = useState(sort);
  return(
    <Picker
    style={styles.picker}
      selectedValue = {selectedSort}
      onValueChange={(itemValue, itemIndex) => {
        setSort(itemValue);
        setSelectedSort(itemValue);
      }}
    >
      <Picker.Item style={styles.pickerText} label="Latest repositories" value="latest" />
      <Picker.Item style={styles.pickerText} label="Highest rated repositories" value="highest"/>
      <Picker.Item style={styles.pickerText} label="Lowest rated repositories" value="lowest"/>
    </Picker>
  )
}

export const RepositoryListContainer = ({ repositories, sort, setSort }) => {

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
    ListHeaderComponent={() => <SortPicker sort={sort} setSort={setSort}/>}
  />)
}

const RepositoryList = () => {
  const [sort, setSort] = useState('latest');
  const {repositories, loading} = useRepositories(sort);

  if(loading){
    return <><Text>LOADING</Text></>
  }

  return <RepositoryListContainer repositories={repositories} sort={sort} setSort={setSort}/>
};

export default RepositoryList;