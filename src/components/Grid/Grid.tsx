import React from "react";
import { SimpleGrid } from "@mantine/core";
import { ISale, IOrder, IMonitoring } from "../../interfaces/ISticker";
import IType from "../../interfaces/IType";
import { OrderCard, SaleCard, MonitoringCard } from "../Card";

export interface GridProps {
  data: {
    type: IType;
    stickers: (ISale | IOrder | IMonitoring)[];
  };
}

function Grid({ data: { stickers, type } }: GridProps) {
  return (
    <SimpleGrid
      title={type}
      mb="md"
      cols={2}
      breakpoints={[
        { maxWidth: 980, cols: 2, spacing: "sm" },
        { maxWidth: 755, cols: 1, spacing: "sm" },
        // { maxWidth: 600, cols: 1, spacing: "sm" },
      ]}
    >
      {stickers?.map((sticker, index) => {
        if (type === "Orders") {
          return (
            <OrderCard
              key={`card-${type}-${index}`}
              data={{
                type,
                index,
                ...(sticker as IOrder),
              }}
            />
          );
        }
        if (type === "Sales") {
          return (
            <SaleCard
              key={`card-${type}-${index}`}
              data={{
                type,
                index,
                ...(sticker as ISale),
              }}
            />
          );
        }
        return (
          <MonitoringCard
            key={`card-${type}-${index}`}
            data={{
              type,
              index,
              ...sticker,
            }}
          />
        );
      })}
    </SimpleGrid>
  );
}

export default Grid;
