import {
    createStyles,
    Header,
    Menu,
    Group,
    Center,
    Title,
    UnstyledButton,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconChevronDown } from '@tabler/icons'
import Logo from '../UI/Logo'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useShoppingCart } from '@/context/ShoppingCartContext'
import { Theme } from '@mantine/core/src/theme/types'
import { useState, useEffect } from 'react'

interface styleProps {
    theme: Theme
}

interface HeaderSearchProps {
    transparent: boolean
    links: {
        link: string
        label: string
        links?: { link: string; label: string }[]
    }[]
    onClickCart: () => void
    onClickToFooter: () => void
    onClickToMap: () => void
}

interface HeaderTransparentProp {
    transparent: boolean
}

export function HeaderMenuColored({
    links,
    transparent,
    onClickCart,
    onClickToFooter,
}: HeaderSearchProps) {
    const { handleCartClick, cartQuantity } = useShoppingCart()
    const [opened, { toggle }] = useDisclosure(false)
    const { pathname } = useRouter()
    const [isBumping, setIsBumping] = useState(false)

    useEffect(() => {
        if (cartQuantity > 0) {
            setIsBumping(true)
            setTimeout(() => {
                setIsBumping(false)
            }, 200) // set timeout to match transition duration
        }
    }, [cartQuantity])

    const useStyles = createStyles((theme) => ({
        header: {
            backgroundColor: theme.fn.variant({
                variant: 'filled',
                color: theme.primaryColor,
            }).background,
            borderBottom: 0,
            zIndex: 100,
            position: 'sticky',
            transition: '0.2s',
        },

        transparent: {
            backgroundColor: 'transparent',
            transition: '0.2s',
        },

        inner: {
            height: 80,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginRight: '5vw',
            marginLeft: '5vw',
            [theme.fn.smallerThan(900)]: {
                marginRight: '2vw',
                marginLeft: '2vw',
            },
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

        badge: {
            backgroundColor: theme.white,
            color: theme.colors[theme.primaryColor][9],
            border: 'solid 1px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            top: '-5px',
            right: '10px',
            transition: 'transform 0.2s ease-in-out', // add transition property
            transform: isBumping ? 'scale(1.2)' : 'scale(1)', // add transform property for animation
            width: cartQuantity > 99 ? '25px' : '20px',
            height: cartQuantity > 99 ? '25px' : '20px',
            fontSize: cartQuantity > 99 ? '10px' : '12px',
        },

        link: {
            display: 'flex',
            lineHeight: 1,
            padding: '8px 25px',
            borderRadius: theme.radius.sm,
            textDecoration: 'none',
            color: theme.white,
            fontSize: '15px',
            letterSpacing: '.65px',
            fontWeight: 'bold',
            fontFamily: 'Roboto, sans-serif',
            textTransform: 'uppercase',

            [theme.fn.smallerThan(900)]: {
                padding: '8px 20px',
            },
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
    }))

    const { classes } = useStyles()
    if (
        pathname.indexOf('/products/') === 0 ||
        pathname.indexOf('/products') === 0 ||
        pathname.indexOf('/product/') === 0 ||
        pathname.indexOf('/product') === 0 ||
        pathname.indexOf('/about/') === 0 ||
        pathname.indexOf('/about') === 0 ||
        pathname.indexOf('/checkout') === 0 ||
        pathname.indexOf('/checkout/') === 0
    ) {
        transparent = false
    }

    const items = links.map((link) => {
        const menuItems = link.links?.map((item) => (
            <Menu.Item key={item.link}>{item.label}</Menu.Item>
        ))

        if (menuItems) {
            return (
                <Menu
                    key={link.label}
                    trigger="hover"
                    exitTransitionDuration={0}
                >
                    <Menu.Target>
                        <a
                            href={link.link}
                            className={classes.link}
                            onClick={(event) => event.preventDefault()}
                        >
                            <Center>
                                <span className={classes.linkLabel}>
                                    {link.label}
                                </span>
                                <IconChevronDown size={12} stroke={1.5} />
                            </Center>
                        </a>
                    </Menu.Target>
                    <Menu.Dropdown>{menuItems}</Menu.Dropdown>
                </Menu>
            )
        }

        return typeof link.link === 'string' ? (
            <Link href={{ pathname: link.link }} key={link.link} legacyBehavior>
                <a className={classes.link} key={link.link}>
                    {link.label}
                </a>
            </Link>
        ) : (
            <UnstyledButton key={link.link}>
                <a className={classes.link} key={link.link} onClick={link.link}>
                    {link.label}
                </a>
            </UnstyledButton>
        )
    })

    return (
        <Header
            height={80}
            className={`${classes.header} ${transparent && classes.transparent}`}
        >
            <div className={classes.inner}>
                <Link href={'/'} legacyBehavior>
                    <div className={classes.inner} style={{ marginLeft: 0 }}>
                        <Logo />
                        <Title order={2} color="white">
                            Amabilia
                        </Title>
                    </div>
                </Link>
                <Group spacing={5} className={classes.links}>
                    {items}
                    <div className={classes.link} onClick={handleCartClick}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="white"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="#ffffff"
                            className="w-6 h-6"
                            style={{ width: '30px', height: '30px' }}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                            />
                        </svg>
                        <div className={classes.badge}>{cartQuantity}</div>
                    </div>
                </Group>
            </div>
        </Header>
    )
}
