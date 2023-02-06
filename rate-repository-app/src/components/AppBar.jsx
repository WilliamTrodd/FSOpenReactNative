import { View, StyleSheet, Pressable , ScrollView } from "react-native";
import {Link, useNavigate} from "react-router-native";
import Constants from 'expo-constants';
import Text from "./Text";
import theme from "../theme";
import { useApolloClient, useQuery } from "@apollo/client";
import { LOGGED_IN } from "../graphql/queries";
import useAuthStorage from "../hooks/useAuthStorage";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.primary,
    flexDirection:"row",
  },
  tab: {
    paddingHorizontal: 10, 
    minHeight: 40,
    display: "flex",
    justifyContent: "center"
  }
})

const AppBarTab = ({text, dest}) => (
  <Link style={styles.tab} to={dest}>
    <Text fontWeight='bold' fontSize='subheading'>{text}</Text>
  </Link>
);

const LogOutButton = ({onPress}) => (
  <Pressable onPress={onPress} style={styles.tab}>
    <Text fontWeight='bold' fontSize = 'subheading'>Log Out</Text>
  </Pressable>
)

const AppBar = () => {
  
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const navigate = useNavigate();
  const loggedInUser = useQuery(LOGGED_IN, {fetchPolicy: 'cache-and-network' });

  const logout = async () => {
      await authStorage.removeAccessToken();
      await apolloClient.resetStore();
      navigate("/");
  }

  const signInSignOut = (loading) => {
    if(!loading){
      return (loggedInUser.data.me 
        ? <LogOutButton onPress={logout}/>
        : <AppBarTab text="Sign-In"  dest="/signin"/>)
    } else {
      return <></>
    }
  }

  return (
  <View style={styles.container}>
    <ScrollView horizontal>
      <AppBarTab text="Repositories" dest="/"/>
      {signInSignOut(loggedInUser.loading)}
      <AppBarTab text="Create a Review" dest="/createReview" />
    </ScrollView>
  </View>
  )
};

export default AppBar;