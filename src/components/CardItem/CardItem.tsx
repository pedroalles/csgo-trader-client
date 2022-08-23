import { Stack, Text } from "@mantine/core";
import React from "react";

interface CardItemProps {
  data: {
    label: string;
    value: string;
  };
}

export default function CardItem({ data: { label, value } }: CardItemProps) {
  return (
    <Stack
      // align="center"
      mt="xs"
      spacing={1}
      style={{
        // backgroundColor: "red",
        width: "80px",
      }}
    >
      <Text
        style={{
          fontWeight: 700,
          fontSize: 14,
          lineHeight: 1,
        }}
      >
        {value}
      </Text>

      <Text size="xs" color="dimmed">
        {label}
      </Text>
    </Stack>
  );
}
