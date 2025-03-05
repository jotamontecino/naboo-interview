import gql from "graphql-tag";
import OwnerFragment from "./owner";
import ActivityFragment from "./activity";

const FavoriteFragment = gql`
  fragment Favorite on Favorite {
    id
    weight
    owner {
      ...Owner
    }
    activity {
      ...Activity
    }
  }
  ${OwnerFragment}
  ${ActivityFragment}
`;


export default FavoriteFragment;
