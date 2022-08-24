import React, { Fragment } from "react";

import {
  Container,
  Divider,
  Group,
  Loader,
  SimpleGrid,
  Skeleton,
  Stack,
  Title,
  useMantineTheme,
} from "@mantine/core";

import useAll, { Sticker } from "../hooks/useAll";
import Grid from "../components/Grid/Grid";
import IType from "../interfaces/IType";
import { IMonitoring, IOrder, ISale } from "../interfaces/ISticker";

interface StickerStackProps {
  type: IType;
  data: (ISale | IOrder | IMonitoring)[];
}

export default function Home() {
  const theme = useMantineTheme();
  const { all, error } = useAll();

  // if (!!both === true)
  if (!all)
    return (
      <Container
        fluid
        p={0}
        m={0}
        style={{
          height: "calc(100vh - 92px)",
          // backgroundColor: "red",
        }}
      >
        <Stack spacing="xs">
          <Title order={4}>Sales</Title>
          <SimpleGrid
            mb="md"
            cols={2}
            breakpoints={[
              { maxWidth: 980, cols: 2, spacing: "sm" },
              { maxWidth: 755, cols: 1, spacing: "sm" },
              // { maxWidth: 600, cols: 1, spacing: "sm" },
            ]}
          >
            {[...Array(4)].map((el, index) => (
              <Skeleton key={index} visible={true} height={129} radius="sm" />
            ))}
          </SimpleGrid>
        </Stack>

        <Divider my="xs" variant="solid" />

        <Stack spacing="xs">
          <Title order={4}>Orders</Title>
          <SimpleGrid
            mb="md"
            cols={2}
            breakpoints={[
              { maxWidth: 980, cols: 2, spacing: "sm" },
              { maxWidth: 755, cols: 1, spacing: "sm" },
              // { maxWidth: 600, cols: 1, spacing: "sm" },
            ]}
          >
            {[...Array(4)].map((el, index) => (
              <Skeleton key={index} visible={true} height={129} radius="sm" />
            ))}
          </SimpleGrid>
        </Stack>

        <Divider my="xs" variant="solid" />

        <Stack spacing="xs">
          <Title order={4}>Monitoring</Title>
          <SimpleGrid
            mb="md"
            cols={2}
            breakpoints={[
              { maxWidth: 980, cols: 2, spacing: "sm" },
              { maxWidth: 755, cols: 1, spacing: "sm" },
              // { maxWidth: 600, cols: 1, spacing: "sm" },
            ]}
          >
            {[...Array(4)].map((el, index) => (
              <Skeleton key={index} visible={true} height={110} radius="sm" />
            ))}
          </SimpleGrid>
        </Stack>
      </Container>
    );

  const data: StickerStackProps[] = [
    {
      type: "Sales",
      data: all!.sales,
    },
    {
      type: "Orders",
      data: all!.orders,
    },
    {
      type: "Monitoring",
      data: all!.monitoring,
    },
  ];

  return (
    <Container
      fluid
      p={0}
      m={0}
      style={{
        height: "calc(100vh - 92px)",
        // backgroundColor: "red",
      }}
    >
      {data.map(({ type, data }, index) => (
        <Fragment key={type}>
          <Stack key={type} spacing="xs">
            <Title order={4}>{type}</Title>

            <Grid
              data={{
                type,
                stickers: data,
              }}
            />
          </Stack>

          {index < data.length - 1 && <Divider my="xs" variant="solid" />}
        </Fragment>
      ))}
    </Container>
  );
}
