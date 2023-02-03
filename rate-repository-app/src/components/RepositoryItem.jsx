import Text from "./Text";
import {View, StyleSheet, Image} from 'react-native';
import theme from "../theme";

const styles = StyleSheet.create({
  card: {
    marginVertical:10,
  }, 
  flexCol: {
    flexDirection:'column',
    alignItems:'flex-start',
  },
  detailsRow:{
    flexDirection:'row',
    justifyContent:'flex-start',
  },
  statsRow: {
    justifyContent: 'space-around',
    flexDirection:'row',
  },
  stats: {
    flexDirection:'column',
    alignContent:'center',
  },
  flexItem: {
    flexGrow: 1,
    justifyContent: 'center',
    textAlign:'center',
    paddingVertical:3
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  languageLabel: {
    flexGrow: 0,
    textAlign:'center',
    backgroundColor: theme.colors.primary,
    padding:3,
    borderRadius: 4,
  }
});

const truncNum = (num) => {
  if(num >= 1000){
    let outNum = Math.round(num/100)/10;
    return (String(outNum)+'k');
  }
  else{
    return num;
  }
}

const RepositoryItem = props => {
  return (
    <View style={styles.card}>
      <View style={styles.detailsRow}>
        <Image style={styles.logo} source={{uri:props.item.ownerAvatarUrl}}/>
        <View style={styles.flexCol}>
          <Text style={styles.flexItem} fontWeight='bold' color="textSecondary">{props.item.fullName} </Text>
          <Text style={styles.flexItem} fontSize='fontSizeSubheading'>{props.item.description}</Text>
          <Text style={styles.languageLabel}>{props.item.language}</Text>
        </View>
      </View>
      <View style={styles.statsRow}>
        <View style={styles.stats}>
          <Text style={styles.flexItem} color="textSecondary" fontWeight='bold'>{truncNum(props.item.stargazersCount)}</Text>
          <Text style={styles.flexItem}>Stars</Text>
        </View>
        <View style={styles.stats}>
          <Text style={styles.flexItem} color="textSecondary" fontWeight='bold'>{truncNum(props.item.forksCount)}</Text>
          <Text style={styles.flexItem}>Forks</Text>
        </View>
        <View style={styles.stats}>
          <Text style={styles.flexItem} color="textSecondary" fontWeight='bold'>{truncNum(props.item.reviewCount)}</Text>
          <Text style={styles.flexItem}>Reviews</Text>
        </View>
        <View style={styles.stats}>
          <Text style={styles.flexItem} color="textSecondary" fontWeight='bold'>{truncNum(props.item.ratingAverage)}</Text>
          <Text style={styles.flexItem}>Rating</Text>
        </View>
      </View>
    </View>
  )
};

export default RepositoryItem;