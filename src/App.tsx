import React from 'react'
import { AppShell } from './components/AppShell';
import { MantineProvider, ColorSchemeProvider } from '@mantine/core';

import useToggleColorScheme from './hooks/useToggleColorScheme';

export default function App() {

  const { colorScheme, toggleColorScheme } = useToggleColorScheme()

  return (
    <AppShell
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    />
  );
}