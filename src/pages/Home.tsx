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

import useAll from "../hooks/useAll";
import Grid from "../components/Grid/Grid";
import IType from "../interfaces/IType";
import { IMonitoring, IOrder, ISale } from "../interfaces/ISticker";
import { set } from "../redux/features/items/itemsSlice";
import { itemsApi } from "../redux/store";
import { skipToken } from "@reduxjs/toolkit/dist/query";

interface StickerStackProps {
  type: IType;
  data: (ISale | IOrder | IMonitoring)[];
}

export default function Home() {
  const theme = useMantineTheme();

  // const { all, error } = useAll({ actionsToPersist: [set] });

  const { data } = itemsApi.useGetAllQuery(undefined, {
    pollingInterval: 60_000,
    refetchOnMountOrArgChange: true,
  });

  // if (!!both === true)
  if (!data)
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

  const itemsData: StickerStackProps[] = [
    {
      type: "Sales",
      data: data.data.sales,
    },
    {
      type: "Orders",
      data: data.data.orders,
    },
    {
      type: "Monitoring",
      data: data.data.monitoring,
    },
  ];

  // console.log("all", data.data);
  // console.log("data", itemsData);

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
      {itemsData.map(({ type, data }, index) => (
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

          {index < 2 && <Divider my="xs" variant="solid" />}
        </Fragment>
      ))}
    </Container>
  );
}
