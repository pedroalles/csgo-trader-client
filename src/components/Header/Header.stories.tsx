import { ComponentStory, ComponentMeta } from "@storybook/react";
import { BrowserRouter } from "react-router-dom";
import { Header } from ".";

export default {
    title: "Header",
    component: Header,
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = (args) => (
    <BrowserRouter>
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
                }
            ]}
        />
    </BrowserRouter>
)

export const Primary = Template.bind({});
Primary.args = {}
