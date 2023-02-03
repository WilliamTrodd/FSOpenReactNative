import { NativeRouter } from 'react-router-native';
import { ApolloProvider } from "@apollo/client";
import { StatusBar } from "expo-status-bar";
//import Constants from 'expo-constants';

import Main from './src/components/Main';
import createApolloClient from "./src/utils/apolloClient";
import AuthStorage from "./src/utils/authStorage";

const apolloClient = createApolloClient();

const App = () => {
  return(
    <>
    <NativeRouter>
      <ApolloProvider client={apolloClient}>
        <Main />
      </ApolloProvider>
    </NativeRouter>
    <StatusBar style="auto"/>
    </>
    );
};

export default App;