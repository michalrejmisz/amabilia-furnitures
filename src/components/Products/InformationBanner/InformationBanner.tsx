import {
    Image,
    Grid,
    createStyles,
    Text,
    Title,
    useMantineTheme,
    Center,
} from '@mantine/core'
import { Carousel } from '@mantine/carousel'
import { useQuery } from '@apollo/client'
import { PRODUCTS_ALL } from '@/lib/graphql/products'
import { BANER_PRODUCT_PAGE } from '@/lib/graphql/pagesContent'
import Autoplay from 'embla-carousel-autoplay'
import { useRef } from 'react'

const useStyles = createStyles((theme) => ({
    banner: {
        borderRadius: theme.spacing.xs,
        marginTop: '20px',
        minHeight: '250px',
        maxHeight: '250px',
        backgroundImage: `linear-gradient(250deg, rgba(130, 201, 30, 0) 0%, ${theme.colors[theme.primaryColor][6]} 50%), url(/images/truck5.webp)`,
    },

    imageBanner: {
        width: 'auto',
        height: '150px',
        padding: '25px',
    },

    fillHeight: {
        height: '100%',
    },

    row: {
        display: 'flex',
        flexWrap: 'wrap',
    },

    gridCol: {
        height: '100%',
        width: '100%',
    },

    title: {
        fontFamily: 'Roboto, sans-serif',
        color: theme.white,
        fontSize: 40,
        letterSpacing: '3px',
        fontWeight: 700,
        lineHeight: 1.1,

        [theme.fn.smallerThan('sm')]: {
            fontSize: 40,
            lineHeight: 1.2,
        },

        [theme.fn.smallerThan('xs')]: {
            fontSize: 30,
            lineHeight: 1.3,
        },
    },

    description: {
        fontFamily: 'Roboto, sans-serif',
        color: theme.white,
        maxWidth: 600,

        [theme.fn.smallerThan('sm')]: {
            maxWidth: '100%',
            fontSize: theme.fontSizes.md,
        },
    },
}))

export const InformationBanner = () => {
    const { classes } = useStyles()
    const { data } = useQuery(BANER_PRODUCT_PAGE)
    const theme = useMantineTheme()
    const autoplay = useRef(
        Autoplay({
            delay: data?.baner?.data?.attributes?.PredkoscBanera ?? 2000,
        })
    )

    const firstBaner = (
        <div className={classes.fillHeight}>
            <div className={classes.row}>
                <Grid>
                    <Grid.Col span={12} p={'55px'}>
                        <Title className={classes.title}>
                            <Center>
                                {data?.baner?.data?.attributes?.Tytul}
                            </Center>
                        </Title>
                        <Text
                            className={classes.description}
                            size="xl"
                            mt="xl"
                            style={{ color: theme.white }}
                        >
                            <Center>
                                {data?.baner?.data?.attributes?.Podtytul}
                            </Center>
                        </Text>
                    </Grid.Col>
                    <Grid.Col span={4} className={classes.gridCol}>
                        <Center>
                            {/*<Image src="/images/truck.webp" className={classes.imageBanner} mx="auto"/>*/}
                        </Center>
                    </Grid.Col>
                </Grid>
            </div>
        </div>
    )
    return (
        <div className={classes.banner}>
            {data?.baner?.data?.attributes?.WlasneBanery.length > 0 ? (
                <>
                    <Carousel
                        loop
                        plugins={[autoplay.current]}
                        onMouseEnter={autoplay.current.stop}
                        onMouseLeave={autoplay.current.reset}
                    >
                        <Carousel.Slide key="first">
                            {firstBaner}
                        </Carousel.Slide>
                        {data?.baner?.data?.attributes?.WlasneBanery.map(
                            (photo, index) => {
                                return (
                                    <Carousel.Slide key={index}>
                                        <Image
                                            height="250px"
                                            src={`${process.env.NEXT_PUBLIC_STRAPI_UPLOAD_FOLDER}${photo.Zdjecie.data.attributes.url}${'?format=webp'}`}
                                        />
                                    </Carousel.Slide>
                                )
                            }
                        )}
                    </Carousel>
                </>
            ) : (
                <>{firstBaner}</>
            )}
        </div>
    )
}
