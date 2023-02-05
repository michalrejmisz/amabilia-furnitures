import { Carousel } from '@mantine/carousel';
import { useMediaQuery } from '@mantine/hooks';
import { createStyles, Paper, Text, Title, Button, Center, Image, useMantineTheme } from '@mantine/core';
import Autoplay from 'embla-carousel-autoplay';
import {useRef} from 'react';

const useStyles = createStyles((theme) => ({
    carousel: {
        // marginTop: "50px",
        marginBottom: "50px",
        borderTop: `solid 1px ${theme.colors[theme.primaryColor][4]}`,
        borderBottom: `solid 1px ${theme.colors[theme.primaryColor][4]}`,
    },

    card: {
        height: 150,
        width: 150,
        // width: "auto",
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '10px',

        [theme.fn.smallerThan('sm')]: {
            height: 100,
            width: 100,
        },
    },

    img: {
        width: 100,
        height: 100,

        [theme.fn.smallerThan('sm')]: {
            height: 60,
            width: 60,
        },
    }


}));

const data = [
    {
        image: "/static/images/brands/rolex.png",
    },
    {
        image: "/static/images/brands/rbk.png",
    },
    {
        image: "/static/images/brands/nike.png",
    },
    {
        image: "/static/images/brands/ferrari.png",
    },
    {
        image: "/static/images/brands/shell.png"
    },
    {
        image: "/static/images/brands/windows.png"
    },
];

interface CardProps {
    image: string;
}

function Card({ image }: CardProps) {
    const { classes } = useStyles();

    return (
        <Paper
            // shadow="md"
            p="xl"
            radius="md"
            className={classes.card}
        >
            <Center className={classes.img}>
                <Image src={image}/>
            </Center>
        </Paper>
    );
}

export function CardsCarousel() {
    const { classes } = useStyles();
    const autoplay = useRef(Autoplay({ delay: 2000 }));
    const theme = useMantineTheme();
    const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`);
    const slides = data.map((item) => (
        <Carousel.Slide>
            <Card key={item.image} {...item}/>
        </Carousel.Slide>
    ));

    return (
        <Carousel
            loop
            slideSize="25%"
            breakpoints={[{ maxWidth: 'sm', slideSize: '25%', slideGap: 2 }]}
            slideGap="xl"
            align="start"
            slidesToScroll={mobile ? 1 : 2}
            styles={{ control: { opacity: '0',}}}
            plugins={[autoplay.current]}
            onMouseEnter={autoplay.current.stop}
            onMouseLeave={autoplay.current.reset}
            className={classes.carousel}
        >
            {slides}
        </Carousel>
    );
}