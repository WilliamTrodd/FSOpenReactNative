import Main from './src/components/Main';
import createApolloClient from "./src/utils/apolloClient";
import Constants from 'expo-constants';
import { NativeRouter } from 'react-router-native';
import { StatusBar } from "expo-status-bar";
import { ApolloProvider } from "@apollo/client";

const apolloClient = createApolloClient();

const App = () => {
  console.log(Constants.manifest.extra);
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