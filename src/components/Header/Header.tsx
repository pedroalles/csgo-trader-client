import { useState } from 'react';
import { createStyles, Header as HeaderMantine, Container, Group, Burger, Text, Anchor } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Link, Navigate } from 'react-router-dom';

const useStyles = createStyles((theme) => ({
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '100%',
    },

    links: {
        [theme.fn.smallerThan('xs')]: {
            display: 'none',
        },
    },

    burger: {
        [theme.fn.largerThan('xs')]: {
            display: 'none',
        },
    },

    link: {
        display: 'block',
        lineHeight: 1,
        padding: '8px 12px',
        borderRadius: theme.radius.sm,
        textDecoration: 'none',
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
        fontSize: theme.fontSizes.sm,
        fontWeight: 500,

        '&:hover': {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        },
    },

    linkActive: {
        '&, &:hover': {
            backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
            color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
        },
    },
}));

export interface HeaderProps {
    title: string;
    links: { link: string; label: string }[];
}

export function Header({ title, links }: HeaderProps) {
    const [opened, { toggle }] = useDisclosure(false);
    const [active, setActive] = useState(links[0].link);
    const { classes, cx } = useStyles();

    const items = links.map((link) => (
        <Link
            key={link.label}
            className={cx(classes.link, { [classes.linkActive]: active === link.link })}
            onClick={() => setActive(link.link)}
            to={link.link}
        >
            {link.label}
        </Link>
    ));

    return (
        <HeaderMantine height={60}>
            <Container className={classes.header} fluid>
                <Text weight={700} size="lg">
                    {title}
                </Text>
                <Group spacing={5} className={classes.links}>
                    {items}
                </Group>
                <Burger opened={opened} onClick={toggle} className={classes.burger} size="sm" />
            </Container>
        </HeaderMantine>
    );
}