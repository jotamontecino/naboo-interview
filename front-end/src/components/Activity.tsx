import { ActivityFragment } from "@/graphql/generated/types";
import { useAuth } from "@/hooks";
import { useGlobalStyles } from "@/utils";
import { Badge, Button, Card, Grid, Group, Image, Text } from "@mantine/core";
import { IconHeart, IconHeartFilled } from '@tabler/icons-react';
import { ActionIcon } from '@mantine/core';
import { useMutation } from "@apollo/client";
import CreateActivity from "@/graphql/mutations/activity/createActivity";
import {
  CreateFavoriteInput,
  CreateFavoriteMutation,
  CreateFavoriteMutationVariables,
} from "@/graphql/generated/types";

import Link from "next/link";

interface ActivityProps {
  activity: ActivityFragment;
}

export function Activity({ activity }: ActivityProps) {
  const { user } = useAuth();
  const { classes } = useGlobalStyles();

  const [createFavorite] = useMutation<
  CreateFavoriteMutation,
  CreateFavoriteMutationVariables
>(CreateActivity);

  const onToggleFavorite = async () => {
    let createFavoriteInput = {
      activity: activity.id,
      weight: 0,
    }
    let res = await createFavorite({
      variables: {
        createFavoriteInput
      }
    })
  }

  return (
    <Grid.Col span={4}>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Card.Section>
          <Image
            src="https://dummyimage.com/480x4:3"
            height={160}
            alt="random image of city"
          />
          {user && (
            <ActionIcon variant="filled"  color="teal" aria-label="Settings" style={{position: 'absolute', top: '0px', right: '0px'}} >
              <IconHeart className="ddFavorite" style={{ width: '70%', height: '70%' }} stroke={1.5} onClick={onToggleFavorite} />
            </ActionIcon>
          )}
        </Card.Section>

        <Group position="apart" mt="md" mb="xs">
          <Text weight={500} className={classes.ellipsis}>
            {activity.name}
          </Text>
        </Group>

        <Group mt="md" mb="xs">
          <Badge color="pink" variant="light">
            {activity.city}
          </Badge>
          <Badge color="yellow" variant="light">
            {`${activity.price}€/j`}
          </Badge>
        </Group>

        <Text size="sm" color="dimmed" className={classes.ellipsis}>
          {activity.description}
        </Text>

        <Link href={`/activities/${activity.id}`} className={classes.link}>
          <Button variant="light" color="blue" fullWidth mt="md" radius="md">
            Voir plus
          </Button>
        </Link>

      </Card>
    </Grid.Col>
  );
}
