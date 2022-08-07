import React from 'react'

import { AppShell as AppShellMantine, ColorScheme, ColorSchemeProvider, MantineProvider } from '@mantine/core'
import useToggleColorScheme from '../../hooks/useToggleColorScheme';

type AppShellProps = {
    colorScheme: 'dark' | "light",
    toggleColorScheme: (value?: ColorScheme | undefined) => void
}

export const AppShell = ({ colorScheme, toggleColorScheme }: AppShellProps) => {

    return (
        <ColorSchemeProvider
            colorScheme={colorScheme}
            toggleColorScheme={toggleColorScheme}
        >
            <MantineProvider
                theme={{ colorScheme }}
                withGlobalStyles
                withNormalizeCSS
            >
                <AppShellMantine>
                    <h1>Olá</h1>
                </AppShellMantine>
            </MantineProvider>
        </ColorSchemeProvider>
    )
}
