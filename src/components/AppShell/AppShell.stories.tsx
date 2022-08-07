import { ComponentStory, ComponentMeta } from "@storybook/react";
import { AppShell } from ".";

export default {
    title: "AppShell",
    component: AppShell,
    argTypes: {
        colorScheme: {
            options: ['dark', 'light'],
            control: { type: 'radio' },
        },
    },
} as ComponentMeta<typeof AppShell>;

const Template: ComponentStory<typeof AppShell> = (args) => (
    <AppShell {...args} />
)

export const Primary = Template.bind({});
Primary.args = {
    colorScheme: "dark"
}

