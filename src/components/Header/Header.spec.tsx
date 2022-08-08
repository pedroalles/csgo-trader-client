import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Header } from '../Header';

describe("Header", () => {
    it("renders", () => {
        const { queryAllByText } = render(
            <BrowserRouter>
                <Header
                    title='My App'
                    links={[
                        {
                            label: 'Home',
                            link: '/'
                        }
                    ]}
                />
            </BrowserRouter>
        );
        expect(queryAllByText('Home')).toHaveLength(1);
    })
})