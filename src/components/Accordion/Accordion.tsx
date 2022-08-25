import {
  Accordion,
  ActionIcon,
  AccordionControlProps,
  Box,
  Card,
  Text,
} from "@mantine/core";
import { IconDots } from "@tabler/icons";

function AccordionControl(props: AccordionControlProps) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Accordion.Control {...props} />
      <ActionIcon size="lg">
        <IconDots size={16} />
      </ActionIcon>
    </Box>
  );
}

interface TableAccordionProps {
  data: {
    title: string;
    table: { value: string; quantity: string }[];
  };
}

export default function TableAccordion({ data }: TableAccordionProps) {
  return (
    <Card
      withBorder
      m={0}
      p={0}
      style={
        {
          // display: "flex",
        }
      }
    >
      <Accordion
        p={0}
        m={0}
        chevronPosition="right"
        style={
          {
            // width: "200px",
            // border: "1px solid black",
            // backgroundColor: "red",
          }
        }
      >
        <Accordion.Item value="item-1">
          <Accordion.Control>
            <Text size="sm" weight={700}>
              {data.title}
            </Text>
          </Accordion.Control>
          <Accordion.Panel>
            <table
              style={{
                // backgroundColor: "white",
                width: "100%",
                textAlign: "justify",
              }}
            >
              <thead>
                <tr
                  style={
                    {
                      // display: "flex",
                      // gap: "1px",
                    }
                  }
                >
                  <th
                    style={{
                      width: "65px",
                    }}
                  >
                    <Text size="sm">Price</Text>
                  </th>
                  <th
                    style={{
                      width: "65px",
                    }}
                  >
                    <Text size="sm">Quantity</Text>
                  </th>
                </tr>
              </thead>

              <tbody>
                {data.table?.map((row, index) => (
                  <tr key={index}>
                    <td>
                      <Text size="sm"> {row.value}</Text>
                    </td>
                    <td>
                      <Text size="sm">{row.quantity}</Text>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </Card>
  );
}
