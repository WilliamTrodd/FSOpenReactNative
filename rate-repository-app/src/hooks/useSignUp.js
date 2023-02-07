import { useApolloClient, useMutation } from "@apollo/client";
import { SIGN_UP } from "../graphql/mutations";

const useSignUp = () => {
  const apolloClient = useApolloClient();
  const [createUser, result] = useMutation(SIGN_UP);

  const signUp = async({username, password}) => {
    const user = {
      username: username,
      password: password
    }
    const response = await createUser({variables: {user}});
    apolloClient.resetStore();

    return response;
  };
  return [signUp, result];
};

export default useSignUp;