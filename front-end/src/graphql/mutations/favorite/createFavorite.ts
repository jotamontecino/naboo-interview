import gql from "graphql-tag";

const CreateFavorite = gql`
  mutation CreateFavorite($createFavoriteInput: CreateFavoriteInput!) {
    createFavorite(createFavoriteInput: $createFavoriteInput) {
      id
      activity {
        id
        name
      }
      weight
    }
  }
`;

export default CreateFavorite;
