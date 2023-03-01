import {
    Card,
    Image,
    Center,
    Badge,
    NumberInput,
    Modal,
    Group,
    createStyles,
    Text,
    Button,
    UnstyledButton
} from '@mantine/core';

import { useViewportSize } from '@mantine/hooks';
import {
    IconGasStation,
    IconShoppingCart,
    IconSearch,
} from '@tabler/icons';
import Link from 'next/link';
import {IProduct} from "../../../interfaces/Products";
import React, {
    Fragment,
    createContext,
    useContext,
    useState,
} from 'react';
import {ConditionalModal} from "./ConditionalModal";
import {ProductComponent} from "../../Product/ProductComponent";
import {useShoppingCart} from "@/context/ShoppingCartContext";


const useStyles = createStyles((theme, _params, getRef) => ({

    card :{
        '&:hover': {
            boxShadow: `${theme.shadows.xl} !important`,
            transform: 'scale(1.05)',

        },

        [`&:hover .${getRef('hoverBox')}`]: {
            opacity: 1
        }
    },

    imageSection: {
        height: "200px",
        width: "auto",
        overflow: "hidden",
        padding: 0,
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottom: `1px solid ${
            theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
        }`,
    },

    image: {
        width: "100%",
        height: "auto",
        // objectFit: "contain",
        // objectFit: "cover",
    },

    hoverCart: {
        display: "flex",
        backgroundColor: theme.colors[theme.primaryColor][7],
        color: "white",
        height: '75px',
        width: '100%',

        "&:hover": {
            // transform: 'scale(1.05)',
            backgroundColor: theme.colors[theme.primaryColor][5],
        },

        "&:active": {
            transform: 'scale(1.10)',
        }
    },

    hoverBox: {
        ref: getRef('hoverBox'),
        display: 'flex',
        flexDirection: 'column',
        margin: 0,
        position: "absolute",
        bottom: 0,
        left: 0,
        height: '100%',
        width: '100%',
        opacity: 0,
    },

    search: {
        width: '100%',
        height: '100%',
        background: "rgba(0,0,0,0.35)",
    },

    iconSearch: {
        color: "white",
        // color: theme.colors[theme.primaryColor][5],
        "&:hover": {
            transform: 'scale(1.20)',
        }
    },

    label: {
        marginBottom: theme.spacing.xs,
        lineHeight: 1,
        fontWeight: 700,
        fontSize: theme.fontSizes.xs,
        letterSpacing: -0.25,
        textTransform: 'uppercase',
    },

    section: {
        padding: theme.spacing.md,
        borderTop: `1px solid ${
            theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
        }`,
    },

    title: {
        height: '100px',
        padding: '10px',
    },

    titleWrap: {
        textAlign: "center",
        justifyContent: "center",
        overflow: "hidden",
        // whiteSpace: "nowrap",
        textOverflow: "clip",
        wordWrap: "break-word",
        height: "3.5rem",
        display: "block",
        color: theme.colors[theme.primaryColor][8]
    },

    a: {
        height: '100%',
    },

    icon: {
        marginRight: 5,
        color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[5],
    },

}))

const Context = createContext({} as IProduct)

export const SingleProductCard: React.FC<{product : IProduct}> = ({product}) => {
    const {increaseCartQuantity, handleCartClick} = useShoppingCart()
    const {width} = useViewportSize();
    const [opened, setOpened] = useState(false);
    const { classes } = useStyles();
    let modalWidth = 0.9*width;

    let otherImages = null
    otherImages = product?.images?.data?.map((img) => {
        let thumbnailUrl = null
        // if(img.attributes?.formats?.thumbnail?.url){
            thumbnailUrl = process.env.NEXT_PUBLIC_STRAPI_UPLOAD_FOLDER+
                (img.attributes?.formats?.thumbnail?.url ? img.attributes?.formats?.thumbnail?.url : img.attributes?.url || "/uploads/no-thumb.png") +
                "?format=webp";
        // }
        // let mediaItemUrl = process.env.NEXT_PUBLIC_STRAPI_UPLOAD_FOLDER+img.attributes?.url+"?format=webp"
        let mediaItemUrl = process.env.NEXT_PUBLIC_STRAPI_UPLOAD_FOLDER +
            (img.attributes?.formats?.large ? img.attributes.formats.large.url : img.attributes?.url || "/uploads/no-thumb.png") +
            "?format=webp";
        return{
            mediaItemUrl,
            thumbnailUrl
        }
    })

    let imageThumbnail = product?.imagePrimary?.thumbnailUrl;
    // if (!(product?.imagePrimary?.thumbnailUrl === "null")) {
    //     imageThumbnail = product?.imagePrimary?.thumbnailUrl;
    // }

    return(
        <>
            <Modal
                opened={opened}
                onClose={() => setOpened(false)}
                size={1200}
            >
                <ProductComponent product={{
                        ...product,
                        images: [
                            ...otherImages
                        ],
                    }
                }/>
            </Modal>
            <Card withBorder className={classes.card}>
                <Link href={{ pathname: `/product/${product.slug}`}}>
                    <Card.Section className={classes.imageSection}>
                        <Image src={imageThumbnail} alt={product.title} className={classes.image} style={{ objectFit: "scale-down" }}/>
                    </Card.Section>
                </Link>

                {/* Hover Box Section */}
                <Card.Section className={classes.hoverBox}>
                    <ConditionalModal to={product.slug?.toString() || "test"}  title={product.title} openModal={() => setOpened(true)}>
                                <Center className={classes.search}>
                                    <IconSearch className={classes.iconSearch} size={70} stroke={1.5}/>
                                </Center>
                    </ConditionalModal>
                                <UnstyledButton  onClick={() => increaseCartQuantity(product.slug, product.price)}>
                                    <Center className={classes.hoverCart}>
                                        <IconShoppingCart size={35} stroke={1.5} /> Dodaj do koszyka
                                    </Center>
                                </UnstyledButton>
                </Card.Section>

                    <Card.Section className={classes.title}>
                        <div>
                            <Text weight={500} className={classes.titleWrap}>{product.title}</Text>

                        </div>
                        <Badge variant="filled" size="xl">{product.price} zł</Badge>
                    </Card.Section>

            </Card>
        </>
    )
}
