import React from "react";
import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from "@mantine/core";
import { useHotkeys, useLocalStorage } from "@mantine/hooks";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AppShell } from "./components/AppShell";
import Home from "./pages/Home";

export default function App() {
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
        <BrowserRouter>
          <AppShell>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<h1>About</h1>} />
            </Routes>
          </AppShell>
        </BrowserRouter>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}
