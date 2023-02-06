import { View, StyleSheet, FlatList } from 'react-native';
import RepositoryItem from "./RepositoryItem";
import useRepository from "../hooks/useRepository";
import theme from '../theme';
import Text from './Text'


const styles = StyleSheet.create({
  card: {
    marginVertical:10,
  }, 
  flexRow: {
    flexDirection:'row',
    alignItems:'flex-start'
  },
  flexCol: {
    flexDirection:'column',
    alignItems:'flex-start',
  },
  flexItem: {
    flexGrow: 1,
    justifyContent: 'center',
    textAlign:'left',
    paddingVertical:3
  },
  rating: {
    display: 'flex',
    justifyContent:'center',
    alignContent:'center',
    textAlign:'center',
    textAlignVertical: 'center',
    width: 50,
    height: 50,
    borderRadius: 25,
    borderColor: theme.colors.textPrimary,
    borderWidth: 2,
    marginHorizontal: 10,
  },
  languageLabel: {
    flexGrow: 0,
    textAlign:'center',
    backgroundColor: theme.colors.primary,
    padding:3,
    borderRadius: 4,
  },
    button: {
      backgroundColor: theme.colors.button,
      alignItems: 'center',
      margin: 5,
      paddingVertical: 10,
      borderRadius: 2,
      borderWidth: 2,
      borderColor: theme.colors.tertiary,
      color: theme.colors.textPrimary
    }
});


const RepositoryInfo = ({repo}) => {
  return <RepositoryItem item={repo.repository} singleView={true}/>
};

const ReviewItem = ({review}) => {

  const parseDate = (date) => {
    let objectDate = new Date(date);
    let day = objectDate.getDate()
    let month = objectDate.getMonth();
    let year = objectDate.getFullYear();

    const format = `${day}.${month}.${year}`
    
    return (format);
  }
  
  return(
    <View testId="reviewItem" style={styles.card}>
      <View style={styles.flexRow}>
        <Text fontWeight='bold' style={styles.rating}>{review.rating}</Text>
        <View style={styles.flexCol}>
          <Text fontWeight='bold' fontSize='heading' style={styles.flexItem}>{review.user.username}</Text>
          <Text fontWeight='light' style={styles.flexItem}>{parseDate(review.createdAt)}</Text>
          <Text style={styles.flexItem}>{review.text}</Text>
        </View>
      </View>
    </View>
  )
};


const RepositoryView = () => {

  const {repo, loading} = useRepository();

  if(loading) {
    return <Text>LOADING</Text>;
  }

  const reviews = repo.repository
    ? repo.repository.reviews.edges.map(edge => edge.node)
    : []

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <RepositoryInfo repo={repo}/>}
    />
  );
};

export default RepositoryView;