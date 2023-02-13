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
        width: "200px",
        overflow: "hidden",
        padding: theme.spacing.md,
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
        objectFit: "cover",
    },

    hoverCart: {
        display: "flex",
        backgroundColor: theme.colors[theme.primaryColor][7],
        color: "white",
        height: '75px',
        width: '100%',
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
    const {width} = useViewportSize();
    const [opened, setOpened] = useState(false);
    const { classes } = useStyles();

    // const handleModal =  {width > 768 ? (
    //     <a href="#" onClick={handleModalOpen}>
    //         Open Modal
    //     </a>
    // ) : (
    //     <Link href="/page">
    //         <a>Go to Page</a>
    //     </Link>
    // )};

    return(
        <>
            <Modal
                opened={opened}
                onClose={() => setOpened(false)}
                size={1000}
            >
                <ProductComponent product={product}/>
            </Modal>
            <Card withBorder className={classes.card}>
                <Link href={{ pathname: `/product/${product.slug}`}}>
                    <Card.Section className={classes.imageSection}>
                        <Image src={product.imagePrimary.mediaItemUrl} alt="Tesla Model S" className={classes.image}/>
                    </Card.Section>
                </Link>

                {/* Hover Box Section */}
                <Card.Section className={classes.hoverBox}>
                    <ConditionalModal to={product.slug} openModal={() => setOpened(true)}>
                        {/*<Link href={{ pathname: `/product/${product.slug}`}}>*/}
                                <Center className={classes.search}>
                                    {/*<Link href={{ pathname: `/product/${product.slug}`}}><IconSearch className={classes.iconSearch} size={70} stroke={1.5}/></Link>*/}
                                    <IconSearch className={classes.iconSearch} size={70} stroke={1.5}/>
                                </Center>
                    </ConditionalModal>
                                <Center className={classes.hoverCart}>
                                    <IconShoppingCart size={35} stroke={1.5}    /> Dodaj do koszyka
                                    <NumberInput
                                        value={1}
                                        min="1"
                                        size="xs"
                                        description=""
                                        style={{width: "50px", marginLeft: "10px"}}
                                    />
                                </Center>
                        {/*</Link>*/}
                </Card.Section>

                {/*<Group position="apart">*/}
                    <Card.Section className={classes.title}>
                        <div>
                            <Text weight={500} className={classes.titleWrap}>{product.title}</Text>
                            {/*<Text weight={500}>Krzesło obrotowe z aluminiowymu kółkami</Text>*/}
                            {/*<Text size="xs" color="dimmed">*/}
                            {/*    Free recharge at any station*/}
                            {/*</Text>*/}
                        </div>
                        <Badge variant="filled" size="xl">{product.price} zł</Badge>
                    </Card.Section>
                {/*</Group>*/}



                {/*<Card.Section className={classes.section} mt="md">*/}
                {/*    <Text size="xl" color="dimmed" className={classes.label}>*/}
                {/*        Krzesło obrotowe z aluminiowymu kółkami*/}
                {/*    </Text>*/}
                {/*</Card.Section>*/}

                    {/*<Group spacing={8} mb={-8}>*/}
                    {/*    <Center key="testuj">*/}
                    {/*        <IconGasStation size={18} className={classes.icon} stroke={1.5} />*/}
                    {/*        <Text size="xs">Testuje?</Text>*/}
                    {/*    </Center>*/}

                    {/*    <Center key="testuj">*/}
                    {/*        <IconGasStation size={18} className={classes.icon} stroke={1.5} />*/}
                    {/*        <Text size="xs">Testuje?</Text>*/}
                    {/*    </Center>*/}
                    {/*</Group>*/}




            </Card>
        </>
    )
}
