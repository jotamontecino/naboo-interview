import FavoriteFragment from "@/graphql/fragments/favorite";
import gql from "graphql-tag";

const GetFavorites = gql`
  query GetFavorites {
    getFavorites {
      ...Favorite
    }
  }
  ${FavoriteFragment}
`;

export default GetFavorites;
