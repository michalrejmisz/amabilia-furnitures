import React, { useState, useEffect } from 'react';
import {
    createStyles,
    Transition,
    ActionIcon,
    Title,
    List,
    ThemeIcon,
    Image,
    Group,
    Avatar,
    Text,
    Button, Modal, useMantineTheme,
    Loader,
} from "@mantine/core";
import {
    IconChevronUp,
    IconChevronDown,
    IconChevronRight,
    IconX,
    IconTrash, IconCheck
} from '@tabler/icons';
import Link from 'next/link'
import {useShoppingCart} from "@/context/ShoppingCartContext";
import {useQuery} from "@apollo/client";
import {PRODUCTS_ALL, GET_PRODUCTS_BY_LINKS} from "@/lib/graphql/products";
import {ConditionalModal} from "@/components/Products/Grid/ConditionalModal";
import {ProductComponent} from "@/components/Product/ProductComponent";


const useStyles = (createStyles(theme => ({
    cart: {
        position: "fixed",
        top: "80",
        right: "0",
        minWidth: "400px",
        maxWidth: "400px",
        minHeight: "calc(100vh - 80px)",
        backgroundColor: "white",
        borderLeft: `1px solid ${theme.colors[theme.primaryColor][3]}`,
        zIndex: "9999",
        boxShadow: `4px -4px 10px 0px ${theme.colors[theme.primaryColor][3]}`,
        flexDirection: "column",
    },

    title: {
        margin: "0px 30px 5px 30px",
        padding: "25px",
        borderBottom: `1px solid ${theme.colors[theme.primaryColor][3]}`,

        fontFamily: 'Roboto, sans-serif',
        textTransform: 'uppercase',
        fontWeight: "100",
        letterSpacing: "2.5px",
        // backgroundColor: `${theme.colors.gray[1]}`,
        color: theme.colors[theme.primaryColor][6],
        // boxShadow: `0 4px 4px -4px ${theme.colors[theme.primaryColor][3]}`,
    },

    titleGroup: {
        margin: "0px 30px 5px 30px",
        padding: "25px",
        borderBottom: `1px solid ${theme.colors[theme.primaryColor][3]}`,
    },

    list: {
        height: "calc(100vh - 330px)",
        margin: "0px 10px 20px 20px",
        float:"left",
        overflowY: "scroll",
        overflowX: "hidden",
        width: "380px",
        scrollbarWidth: "thin",

        "::-webkit-scrollbar": {
            width: "4px",
            color: theme.colors[theme.primaryColor][6],
        },

        "::-webkit-scrollbar-track": {
            // "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.3)",
            borderRadius: "10px",
        },

        "::-webkit-scrollbar-thumb": {
            "borderRadius": "10px",
            "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.5)",
            // "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.5)",
        }
    },


    groupItem: {
        height: "100px",
        width: "370px",
    },

    checkoutButton: {
        width: "380px",
        height: "60px",
        margin: "10px",
    },

    amount: {
        flexDirection: "row",
        justifyContent: "space-between",
        borderTop: `1px solid ${theme.colors[theme.primaryColor][3]}`,
        margin: "10px 30px 10px 30px",
        padding: "20px 1px 20px 1px",
        fontFamily: 'Roboto, sans-serif',
        textTransform: 'uppercase',
        fontWeight: "400",
        letterSpacing: "2.5px",
    },

    amountItem: {
        color: theme.colors[theme.primaryColor][9],

        "&:hover": {
            color: theme.colors[theme.primaryColor][5],
        }
    },

    closeButton: {
        position: "absolute",
        top: "25px",
        left: "25px",
        color: theme.colors[theme.primaryColor][6],
    },

    bin: {
        display: "flex",
        flexDirection: "row",
    }

})));


type CartItemProps = {
    slug: String;
    quantity: number;
    item: Object;
}

