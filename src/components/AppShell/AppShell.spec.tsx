import { render } from '@testing-library/react';
import { AppShell } from '.';

describe("AppShell", () => {
    it("renders", () => {
        const { queryAllByText } = render(
            <AppShell
                colorScheme='dark'
                toggleColorScheme={() => { }}
            />);
        expect(queryAllByText('Olá')).toHaveLength(1);
    })
})