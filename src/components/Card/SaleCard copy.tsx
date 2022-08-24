import React, { useCallback } from "react";
import { Card, Group, Image, Stack, Text } from "@mantine/core";
import IType from "../../interfaces/IType";
import { ISale } from "../../interfaces/ISticker";
import CardItem from "../CardItem/CardItem";

interface CardProps {
  data: {
    type: IType;
    index: number;
  } & ISale;
}

export default function SaleCard({
  data: {
    type,
    index,
    name,
    sellValue,
    buyValue,
    receiveValue,
    link,
    image,
    profitPercent,
    profitValue,
  },
}: CardProps) {
  // console.log(`${image.split(" ")[0]}.jpg`);

  const data: { label: string; value: string }[] = [
    { label: "Sale Price", value: sellValue },
    { label: "Buy Price", value: buyValue },
    { label: "Receive", value: receiveValue },
    { label: "Profit", value: profitValue },
    { label: "Profit %", value: profitPercent },
  ];

  const items = useCallback(
    () =>
      data.map((item: { label: string; value: string }, index) => (
        <CardItem
          key={`card-item-${type}-${name}-${index}`}
          data={{
            label: item.label,
            value: item.value,
          }}
        />
      )),
    [data]
  );

  return (
    <Card key={index} component="a" href={link} target="_blank" withBorder>
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
            justifyContent: "space-between",
          }}
        >
          {/* Name */}
          <Stack spacing={1}>
            <Text
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
          </Group>
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
