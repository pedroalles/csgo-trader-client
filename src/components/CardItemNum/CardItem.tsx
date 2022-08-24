import { Center, Stack, Text } from "@mantine/core";
import { IconArrowDown, IconArrowUp } from "@tabler/icons";
import React, { useEffect, useState } from "react";

interface CardItemProps {
  data: {
    label: string;
    value: string;
  };
}

function roundValue(value: number): string {
  const round = Math.round((value + Number.EPSILON) * 100) / 100;
  const fixed = round.toFixed(2);

  console.log(value);
  console.log(round);
  console.log(fixed);
  console.log("--");

  return fixed.replace(".", ",");
}

// roundValue(value: number): number {
//   console.log(value);

//   return +value.toFixed(2);
// }

function formatValue(value: string): number {
  if (!value) return 0;
  return Number(value.replace("R$ ", "").replace(",", "."));
}

export default function CardItemNum({ data: { label, value } }: CardItemProps) {
  const [currentValue, setCurrentValue] = useState(formatValue(value));
  const [status, setStatus] = useState<"up" | "down" | null>();

  const handleValue = (value: number) => {
    setCurrentValue((state) => {
      if (state === value) console.log("igual");
      if (state > value) setStatus("down");
      if (state < value) setStatus("up");
      return value;
    });
  };

  useEffect(() => {
    handleValue(formatValue(value!));
  }, [value]);

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
        {value}{" "}
        {status &&
          (status === "down" ? (
            <IconArrowDown
              size={14}
              color="red"
              style={{
                marginBottom: "-2px",
              }}
            />
          ) : (
            <IconArrowUp
              size={14}
              color="green"
              style={{
                marginBottom: "-2px",
              }}
            />
          ))}
      </Text>

      <Text size="xs" color="dimmed">
        {label}
      </Text>
    </Stack>
  );
}
