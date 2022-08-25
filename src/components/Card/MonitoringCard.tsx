import React, { useCallback } from "react";
import { Card, Group, Image, Stack, Text } from "@mantine/core";
import { Sticker } from "../../hooks/useAll";
import IType from "../../interfaces/IType";
import { IMonitoring, IMonitoringInfos } from "../../interfaces/ISticker";
import axios from "axios";
import useSWR from "swr";
import { SWR_STICKER_REFRESH } from "../../constants";
import CardItemNum from "../CardItemNum/CardItem";
import TableAccordion from "../Accordion/Accordion";

const axiosFetcher = (url: string, body: any = {}) =>
  axios
    .get(url, {
      params: body,
    })
    .then((r) => {
      console.log("GETING MONITORING INFO DATA", r.data);
      return r.data;
    });

interface CardProps {
  data: {
    type: IType;
    index: number;
  } & IMonitoring;
}

const valuesBuy = ["R$ 15,00", "R$ 23,00", "R$ 82,00"];

const valuesSell = ["R$ 1,00", "R$ 1,20", "R$ 0,98"];

export default function MonitoringCard({ data }: CardProps) {
  const body = {
    url: data.link,
  };
  const url = "http://192.168.0.21:3001/monitoring/info";
  const { data: monitoringInfos, error } = useSWR<{
    data: IMonitoringInfos;
    time: string;
  }>([url, body], axiosFetcher, {
    revalidateOnFocus: false,
    refreshInterval: SWR_STICKER_REFRESH,
  });
  const { type, index, name, buyValue, link, image } = data;

  // const items = useCallback(() => {
  //   const itemsData: { label: string; value: string }[] = [
  //     // { label: "Order Price", value: buyValue },
  //     // { label: " Market Price", value: marketPrice[index] },
  //   ];

  //   return itemsData.map((item: { label: string; value: string }, index) => (
  //     <CardItemNum
  //       key={`card-item-${type}-${name}-${index}-${item.label}`}
  //       data={{
  //         label: item.label,
  //         value: item.value,
  //       }}
  //     />
  //   ));
  // }, [data]);

  const monitoringInfosItems = useCallback(() => {
    if (!monitoringInfos?.data) return;

    const itemsData: { label: string; value: string }[] = [
      { label: "Sale Qtty", value: monitoringInfos?.data.saleQuantity! },
      {
        label: "Sale 1º Price",
        value: monitoringInfos?.data.saleStartingValue!,
      },
      { label: "Order Qtty", value: monitoringInfos?.data.orderQuantity! },
      {
        label: "Order 1º Price",
        value: monitoringInfos?.data.orderStartingValue!,
      },
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
  }, [monitoringInfos]);

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
            {monitoringInfos?.time && (
              <Stack spacing={1}>
                <Text
                  style={{
                    fontWeight: 500,
                    fontSize: 10,
                    lineHeight: 1,
                  }}
                >
                  {monitoringInfos?.time}
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
            {/* {items()} */}
            {monitoringInfosItems?.()}
          </Group>

          {monitoringInfos?.data && (
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
                data={{
                  title: "Sale Table",
                  table: monitoringInfos?.data.saleTable!,
                }}
              />
              <TableAccordion
                data={{
                  title: "Order Table",
                  table: monitoringInfos?.data.orderTable!,
                }}
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
