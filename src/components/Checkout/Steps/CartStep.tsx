import {
    ActionIcon,
    createStyles,
    Group,
    Image,
    List,
    Text,
    useMantineTheme,
    Flex,
    Title,
    Loader,
} from '@mantine/core'
import {
    IconChevronDown,
    IconChevronUp,
    IconTrash,
    IconCheck,
    IconX,
} from '@tabler/icons'
import React, { useEffect, useState } from 'react'
import { useViewportSize } from '@mantine/hooks'
import { useShoppingCart } from '@/context/ShoppingCartContext'
import { useQuery } from '@apollo/client'
import { GET_PRODUCTS_BY_LINKS, PRODUCTS_ALL } from '@/lib/graphql/products'
import Link from 'next/link'

// @ts-ignore
const useStyles = createStyles((theme) => ({
    title: {
        margin: '0px 10px 15px 10px',
        float: 'left',
        fontFamily: 'Roboto, sans-serif',
        textTransform: 'uppercase',
        fontWeight: '100',
        letterSpacing: '2.5px',
        color: theme.colors[theme.primaryColor][6],
        marginTop: theme.spacing.sm,
        marginLeft: theme.spacing.xl,
        marginBottom: theme.spacing.xs,
        [theme.fn.smallerThan('sm')]: {
            marginLeft: theme.spacing.xs,
            marginBottom: 0,
        },
    },

    list: {
        height: 'calc(100vh - 430px)',
        margin: '5px 20px 0px 20px',
        float: 'left',
        overflowY: 'auto',
        overflowX: 'hidden',
        width: '95%',
        scrollbarWidth: 'thin',
        paddingBottom: '20px',
        borderTop: `1px solid ${theme.fn.variant({ variant: 'outline', color: theme.primaryColor }).border}`,
        borderBottom: `1px solid ${theme.fn.variant({ variant: 'outline', color: theme.primaryColor }).border}`,

        [theme.fn.smallerThan('sm')]: {
            width: '100%',
            margin: '10px 5px 0px 5px',
            height: 'calc(100vh - 80px - 66px - 200px - 80px)',
        },

        '::-webkit-scrollbar': {
            width: '4px',
            color: theme.colors[theme.primaryColor][6],
        },

        '::-webkit-scrollbar-track': {
            borderRadius: '10px',
        },

        '::-webkit-scrollbar-thumb': {
            borderRadius: '10px',
            '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.5)',
        },

        '@media not all and (min-width: 350px)': {
            paddingRight: '10px',
        },
    },

    entireItem: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        width: '100%',

        '@media not all and (min-width: 350px)': {
            marginRight: '5px',
            height: 'auto',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            marginBottom: '20px',
            border: `1px solid ${theme.colors[theme.primaryColor][3]}`,
            padding: '3px',
        },
    },

    img: {
        display: 'flex',
        flexBasis: '30%',
        '@media not all and (min-width: 350px)': {
            marginTop: '10px',
            height: '100px',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            flexBasis: '100%',
        },
    },

    description: {
        flex: 1,
        flexBasis: '50%',
        '@media not all and (min-width: 350px)': {
            height: 'auto',
            flexBasis: '70%',
        },
    },

    counter: {
        flex: 1,
        flexBasis: '10%',
        '@media not all and (min-width: 350px)': {
            flexBasis: '10%',
        },
    },

    bin: {
        display: 'flex',
        flexDirection: 'row',
        alignSelf: 'center',
        flexBasis: '10%',
        '@media not all and (min-width: 350px)': {
            flexBasis: '10%',
        },
    },

    amount: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        margin: '10px 10px 10px 20px',
        padding: '10px 1px 10px 1px',
        fontFamily: 'Roboto, sans-serif',
        textTransform: 'uppercase',
        fontWeight: '400',
        letterSpacing: '2.5px',
    },

    amountItem: {
        color: theme.colors[theme.primaryColor][9],
        '&:hover': {
            color: theme.colors[theme.primaryColor][5],
        },
    },
}))

type CartItemProps = {
    slug: String
    quantity: number
    item: Object
}

