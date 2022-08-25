import React, { memo, useCallback } from "react";
import { Card, Group, Image, Stack, Text } from "@mantine/core";
import { Sticker } from "../../hooks/useAll";
import IType from "../../interfaces/IType";
import { IOrder, IOrderInfos } from "../../interfaces/ISticker";
import CardItem from "../CardItem/CardItem";
import useSWR from "swr";
import axios from "axios";
import { SWR_STICKER_REFRESH } from "../../constants";
import CardItemNum from "../CardItemNum/CardItem";
import TableAccordion from "../Accordion/Accordion";

const axiosFetcher = (url: string, body: any = {}) =>
  axios
    .get(url, {
      params: body,
    })
    .then((r) => {
      console.log("GETING ORDER", r.data);
      return r.data;
    });

interface CardProps {
  data: {
    type: IType;
    index: number;
  } & IOrder;
}

// const marketPrice = ["R$ 2,00", "R$ 2,20", "R$ 1,98"];

function OrderCard({ data }: CardProps) {
  const body = {
    url: data.link,
  };
  const url = "http://192.168.0.21:3001/order";
  const { data: orderInfos, error } = useSWR<{
    data: IOrderInfos;
    time: string;
  }>([url, body], axiosFetcher, {
    revalidateOnFocus: false,
    refreshInterval: SWR_STICKER_REFRESH,
  });

  const { type, index, name, buyValue, quantity, link, image } = data;

  const items = useCallback(() => {
    const itemsData: { label: string; value: string }[] = [
      { label: "Order Price", value: buyValue },
      // { label: " Market Price", value: marketPrice[index] },
    ];

    return itemsData.map((item: { label: string; value: string }, index) => (
      <CardItemNum
        key={`card-item-${type}-${name}-${index}-${item.label}`}
        data={{
          label: item.label,
          value: item.value,
        }}
      />
    ));
  }, [data]);

  const orderInfosItems = useCallback(() => {
    if (!orderInfos?.data) return;

    const itemsData: { label: string; value: string }[] = [
      { label: "Quantity", value: orderInfos?.data.quantity! },
      { label: "Starting Price", value: orderInfos?.data.startingValue! },
    ];

    return itemsData.map((item: { label: string; value: string }, index) => (
      <CardItemNum
        key={`card-item-${type}-${name}-${index}-${item.label}`}
        data={{
          label: item.label,
          value: item.value,
        }}
      />
    ));
  }, [orderInfos]);

  return (
    <Card
      key={index}
      // component="a"
      // href={link}
      // target="_blank"
      withBorder
    >
      <Group
        position="apart"
        // grow
        style={{
          // backgroundColor: "yellow",
          width: "100%",
          height: "100%",
        }}
      >
        <Stack
          style={{
            // backgroundColor: "green",
            width: "60%",
            height: "100%",
            display: "flex",
            // justifyContent: "space-between",
          }}
        >
          <Group position="apart">
            {/* Name */}
            <Stack spacing={1}>
              <Text
                component="a"
                href={link}
                target="_blank"
                style={{
                  fontWeight: 700,
                  fontSize: 16,
                  lineHeight: 1,
                }}
              >
                {name}
              </Text>

              <Text size="xs" color="dimmed">
                Item Name
              </Text>
            </Stack>

            {/* Update time */}
            {orderInfos?.time && (
              <Stack spacing={1}>
                <Text
                  style={{
                    fontWeight: 500,
                    fontSize: 10,
                    lineHeight: 1,
                  }}
                >
                  {orderInfos?.time}
                </Text>

                <Text size="xs" color="dimmed">
                  Last Update
                </Text>
              </Stack>
            )}
          </Group>

          <Group
            // spacing="xs"
            spacing={0}
            style={
              {
                // backgroundColor: "blue",
                // width: "100%",
              }
            }
          >
            {items()}
            {orderInfosItems?.()}
          </Group>

          {orderInfos?.data.table && (
            <Group
              grow
              spacing="xs"
              align="flex-start"
              position="left"
              style={
                {
                  // backgroundColor: "red",
                }
              }
            >
              <TableAccordion
                data={{ title: "Table", table: orderInfos?.data.table! }}
              />
            </Group>
          )}
        </Stack>

        <Stack
          style={{
            // backgroundColor: "blue",
            display: "flex",
            justifyContent: "center",
            // alignItems: "center",
            alignItems: "flex-end",
            height: "100%",
            width: "30%",
          }}
        >
          <Image
            src={image}
            width={100}
            // height={100}
            style={
              {
                // backgroundColor: "red",
              }
            }
          />
        </Stack>
      </Group>
    </Card>
  );
}

export default OrderCard;
