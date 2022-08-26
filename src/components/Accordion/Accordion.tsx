import {
  Accordion,
  Card,
  createStyles,
  Text,
  useMantineTheme,
} from "@mantine/core";

const useStyle = createStyles((theme) => ({
  table: {
    // backgroundColor: "white",
    width: "100%",
    textAlign: "center",
    borderSpacing: "0",
  },

  headerCell: {
    width: "65px",
    paddingLeft: "5px",
  },

  row: {
    // margin: "10px",
  },

  row1: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[4] : "ghostwhite",
  },

  row2: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[5] : "whitesmoke",
  },

  dataCell: {
    paddingLeft: "5px",
  },
}));

interface TableAccordionProps {
  data: {
    title: string;
    table: { value: string; quantity: string }[];
  };
}

export default function TableAccordion({ data }: TableAccordionProps) {
  const { classes, cx, theme } = useStyle();
  return (
    <Accordion
      style={{
        width: "48%",
      }}
      styles={{
        item: {
          border: `.1px solid ${
            theme.colorScheme === "dark" ? "#ededed30" : "#ededed"
          }`,
          borderRadius: "4px",
        },

        chevron: {
          "&[data-rotate]": {
            transform: "rotate(-90deg)",
          },
        },
      }}
    >
      <Accordion.Item value="item">
        <Accordion.Control p="xs" m={0}>
          <Text pl="xs" size="sm" weight={700}>
            {data.title}
          </Text>
        </Accordion.Control>
        <Accordion.Panel>
          <table className={classes.table}>
            <thead>
              <tr>
                <th className={classes.headerCell}>
                  <Text size="sm">Price</Text>
                </th>
                <th className={classes.headerCell}>
                  <Text size="sm">Quantity</Text>
                </th>
              </tr>
            </thead>

            <tbody>
              {data.table?.map((row, index) => (
                <tr
                  key={index}
                  className={`${classes.row} ${
                    index % 2 === 0 ? classes.row1 : classes.row2
                  }`}
                >
                  <td className={classes.dataCell}>
                    <Text align="center" size="xs">
                      {" "}
                      {row.value}
                    </Text>
                  </td>
                  <td className={classes.dataCell}>
                    <Text align="center" size="xs">
                      {row.quantity}
                    </Text>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
}
