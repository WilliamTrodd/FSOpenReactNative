import {useApolloClient, useMutation} from '@apollo/client';
import { SIGN_IN } from "../graphql/mutations";
import useAuthStorage from "./useAuthStorage";

const useSignIn = () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const [authenticate, result] = useMutation(SIGN_IN)

  const signIn = async({ username, password }) => {
    console.log('')
    const credentials = {
      username: username,
      password: password
    }
    const response = await authenticate({variables: {credentials}});
    await authStorage.setAccessToken(response.data.authenticate.accessToken);
    apolloClient.resetStore();

    return response;

  };
  return [signIn, result]
};

export default useSignIn;