export const Item = ({item, slug, quantity} : CartItemProps) => {
    const {classes} = useStyles();
    const {closeCart, removeFromCart, increaseCartQuantity, decreaseCartQuantity} = useShoppingCart();
    // const {loading, data: products} = useQuery(PRODUCTS_ALL, {
    //     // nextFetchPolicy: 'cache-first', // Used for subsequent executions
    //     fetchPolicy: "cache-first",
    // });

    // const {data: products_by_link } = useQuery(GET_PRODUCTS_BY_LINKS, {
    //     variables: {
    //         cartLinks: ["biurko-kinnarps-seria-e"]
    //     },
    //     fetchPolicy: "cache-first",
    // });
    //
    // console.log("PRODUCTS_BY_LINK")
    // console.log(products_by_link)
    // console.log("PRODUCTS_BY_LINK")

    // const item = products?.produkties?.data?.find(product => product.attributes?.Link === slug)
    const theme = useMantineTheme();
    const [isConfirming, setIsConfirming] = useState(false);

    const handleRemove = () => {
        // TODO: Remove the item from the cart
        removeFromCart(slug, item?.attributes.Cena)
        setIsConfirming(false);
    };

    const handleCancel = () => {
        setIsConfirming(false);
    };

    if(item === null) {
        return null;
    }

    return(
        <Group className={classes.groupItem} position={"apart"}>
            {/*<Modal*/}
            {/*    opened={isOpenedModal}*/}
            {/*    onClose={() => setIsOpenedModal(false)}*/}
            {/*    size={1200}*/}
            {/*>*/}
            {/*    <ProductComponent product={{*/}
            {/*        ...item.attributes,*/}
            {/*        images: [*/}
            {/*            // ...otherImages*/}
            {/*        ],*/}
            {/*    }*/}
            {/*    }/>*/}
            {/*</Modal>*/}
            {/*<ConditionalModal to={slug.toString() || "test"} openModal={() => setIsOpenedModal(true)}>*/}
                {/*<Image src="http://panel.amabilia-meble.pl/uploads/6_nature_biurko_0014_3d34ad5cdc.jpg"*/}
                <Link href={{ pathname: `/product/${slug}` }} legacyBehavior >
                    <a>
                        <Image src={`${process.env.NEXT_PUBLIC_STRAPI_UPLOAD_FOLDER}${item?.attributes?.Zdjecie_glowne?.data?.attributes?.formats?.thumbnail?.url || "/uploads/no-thumb.png"}`}
                               radius="md"
                               height={75}
                               width={75}
                               fit="contain"
                               placeholder
                        />
                    </a>
                </Link>

                <Group style={{ flexDirection: "column", alignItems: "flex-start", width: "150px"}} spacing={"0"} position={"left"}>
                    <Link href={{ pathname: `/product/${slug}` }} legacyBehavior >
                        <a style={{height: '100%'}}>
                            <Text size="sm" weight={500} className={classes.amountItem} align={"left"}>
                                {/*Biurko z wieloma zdjęciami*/}
                                {item?.attributes?.Nazwa}
                            </Text>
                        </a>
                    </Link>

                    <Text color="dimmed" size="xs" align={"left"}>
                        {/*159.50zł x 1*/}
                        {item?.attributes?.Cena} zł x {quantity}
                    </Text>
                </Group>

                <Group style={{flexDirection: "column"}} position={"right"} spacing={"0"}>
                    <ActionIcon onClick={() => increaseCartQuantity(slug, item?.attributes.Cena)}>
                        <IconChevronUp size={20} stroke={1.2} />
                    </ActionIcon>
                    <Text color="dimmed">{quantity}</Text>
                    <ActionIcon onClick={() => decreaseCartQuantity(slug, item?.attributes.Cena)}>
                        <IconChevronDown size={20} stroke={1.2} />
                    </ActionIcon>
                </Group>

                {/*<IconChevronRight size={14} stroke={1.5} />*/}
                {/*<ActionIcon onClick={() => removeFromCart(slug, item?.attributes.Cena)}>*/}
                {/*    <IconTrash size={14} stroke={1.5}/>*/}
                {/*</ActionIcon>*/}

                {!isConfirming ? (
                    <ActionIcon className={classes.bin} onClick={() => setIsConfirming(true)}>
                        <IconTrash size={18} stroke={1.5} color={theme.colors.red[4]}/>
                    </ActionIcon>
                ) : (
                    <div className={classes.bin}>
                        <ActionIcon onClick={handleRemove}>
                            <IconCheck size={18} stroke={1.5} color={theme.colors.green[4]}/>
                        </ActionIcon>
                        <ActionIcon onClick={handleCancel}>
                            <IconX size={18} stroke={1.5} color={theme.colors.red[4]}/>
                        </ActionIcon>
                    </div>
                )}
            {/*</ConditionalModal>*/}
        </Group>
    );
}

export const ItemList = () => {
    const {classes} = useStyles();
    const {cartItems, cartValue, handleCartValue} = useShoppingCart();
    // const {loading, data: products} = useQuery(PRODUCTS_ALL, {
    //     fetchPolicy: "cache-first",
    // });

    const slugsArray = cartItems?.map((item) => item.slug)

    const {loading: loadingLinks, data: products_by_link } = useQuery(GET_PRODUCTS_BY_LINKS, {
        variables: {
            cartLinks: slugsArray,
        },
        fetchPolicy: "cache-first",
    });


    useEffect(() => {
        if(!loadingLinks){
            if(cartItems.length > 0 && cartValue === 0){
                let findedItem = 0;
                let newCartValue = 0;
                cartItems.map(item => {
                    findedItem = products_by_link?.produkties?.data?.find(product => product.attributes?.Link === item.slug)
                    newCartValue = newCartValue + findedItem?.attributes?.Cena * item.quantity
                })
                handleCartValue(newCartValue)
            }
        }
    }, [loadingLinks])

    return(
        <>
            <List className={classes.list}>
                {loadingLinks ? (
                    <Loader mt="20px"/>
                ) : (
                    <>
                        {cartItems?.map(item => {
                            const matchingProducts = products_by_link?.produkties?.data?.filter(product => product.attributes?.Link === item.slug);
                            return matchingProducts?.map(product => <Item key={product.attributes.Link} item={product} slug={item.slug} quantity={item.quantity}/>);
                        })}
                    </>
                )}
            </List>
        </>
    );
}

export const SideCart = () => {
    const [cartItems, setCartItems] = useState([]);
    const {isOpenCart, closeCart, cartValue} = useShoppingCart()
    const {classes} = useStyles();

    return (
        <Transition mounted={isOpenCart} transition={"slide-left"} duration={400} timingFunction="ease">
            {(styles) => (
                <div style={styles} className={classes.cart} >
                    <ActionIcon className={classes.closeButton} onClick={closeCart}>
                        <IconX size={20} stroke={1.5} />
                    </ActionIcon>
                    <Title order={4} className={classes.title}>Twój koszyk</Title>
                    <ItemList/>

                    <Group className={classes.amount}>
                        <Text color="dimmed" size={"lg"} >Razem:</Text>
                        <Text color="dimmed" size={"lg"} fw={600}>{cartValue} zł</Text>
                    </Group>


                    <Link href="/checkout">
                        <Button
                            fullWidth={true}
                            uppercase={true}
                            height={"50px"}
                            className={classes.checkoutButton}
                        >
                            Przejdź do zamówienia
                        </Button>
                    </Link>

                </div>
            )}
        </Transition>
    );
}
