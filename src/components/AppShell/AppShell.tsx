import React, { ReactNode } from "react";
import {
  AppShell as AppShellMantine,
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from "@mantine/core";
import { useHotkeys, useLocalStorage } from "@mantine/hooks";
import { Header } from "../Header";

type AppShellProps = {
  children: ReactNode;
};

export const AppShell = ({ children }: AppShellProps) => {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "mantine-color-scheme",
    defaultValue: "light",
    getInitialValueInEffect: true,
  });

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  useHotkeys([["mod+J", () => toggleColorScheme()]]);

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        theme={{
          colorScheme,
          black: "#46514F",
        }}
        withGlobalStyles
        withNormalizeCSS
      >
        <AppShellMantine
          header={
            <Header
              title=""
              links={[
                {
                  link: "/",
                  label: "Home",
                },
                // {
                //   link: "/about",
                //   label: "About",
                // },
              ]}
            />
          }
        >
          {children}
        </AppShellMantine>
      </MantineProvider>
    </ColorSchemeProvider>
  );
};
