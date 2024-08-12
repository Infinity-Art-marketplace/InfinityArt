/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUser = /* GraphQL */ `
  mutation CreateUser($account: ID!, $username: String, $image: String) {
    createUser(account: $account, username: $username, image: $image) {
      account
      username
      image
      __typename
    }
  }
`;
export const createNFT = /* GraphQL */ `
  mutation CreateNFT(
    $contract: ID!
    $image: String
    $name: String
    $collection: String
    $value: Float
  ) {
    createNFT(
      contract: $contract
      image: $image
      name: $name
      collection: $collection
      value: $value
    ) {
      contract
      image
      name
      collection
      value
      __typename
    }
  }
`;
