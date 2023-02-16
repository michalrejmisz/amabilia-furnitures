import { createStyles, Header, Menu, Group, Center, Burger, Container, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconChevronDown } from '@tabler/icons';
import Logo from '../UI/Logo';
import { useRouter } from 'next/router'
import Link from 'next/link'


const useStyles = createStyles((theme) => ({
    header: {
        backgroundColor: theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background,
        borderBottom: 0,
        zIndex: 100,
        position: "sticky",
        transition: '0.2s',
    },

    transparent: {
        backgroundColor: "transparent",
        transition: '0.2s',
    },

    inner: {
        height: 80,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginRight: "5vw",
        marginLeft: "5vw",
    },

    links: {
        [theme.fn.smallerThan('sm')]: {
            display: 'none',
        },
    },

    burger: {
        [theme.fn.largerThan('sm')]: {
            display: 'none',
        },
    },

    link: {
        display: 'block',
        lineHeight: 1,
        // padding: '8px 12px',
        padding: '8px 25px',
        borderRadius: theme.radius.sm,
        textDecoration: 'none',
        color: theme.white,
        fontSize: "15px",
        letterSpacing: ".65px",
        fontWeight: 'bold',
        fontFamily: 'Roboto, sans-serif',
        textTransform: 'uppercase',

        // '&:hover': {
        //     backgroundColor: theme.fn.darken(
        //         theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background!,
        //         0.1
        //     ),
        // },
        '&:hover': {
            backgroundColor: theme.colors[theme.primaryColor][8],
        },

    },

    active: {
        backgroundColor: theme.colors[theme.primaryColor][8],
    },

    linkLabel: {
        marginRight: 5,
    },
}));

interface HeaderSearchProps {
    transparent: boolean;
    links: { link: string; label: string; links?: { link: string; label: string }[] }[];
}

interface HeaderTransparentProp {
    transparent: boolean;
}


export function HeaderMenuColored({ links, transparent }: HeaderSearchProps ) {
    const [opened, { toggle }] = useDisclosure(false);
    const { classes } = useStyles();
    const {pathname} = useRouter();

    if(pathname.indexOf('/products/') === 0 || pathname.indexOf('/products') === 0 ||
        pathname.indexOf('/product/') === 0 || pathname.indexOf('/product') === 0
    ){
        transparent = false;
    }



    const items = links.map((link) => {
        const menuItems = link.links?.map((item) => (
            <Menu.Item key={item.link}>{item.label}</Menu.Item>
        ));

        if (menuItems) {
            return (
                <Menu key={link.label} trigger="hover" exitTransitionDuration={0}>
                    <Menu.Target>
                        <a
                            href={link.link}
                            className={classes.link}
                            onClick={(event) => event.preventDefault()}
                        >
                            <Center>
                                <span className={classes.linkLabel}>{link.label}</span>
                                <IconChevronDown size={12} stroke={1.5} />
                            </Center>
                        </a>
                    </Menu.Target>
                    <Menu.Dropdown>{menuItems}</Menu.Dropdown>
                </Menu>
            );
        }

        return (
                // <Link href={link.link} className={classes.link}>
                //     {/*<a*/}
                //     {/*    key={link.label}*/}
                //     {/*    href={link.link}*/}
                //     {/*    className={classes.link}*/}
                //     {/*    // onClick={(event) => event.preventDefault()}*/}
                //     {/*>*/}
                //         {link.label}
                //     {/*</a>*/}
                // </Link>
                <Link href={link.link}>
                    <a className={classes.link}>{link.label}</a>
                        {/*key={link.label}*/}
                    {/*    href={link.link}*/}
                    {/*    className={classes.link}*/}
                    {/*    // onClick={(event) => event.preventDefault()}*/}
                    {/*>*/}

                    {/*</a>*/}
                </Link>
        );
    });

    return (
        // <Header height={80} className={`${classes.header}} ${transparent && classes.transparent}`}>
        <Header height={80} className={`${classes.header} ${transparent && classes.transparent}`}>
            {/*<Container size={"lg"}>*/}
                <div className={classes.inner}>
                        <Link href={"/"}>
                            <div className={classes.inner} style={{marginLeft: 0}}>
                                <Logo/>
                                <Title order={2} color="white">Amabilia</Title>
                            </div>
                        </Link>
                    <Group spacing={5} className={classes.links}>
                        {items}
                        <a
                            key={'x'}
                            href={'x'}
                            className={classes.link}
                            onClick={(event) => event.preventDefault()}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#ffffff" className="w-6 h-6" style={{width: '30px', height: '30px'}}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                            </svg>
                        </a>
                    </Group>
                    <Burger
                        opened={opened}
                        onClick={toggle}
                        className={classes.burger}
                        size="sm"
                        color="#fff"
                    />
                </div>
            {/*</Container>*/}
        </Header>
    );
}