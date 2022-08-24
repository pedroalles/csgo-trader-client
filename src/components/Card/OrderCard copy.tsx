import React, { useCallback } from "react";
import { Card, Group, Image, Stack, Text } from "@mantine/core";
import { Sticker } from "../../hooks/useAll";
import IType from "../../interfaces/IType";
import { IOrder } from "../../interfaces/ISticker";
import CardItem from "../CardItem/CardItem";

interface CardProps {
  data: {
    type: IType;
    index: number;
  } & IOrder;
}

const marketPrice = ["R$ 2,00", "R$ 2,20", "R$ 1,98"];

export default function OrderCard({
  data: { type, index, name, buyValue, quantity, link, image },
}: CardProps) {
  // console.log(`${image.split(" ")[0]}.jpg`);

  const data: { label: string; value: string }[] = [
    { label: "Order Price", value: buyValue },
    { label: " Market Price", value: marketPrice[index] },
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
