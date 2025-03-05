import { Favorite, EmptyData, PageTitle } from "@/components";
import { graphqlClient } from "@/graphql/apollo";
import {
  GetFavoritesQuery,
  GetFavoritesQueryVariables
} from "@/graphql/generated/types";
import GetFavorites from "@/graphql/queries/favorite/getFavorites";
import { withAuth } from "@/hocs";
import { useAuth } from "@/hooks";
import { Button, Grid, Group } from "@mantine/core";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Link from "next/link";


interface MyFavoritesProps {
  favorites: GetFavoritesQuery["getFavorites"];
}

export const getServerSideProps: GetServerSideProps<
  MyFavoritesProps
> = async ({ req }) => {
  const response = await graphqlClient.query<
  GetFavoritesQuery,
  GetFavoritesQueryVariables
  >({
    query: GetFavorites,
    context: { headers: { Cookie: req.headers.cookie } },
  });
  return { props: { favorites: response.data.getFavorites } };
};

const MyFavorites = ({ favorites }: MyFavoritesProps) => {
  const { user } = useAuth();
  return (
    <>
      <Head>
        <title>Mes Favoris | CDTR</title>
      </Head>
      <Group position="apart">
        <PageTitle title="Mes favoris" />
      </Group>
      <Grid align="center">
        {favorites.length > 0 ? (
          favorites.map((favoriteItem) => (
            <Favorite favorite={favoriteItem} key={favoriteItem.id} />
          ))
        ) : (
          <EmptyData />
        )}
      </Grid>
    </>
  );
};

export default withAuth(MyFavorites);
