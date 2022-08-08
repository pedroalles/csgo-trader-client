import React from 'react'
import { AppShell as AppShellMantine, ColorScheme, ColorSchemeProvider, MantineProvider } from '@mantine/core'
import { Header } from '../Header';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

type AppShellProps = {
    colorScheme: 'dark' | "light",
    toggleColorScheme: (value?: ColorScheme | undefined) => void
}

export const AppShell = ({ colorScheme, toggleColorScheme }: AppShellProps) => {

    return (
        <BrowserRouter>
            <ColorSchemeProvider
                colorScheme={colorScheme}
                toggleColorScheme={toggleColorScheme}
            >
                <MantineProvider
                    theme={{ colorScheme }}
                    withGlobalStyles
                    withNormalizeCSS
                >
                    <AppShellMantine
                        header={
                            <Header
                                title='My App'
                                links={[
                                    {
                                        link: '/',
                                        label: 'Home'
                                    },
                                    {
                                        link: '/about',
                                        label: 'About'
                                    }]}
                            />}
                    >
                        <Routes>
                            <Route path='/' element={<h1>Home</h1>} />
                            <Route path='/about' element={<h1>About</h1>} />
                        </Routes>
                    </AppShellMantine>
                </MantineProvider>
            </ColorSchemeProvider>
        </BrowserRouter>
    )
}
