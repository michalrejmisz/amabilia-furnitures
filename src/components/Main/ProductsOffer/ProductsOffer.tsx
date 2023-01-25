import {Wrapper} from "@storybook/addon-docs";
import {Button, createStyles, Paper, Text, Title, Center, Grid, Container} from "@mantine/core";
import {Comment} from "postcss";
import {Carousel} from "@mantine/carousel";

const data = [
    {
        image:
            `${process.env.PUBLIC_URL}/images/products_1.png`,
        title: 'Krzesła',
        category: 'Krzesła',
    },
    {
        image:
            `${process.env.PUBLIC_URL}/images/products_2.png`,
        title: 'Biurka',
        category: 'Biurka',
    },
    {
        image:
            `${process.env.PUBLIC_URL}/images/products_1.png`,
        title: 'Szafy',
        category: 'Krzesła',
    },
    {
        image:
            `${process.env.PUBLIC_URL}/images/products_1.png`,
        title: 'Inne',
        category: 'Inne',
    },
];

const useStyles = createStyles((theme) => ({
    wrapper: {
        minHeight: '100vh',
        // minHeight: '100vh',
        // minHeight: 'fill-available, -moz-available, -webkit-fill-available',

    },
    card: {
        height: 400,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundSize: 'cover',
        backgroundPosition: 'center',

        '&:hover': {
            backgroundColor: theme.colors.red[9],
            filter: 'blur(2px)',
            // filter: 'grayscale(50%);',
        },
    },

    products: {
        marginTop: '100px',
        height: '100%',
        padding: '10px',
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
        background: `url(${process.env.PUBLIC_URL}"/images/right_arrow.svg")`,
        // marginRight: "10px",
        marginBottom: "10px",
    },
}))


interface CardProps {
    image: string;
    title: string;
    category: string;
}


function Card({ image, title, category }: CardProps) {
    const { classes } = useStyles();

    return (
        <Paper
            shadow="md"
            radius="md"
            sx={{ backgroundImage: `url(${image})` }}
            className={classes.card}
        >
            <Center className={classes.titleBox}>
                <Title order={3} className={classes.title}>
                    {title}
                </Title>
            </Center>
            <div className={classes.iconBox} style={{background: `url(${process.env.PUBLIC_URL} + "/images/logo.svg")`}}/>

        </Paper>
    );
}

const ProductsOffer = () =>{
    const { classes } = useStyles();
    const cards = data.map((item)=>(
        <Carousel.Slide key={item.title}>
            <Card {...item}></Card>
        </Carousel.Slide>
    ))
    return(
        // <Container size={"lg"} style={{height: '100vh'}}>
        <Container size={"lg"} className={classes.wrapper}>
            <div className={classes.products}>
                <div className={classes.ourOfferHeader}>Nasza oferta</div>
                <Grid>
                    {data.map((item) => (<Grid.Col xs={4} md={4} lg={3}><Card {...item}></Card></Grid.Col>))}
                </Grid>
            </div>
        </Container>
    );
}

export default ProductsOffer;