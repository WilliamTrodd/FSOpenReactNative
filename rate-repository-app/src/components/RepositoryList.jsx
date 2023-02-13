import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import RepositoryItem from "./RepositoryItem";
import useRepositories from "../hooks/useRepositories";
import theme from '../theme';
import { useNavigate } from "react-router-native";
import React, {useState} from 'react';
import {Picker} from '@react-native-picker/picker';
import {Searchbar} from 'react-native-paper';
import {useDebounce} from 'use-debounce';

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

const RepoSearch = ({searchQuery, setSearchQuery}) => {
  const onChangeSearch = query => setSearchQuery(query);

  return(
    <Searchbar 
      placeholder="Search"
      onChangeText={onChangeSearch}
      value={searchQuery}
    />
  );
};

export class RepositoryListContainer extends React.Component {

  renderHeader = () => {
    const props = this.props;
    return (
      <>
      <RepoSearch searchQuery={props.searchQuery} setSearchQuery={props.setSearchQuery}/>
      <SortPicker sort={props.sort} setSort={props.setSort}/>
      </>
    );
  };

  render() {
  return (<FlatList
    data={this.props.repoNodes}
    ItemSeparatorComponent={ItemSeparator}
    renderItem={({item}) => (
      <Pressable onPress={() => this.props.navigate(`/${item.id}`)}>
        <RepositoryItem item={item}/>
      </Pressable>
    )}
    keyExtractor={item => item.id}
    ListHeaderComponent={this.renderHeader}
    onEndReached={this.props.onEndReach}
    onEndReachedThreshold={0.5}
  />)
}
}

const RepositoryList = () => {
  const [sort, setSort] = useState('latest');
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedText] = useDebounce(searchQuery, 500);
  const navigate = useNavigate();

  let order, criteria;

  switch(sort){
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


  const {repositories, fetchMore} = useRepositories({
                                                  orderBy: criteria, 
                                                  orderDirection: order,
                                                  searchKeyword: debouncedText,
                                                  first: 8,
                                                });

  const onEndReach = () => {
    fetchMore();
  };
  
  const repoNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : []
    
  return <RepositoryListContainer sort={sort} 
                                  setSort={setSort}
                                  searchQuery={searchQuery}
                                  setSearchQuery={setSearchQuery}
                                  navigate={navigate}
                                  repoNodes={repoNodes}
                                  onEndReach={onEndReach}
          />
};

export default RepositoryList;