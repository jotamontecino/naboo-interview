import { FavoriteFragment } from "@/graphql/generated/types";
import { IconArrowBadgeUp, IconArrowBadgeDown } from '@tabler/icons-react';
import { useGlobalStyles } from "@/utils";
import { Badge, Button, Card, Grid, Group, Image, Text } from "@mantine/core";
import Link from "next/link";

interface FavoriteProps {
  favorite: FavoriteFragment;
}

export function Favorite({ favorite }: FavoriteProps) {
  const { classes } = useGlobalStyles();
  return (
    <Grid.Col span={12}>
      <Grid>
        <Grid.Col span={4}>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Card.Section>
              <Image
                src="https://dummyimage.com/480x4:3"
                height={160}
                alt="random image of city"
              />
            </Card.Section>
          </Card>
        </Grid.Col>
        <Grid.Col span={6}>
          <Group position="apart" mt="md" mb="xs">
            <Text weight={500} className={classes.ellipsis}>
              {favorite.activity.name}
            </Text>
          </Group>
          <Group mt="md" mb="xs">
            <Badge color="pink" variant="light">
              {favorite.activity.city}
            </Badge>
            <Badge color="yellow" variant="light">
              {`${favorite.activity.price}€/j`}
            </Badge>
          </Group>

          <Text size="sm" color="dimmed" className={classes.ellipsis}>
            {favorite.activity.description}
          </Text>

          <Link href={`/activities/${favorite.activity.id}`} className={classes.link}>
            <Button variant="light" color="blue" fullWidth mt="md" radius="md">
              Voir plus
            </Button>
          </Link>
        </Grid.Col>
        <Grid.Col span={2}>
          <Grid align="center">
            <Grid.Col span={12}>
              <IconArrowBadgeUp />
            </Grid.Col>
            <Grid.Col span={12}>
              <IconArrowBadgeDown />
            </Grid.Col>
        </Grid>
        </Grid.Col>
      </Grid>
    </Grid.Col>
  );
}
