import {Button, createStyles, Paper, Text, Title, Center, Grid, Container, Transition } from "@mantine/core";
import {CardsCarousel} from "./CardCarousel";
import {useQuery} from "@apollo/client";
import {HOME_PAGE_CATEGORIES} from "@/lib/graphql/categories";
import Link from 'next/link';

const data = [
    {
        image:
            `/static/images/products_1.png`,
        title: 'Krzesła',
        category: 'Krzesła',
    },
    {
        image:
            `/static/images/products_2.png`,
        title: 'Biurka',
        category: 'Biurka',
    },
    {
        image:
            `/static/images/products_1.png`,
        title: 'Szafy',
        category: 'Krzesła',
    },
    {
        image:
            `/static/images/products_1.png`,
        title: 'Inne',
        category: 'Inne',
    },
];

const useStyles = createStyles((theme) => ({
    wrapper: {
        minHeight: '100vh',
        paddingBottom: '50px',
    },

    card: {
        height: 400,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundSize: 'cover',
        backgroundPosition: 'center',

        // '&:hover': {
        //     backgroundColor: theme.colors.red[9],
        //     filter: 'blur(2px)',
        //     // filter: 'grayscale(50%);',
        // },

        '&:hover': {
            boxShadow: `${theme.shadows.xl} !important`,
            transform: 'scale(1.05)',


            iconBox: {
                // marginTop: 'auto',
                // backgroundColor: "red",
                backgroundColor: 'red',
            },
        },
    },

    products: {
        marginTop: '100px',
        height: '100%',
        padding: '10px',
        // marginBottom: '50px',
    },

    ourOfferHeader: {
        marginBottom: '50px',
        fontSize: '50px',
        fontWeight: 'bold',
        color: theme.colors[theme.primaryColor][4]
    },


    titleBox: {
        height: '70px',
        width: '100%',
        backgroundColor: theme.colors[theme.primaryColor][3],
        opacity: 0.9,
    },

    title: {
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        fontWeight: 900,
        color: theme.white,
        lineHeight: 1.2,
        fontSize: 32,
        opacity: 1,
        textTransform: 'uppercase',
        // marginTop: theme.spacing.xs,
        // marginBottom: theme.spacing.xs,
    },

    category: {
        color: theme.white,
        opacity: 0.7,
        fontWeight: 700,
        textTransform: 'uppercase',
    },

    iconBox: {
        // marginTop: 'auto',
        // backgroundColor: "red",
        alignSelf: "flex-end",
        minHeight: "50px",
        minWidth: "50px",
        background: `url("/images/right_arrow.svg")`,
        // marginRight: "10px",
        marginBottom: "10px",
        transition: "transform 0.2s ease-in-out",
        "&:hover": {
            transform: "translateX(5px)",
        },
    },
}))


interface CardProps {
    image: string;
    title: string;
    linkToCategory: string;
}


function Card({ image, title, linkToCategory }: CardProps) {
    const { classes } = useStyles();

    return (
        // <Link href="/products/special-category/wielka-wieprz" legacyBehavior>
        <Link href={`${linkToCategory}`} legacyBehavior>
            <a>
                <Paper
                    shadow="md"
                    radius="md"
                    sx={{ backgroundImage: `url(${image})`, backgroundSize: "contain", backgroundPosition: "center" , backgroundRepeat: "no-repeat" }}
                    className={classes.card}
                >
                    <Center className={classes.titleBox}>
                        <Title order={3} className={classes.title}>
                            {title}
                        </Title>
                    </Center>
                    <div className={classes.iconBox} style={{background: `url("/images/right_arrow.svg")`}}/>
                    {/*<div className={classes.iconBox} style={{background: `url(${process.env.PUBLIC_URL} + "/images/logo.svg")`}}/>*/}

                </Paper>
            </a>
        </Link>
    );
}

interface ProductsOfferProps{
    brands: Array[];
}

const ProductsOffer = ({brands} : ProductsOfferProps) =>{
    const { classes } = useStyles();
    const {data: categoriesHomePage } = useQuery(HOME_PAGE_CATEGORIES)
    const podlinkowane = categoriesHomePage?.kategoriesLinki?.data?.attributes?.Podlinkowane;
    // const cards = data.map((item)=>(
    //     <Carousel.Slide key={item.title}>
    //         <Card {...item}></Card>
    //     </Carousel.Slide>
    // ))
    return(
        // <Container size={"lg"} style={{height: '100vh'}}>
        <Container size={"lg"} className={classes.wrapper}>
            <div className={classes.products}>
                <div className={classes.ourOfferHeader}>Nasza oferta</div>
                <CardsCarousel brands={brands}/>
                {/*<Grid>*/}
                {/*    {data.map((item) => (<Grid.Col xs={4} md={4} lg={3} key={item.title}><Card {...item}></Card></Grid.Col>))}*/}
                {/*</Grid>*/}
            </div>
            <div>
                <Grid>
                    {podlinkowane?.map((item) => (
                        // <div key={item.id}>
                        <Grid.Col xs={4} md={4} lg={3} key={item.title}>
                            {item.__typename === "ComponentNowaNazwaTestowa" && (
                                    <Card
                                        image={`${process.env.NEXT_PUBLIC_STRAPI_UPLOAD_FOLDER}${item.ZdjecieTestowa?.data?.attributes?.ZdjecieTestowaFormats?.small?.url || item.ZdjecieTestowa?.data?.attributes?.ZdjecieTestowaUrl}${"?format=webp"}`}
                                        title={item.NazwaTestowa}
                                        linkToCategory={`${"/products/category/"}${item.kategoria.data.attributes.Link}`}
                                    />
                            )}
                            {item.__typename === "ComponentNowaNowaWlasna" && (
                                    <Card
                                        image={`${process.env.NEXT_PUBLIC_STRAPI_UPLOAD_FOLDER}${item.ZdjecieWlasna?.data?.attributes?.ZdjecieWlasnaFormats?.small?.url || item.ZdjecieWlasna?.data?.attributes?.ZdjecieWlasnaUrl}${"?format=webp"}`}
                                        title={item.NazwaWlasna}
                                        linkToCategory={`${"/products/special-category/"}${item.wlasna_kategoria.data.attributes.StworzKategorie.Link}`}
                                    />
                            )}
                        </Grid.Col>
                    ))}
                </Grid>
            </div>

        </Container>
    );
}

export default ProductsOffer;