import { View, StyleSheet, ScrollView } from "react-native";
import {Link} from "react-router-native";
import Constants from 'expo-constants';
import Text from "./Text";
import theme from "../theme";

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

const AppBar = () => {
  return (
  <View style={styles.container}>
    <ScrollView horizontal>
      <AppBarTab text="Repositories" dest="/"/>
      <AppBarTab text="Sign-In"  dest="/signin"/>
    </ScrollView>
  </View>
  )
};

export default AppBar;