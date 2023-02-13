import Text from "./Text";
import { View, StyleSheet, FlatList, Pressable, Alert } from 'react-native';
import theme from "../theme";
import useCurrentUser from '../hooks/useCurrentUser';
import { useNavigate } from "react-router-native";
import useDeleteReview from "../hooks/useDeleteReview";


const styles = StyleSheet.create({
  card: {
    marginVertical:10,
  }, 
  flexRow: {
    flexDirection:'row',
    alignItems:'flex-start'
  },
  buttonRow: {
    flexDirection: 'row',
    alignContent: 'space-between'

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
    alignItems:'center',
    textAlign:'center',
    textAlignVertical: 'center',
    minWidth: 50,
    minHeight: 50,
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
      display: 'flex',
      backgroundColor: theme.colors.button,
      alignItems: 'center',
      padding: 10,
      borderRadius: 4,
      borderWidth: 1,
      borderColor: theme.colors.tertiary,
      color: theme.colors.textPrimary,

    }
});


const ReviewItem = ({review, isUserList}) => {
  const navigate = useNavigate();
  const [deleteReview] = useDeleteReview();

  const parseDate = (date) => {
    let objectDate = new Date(date);
    let day = objectDate.getDate()
    let month = objectDate.getMonth();
    let year = objectDate.getFullYear();

    const format = `${day}.${month}.${year}`
    
    return (format);
  }

  const handleDelete = (id) => {
    Alert.alert('Delete review', 'Are you sure you want to delte this review?', [
      { 
        text: 'Cancel',
        onPress: console.log('Pressed Cancel'),
        style: 'cancel',
      },
      {
        text: 'Delete',
        onPress: async () => await deleteReview(id),
      },
    ])
  }
  
  return(
    <View testId="reviewItem" style={styles.card}>
      <View style={styles.flexRow}>
        <Text fontWeight='bold' style={styles.rating}>{review.rating}</Text>
        <View style={styles.flexCol}>
          <Text fontWeight='bold' fontSize='heading' style={styles.flexItem}>{review.repository? review.repository.fullName : review.user.username}</Text>
          <Text fontWeight='light' style={styles.flexItem}>{parseDate(review.createdAt)}</Text>
          <Text style={styles.flexItem}>{review.text}</Text>
          {isUserList 
            ? <View style={styles.buttonRow}>
                <Pressable style={styles.button} onPress={() => navigate(`/${review.repository.id}`)}>
                  <Text>Visit Repo</Text>
                </Pressable>
                <Pressable style={styles.button} onPress={() => handleDelete(review.id)}>
                  <Text>Delete Review</Text>
                </Pressable>
              </View> 
            : <></>}
        </View>
      </View>
    </View>
  )
};


const ReviewListContainer = (props) => {

  return(
    <FlatList
      data={props.reviews}
      renderItem={({ item }) => <ReviewItem isUserList={props.isUserList} review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => props.headerItem}
      onEndReached={props.onEndReach}
      onEndReachedThreshold={0.5}
    />
  );
};

const ReviewList = (props) => {

  if (!props.reviews){
    const {data, fetchMore} = useCurrentUser({includeReviews: true, first: 10});
    const reviewNodes = data ? data.me.reviews.edges.map((edge) => edge.node) : [];
    

    return(<ReviewListContainer reviews={reviewNodes} isUserList={true} onEndReach={()=> fetchMore()}/>)
  }

  return(<ReviewListContainer onEndReach={()=> props.fetchMore()} reviews={props.reviews} headerItem={props.headerItem}/>)
};

export default ReviewList;