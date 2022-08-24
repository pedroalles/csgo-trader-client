import React, { ReactNode } from "react";
import { AppShell as AppShellMantine, createStyles } from "@mantine/core";
import { Header } from "../Header";

type AppShellProps = {
  children: ReactNode;
};

const useStyles = createStyles((theme, _params, getRef) => ({
  main: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : "ghostwhite",
  },
}));

export const AppShell = ({ children }: AppShellProps) => {
  const { classes } = useStyles();

  return (
    <AppShellMantine
      className={classes.main}
      header={
        <Header
          title=""
          links={[
            {
              link: "/",
              label: "Home",
            },
            {
              link: "/about",
              label: "About",
            },
          ]}
        />
      }
    >
      {children}
    </AppShellMantine>
  );
};