export const Item = ({ item, slug, quantity }: CartItemProps) => {
    const { classes } = useStyles()
    const theme = useMantineTheme()
    const [imageSize, setImageSize] = useState(50)
    const [iconSize, setIconSize] = useState(25)
    const { width }: { width: number } = useViewportSize()

    const {
        closeCart,
        removeFromCart,
        increaseCartQuantity,
        decreaseCartQuantity,
    } = useShoppingCart()
    const [isConfirming, setIsConfirming] = useState(false)

    const handleRemove = () => {
        removeFromCart(slug, item?.attributes.Cena)
        setIsConfirming(false)
    }

    const handleCancel = () => {
        setIsConfirming(false)
    }

    useEffect(() => {
        imageSizeByWidth(width)
    }, [width])

    const imageSizeByWidth = (width: number) => {
        if (width < 350) {
            setImageSize(150)
            setIconSize(15)
        } else if (width < 576) {
            setImageSize(50)
            setIconSize(20)
        } else if (width < 768) {
            setImageSize(75)
            setIconSize(20)
        } else {
            setImageSize(100)
            setIconSize(25)
        }
    }

    return (
        <div className={classes.entireItem}>
            <Image
                src={`${process.env.NEXT_PUBLIC_STRAPI_UPLOAD_FOLDER}${item.attributes?.Zdjecie_glowne?.data?.attributes?.formats?.thumbnail?.url || '/uploads/no-thumb.png'}`}
                radius="md"
                fit="contain"
                placeholder
                width={imageSize}
                height={imageSize}
                className={classes.img}
                alt={item?.attributes.Nazwa}
            />

            <div className={classes.description}>
                <Link href={{ pathname: `/product/${slug}` }} legacyBehavior>
                    <a>
                        <Text
                            size="sm"
                            weight={500}
                            className={classes.amountItem}
                            align={'left'}
                        >
                            {item?.attributes.Nazwa}
                        </Text>
                    </a>
                </Link>

                <Text color="dimmed" size="xs" align={'left'}>
                    {item?.attributes.Cena} zł x {quantity}
                </Text>
            </div>

            <div position={'right'} spacing={'0'} className={classes.counter}>
                <Flex direction="column" align="center">
                    <ActionIcon
                        onClick={() =>
                            increaseCartQuantity(slug, item?.attributes.Cena)
                        }
                    >
                        <IconChevronUp size={iconSize} stroke={1.2} />
                    </ActionIcon>
                    <Text color="dimmed">{quantity}</Text>
                    <ActionIcon
                        onClick={() =>
                            decreaseCartQuantity(slug, item?.attributes.Cena)
                        }
                    >
                        <IconChevronDown size={iconSize} stroke={1.2} />
                    </ActionIcon>
                </Flex>
            </div>

            {!isConfirming ? (
                <ActionIcon
                    className={classes.bin}
                    onClick={() => setIsConfirming(true)}
                >
                    <IconTrash
                        size={iconSize}
                        stroke={1.5}
                        color={theme.colors.red[4]}
                    />
                </ActionIcon>
            ) : (
                <div className={classes.bin}>
                    <ActionIcon onClick={handleRemove}>
                        <IconCheck
                            size={iconSize}
                            stroke={1.5}
                            color={theme.colors.green[4]}
                        />
                    </ActionIcon>
                    <ActionIcon onClick={handleCancel}>
                        <IconX
                            size={iconSize}
                            stroke={1.5}
                            color={theme.colors.red[4]}
                        />
                    </ActionIcon>
                </div>
            )}
        </div>
    )
}

export const ItemList = () => {
    const { classes } = useStyles()
    const { cartItems, cartValue, handleCartValue } = useShoppingCart()

    const slugsArray = cartItems?.map((item) => item.slug)
    const { loading: loadingLinks, data: products_by_link } = useQuery(
        GET_PRODUCTS_BY_LINKS,
        {
            variables: {
                cartLinks: slugsArray,
            },
            fetchPolicy: 'cache-first',
        }
    )

    useEffect(() => {
        if (!loadingLinks) {
            if (cartItems.length > 0 && cartValue === 0) {
                let findedItem = 0
                let newCartValue = 0
                cartItems.map((item) => {
                    findedItem = products_by_link?.produkties?.data?.find(
                        (product) => product.attributes?.Link === item.slug
                    )
                    newCartValue =
                        newCartValue +
                        findedItem?.attributes?.Cena * item.quantity
                })
                handleCartValue(newCartValue)
            }
        }
    }, [loadingLinks])

    return (
        <div style={{ float: 'left' }}>
            <Title order={4} className={classes.title}>
                Koszyk
            </Title>
            <List className={classes.list}>
                {loadingLinks ? (
                    <Loader mt="20px" />
                ) : (
                    <>
                        {cartItems?.map((item) => {
                            const matchingProducts =
                                products_by_link?.produkties?.data?.filter(
                                    (product) =>
                                        product.attributes?.Link === item.slug
                                )
                            return matchingProducts?.map((product) => (
                                <Item
                                    key={product.attributes.Link}
                                    item={product}
                                    slug={item.slug}
                                    quantity={item.quantity}
                                />
                            ))
                        })}
                    </>
                )}
            </List>
        </div>
    )
}

export const CartStep = () => {
    const { cartValue } = useShoppingCart()
    const { classes } = useStyles()
    return (
        <Flex direction="column">
            <ItemList />
            <Group className={classes.amount}>
                <Text color="dimmed" size={'lg'}>
                    Razem:
                </Text>
                <Text color="dimmed" size={'lg'} fw={600}>
                    {cartValue} zł
                </Text>
            </Group>
        </Flex>
    )
}
