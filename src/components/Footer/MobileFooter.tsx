import { createStyles, ThemeIcon, SimpleGrid } from '@mantine/core'
import {
    IconPhone,
    IconShoppingCart,
    IconBuildingStore,
    IconHome,
} from '@tabler/icons'
import { Fragment, useEffect, useState } from 'react'
import Link from 'next/link'
import { useShoppingCart } from '@/context/ShoppingCartContext'
import { useQuery } from '@apollo/client'
import { ENTIRE_STATIC_CONTENT } from '@/lib/graphql/pagesContent'

interface ContactIconProps
    extends Omit<React.ComponentPropsWithoutRef<'div'>, 'title'> {
    icon: React.FC<any>
    title: React.ReactNode
    link: string
    onClick?: () => void
}

interface ContactIconsListProps {
    data?: ContactIconProps[]
}

const FooterIcons = ({
    icon: Icon,
    title,
    link,
    onClick,
}: ContactIconProps) => {
    const { handleCartClick, cartQuantity } = useShoppingCart()
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
        link: {
            display: 'flex',
            textDecoration: 'none',
            flexDirection: 'column',
            width: '100%',
        },

        icon: {
            display: 'flex',
            flexDirection: 'column',
            backgroundImage: 'none',
            width: '100%',
            height: '100%',
            margin: '8px',
            marginTop: '0px',
            backgroundColor: 'transparent',

            svg: {
                strokeWidth: '1',
                width: '35px',
                height: '35px',
            },

            '@media not all and (min-width: 350px)': {
                margin: '0px',
                svg: {
                    height: '30px',
                    width: '30px',
                },
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
            position: 'absolute',
            top: '2px',
            right: '10px',
            transition: 'transform 0.2s ease-in-out', // add transition property
            transform: isBumping ? 'scale(1.2)' : 'scale(1)', // add transform property for animation
            width: cartQuantity > 99 ? '25px' : '20px',
            height: cartQuantity > 99 ? '25px' : '20px',
            fontSize: cartQuantity > 99 ? '10px' : '12px',
        },

        svg: {
            strokeWidth: '1',
        },
    }))
    const { classes } = useStyles()

    if (onClick !== undefined) {
        return (
            <Fragment>
                <a className={classes.link} onClick={onClick}>
                    <ThemeIcon className={classes.icon}>
                        <Icon className={classes.svg} />
                        {title}
                    </ThemeIcon>
                </a>
            </Fragment>
        )
    } else {
        return (
            <Fragment>
                <Link href={{ pathname: link }} legacyBehavior>
                    <a className={classes.link}>
                        <ThemeIcon className={classes.icon}>
                            <div style={{ display: 'flex' }}>
                                <Icon className={classes.svg} />
                                {title === 'Koszyk' ? (
                                    <div className={classes.badge}>
                                        {cartQuantity}
                                    </div>
                                ) : (
                                    ''
                                )}
                            </div>
                            {title}
                        </ThemeIcon>
                    </a>
                </Link>
            </Fragment>
        )
    }
}

export const MobileFooter = () => {
    const useStyles = createStyles((theme) => ({
        mobileFooter: {
            display: 'none',
            position: 'sticky',
            right: 0,
            bottom: 0,
            left: 0,
            overflow: 'hidden',
            textAlign: 'center',
            borderTop: `solid 1px ${theme.colors[theme.primaryColor][3]}`,
            paddingTop: '5px',
            zIndex: 1,

            [theme.fn.smallerThan('sm')]: {
                display: 'block',
                height: '60px',
                width: '100%',
                backgroundColor: theme.colors[theme.primaryColor][9],
            },
        },

        grid: {
            display: 'flex',
            top: '50%',
            margin: 0,
        },
    }))

    const { loading, error, data } = useQuery(ENTIRE_STATIC_CONTENT, {
        fetchPolicy: 'network-only',
        nextFetchPolicy: 'cache-first',
    })

    const dataFooter = [
        {
            title: 'Zadzwoń',
            icon: IconPhone,
            link: '/',
            onClick: () =>
                window.open(
                    `tel:+48${data?.stronaTytulowaZdjecieBiurkaInformacje?.data?.attributes?.KliknijZadzwon ?? ''}`
                ),
        },
        { title: 'Start', icon: IconHome, link: '/' },
        {
            title: 'Sklep',
            icon: IconBuildingStore,
            link:
                '/products/category/' +
                    data?.stronaTytulowaZdjecieBiurkaInformacje?.data
                        ?.attributes?.kat?.data?.attributes?.Link ?? '',
        },
        { title: 'Koszyk', icon: IconShoppingCart, link: '/checkout' },
    ]

    const { classes } = useStyles()
    const items = dataFooter.map((item, index) => (
        <FooterIcons {...item} key={index} />
    ))

    return (
        <div className={classes.mobileFooter}>
            <SimpleGrid cols={4} className={classes.grid}>
                {items}
            </SimpleGrid>
        </div>
    )
}
