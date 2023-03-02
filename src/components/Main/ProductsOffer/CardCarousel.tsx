import { Carousel } from '@mantine/carousel'
import { useMediaQuery } from '@mantine/hooks'
import {
    createStyles,
    Paper,
    Center,
    Image,
    useMantineTheme,
} from '@mantine/core'
import Autoplay from 'embla-carousel-autoplay'
import { useRef } from 'react'

const useStyles = createStyles((theme) => ({
    carousel: {
        marginBottom: '50px',
        borderTop: `solid 1px ${theme.colors[theme.primaryColor][4]}`,
        borderBottom: `solid 1px ${theme.colors[theme.primaryColor][4]}`,
    },

    card: {
        height: 150,
        width: 150,
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
    },
}))

interface CardProps {
    image: string
}

function Card({ image }: CardProps) {
    const { classes } = useStyles()

    return (
        <Paper p="xl" radius="md" className={classes.card}>
            <Center className={classes.img}>
                <Image src={image} alt="Miniaturka Marki" />
            </Center>
        </Paper>
    )
}

interface CardCarouselProps {
    brands: Array[]
}

export function CardsCarousel({ brands }: CardCarouselProps) {
    const { classes } = useStyles()
    const autoplay = useRef(Autoplay({ delay: 2000 }))
    const theme = useMantineTheme()
    const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`)
    const slides = brands.map((item) => (
        <Carousel.Slide key={item.attributes?.formats?.thumbnail.url}>
            <Card
                key={`${process.env.NEXT_PUBLIC_STRAPI_UPLOAD_FOLDER}${item.attributes?.formats?.thumbnail.url}`}
                image={`${process.env.NEXT_PUBLIC_STRAPI_UPLOAD_FOLDER}${item.attributes?.formats?.thumbnail.url}${'?format=webp'}`}
            />
        </Carousel.Slide>
    ))

    return (
        <Carousel
            loop
            slideSize="25%"
            breakpoints={[{ maxWidth: 'sm', slideSize: '25%', slideGap: 2 }]}
            slideGap="xl"
            align="start"
            slidesToScroll={mobile ? 1 : 2}
            styles={{ control: { opacity: '0' } }}
            plugins={[autoplay.current]}
            onMouseEnter={autoplay.current.stop}
            onMouseLeave={autoplay.current.reset}
            className={classes.carousel}
        >
            {slides}
        </Carousel>
    )
}
