import {gql} from '@apollo/client';

export const SIGN_IN = gql`
mutation SignIn($credentials: AuthenticateInput) {
  authenticate (credentials: $credentials) {
    accessToken
  }
}
`;

export const SIGN_UP = gql`
mutation CreateUser ($user: CreateUserInput) {
  createUser (user: $user) {
    username
  }
}
`;

export const ADD_REVIEW = gql`
mutation AddReview($review: CreateReviewInput) {
  createReview(review: $review) {
    id
    createdAt
    rating
    repository {
      ownerName
      ratingAverage
      fullName
      id
    }
    text
  }
}
`;
