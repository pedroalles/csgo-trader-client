import React from "react";
import { Card, Group, Image, Stack, Text } from "@mantine/core";
import { Sticker } from "../../hooks/useAll";
import IType from "../../interfaces/IType";
import { IMonitoring } from "../../interfaces/ISticker";

interface CardProps {
  data: {
    type: IType;
    index: number;
  } & IMonitoring;
}

const valuesBuy = ["R$ 15,00", "R$ 23,00", "R$ 82,00"];

const valuesSell = ["R$ 1,00", "R$ 1,20", "R$ 0,98"];

export default function MonitoringCard({
  data: { type, index, name, buyValue, link, image },
}: CardProps) {
  // console.log(`${image.split(" ")[0]}.jpg`);

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
            {/* {items()} */}
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
