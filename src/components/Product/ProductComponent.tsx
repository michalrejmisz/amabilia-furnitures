import { IProduct } from '../../interfaces/Products'
import React from 'react'
import {
    Grid,
    Image,
    Title,
    Paper,
    Button,
    Group,
    createStyles,
    useMantineTheme,
} from '@mantine/core'
import { useState, useCallback } from 'react'
import { CartCounterButton } from '@/components/Product/UI/CartCounterButton'
import { Description } from '@/components/Product/Description'
import { useShoppingCart } from '@/context/ShoppingCartContext'
import { Carousel } from '@mantine/carousel'
import { Loader } from '@mantine/core'
import debounce from 'lodash/debounce'

const useStyles = createStyles((theme) => ({
    wrapper: {
        marginTop: '50px',
    },

    imagesColumn: {
        margin: '0 auto',
        alignItems: 'center',
        textAlign: 'center',
    },

    description: {
        marginTop: '25px',
        textAlign: 'left',
        borderBottom: `${theme.colors[theme.primaryColor][2]} 1px solid`,
        borderRadius: 0,
        paddingBottom: '10px',
    },

    descriptionWrapper: {
        marginTop: '40px',
        marginLeft: '50px',
        marginRight: '50px',
        [theme.fn.smallerThan('sm')]: {
            marginLeft: '20px',
            marginRight: '20px',
        },

        '@media not all and (min-width: 365px)': {
            marginLeft: '0px',
            marginRight: '0px',
        },
    },

    primaryImageWrapper: {
        padding: '3px',
        width: '100%',
        minHeight: '60vh',
        maxHeight: '60vh',
        margin: '0 auto',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

        border: `${theme.colors[theme.primaryColor][2]} 1px solid`,
        [theme.fn.smallerThan('sm')]: {
            minHeight: '60vh',
            maxHeight: '60vh',
            display: 'flex',
            width: '100%',
        },
    },

    image: {
        width: '100%',
        height: 'auto',
        objectFit: 'contain',
    },

    text: {
        marginTop: '10px',
    },

    thumbnails: {
        display: 'flex',
        justifyContent: 'center',
        textAlign: 'center',
        margin: '0 auto',
        [theme.fn.smallerThan('sm')]: {
            display: 'flex',
            width: 'auto',
            height: 'auto',
        },
    },

    thumbnail: {
        padding: '3px',
        margin: '5px',
        float: 'left',
        width: '100px',
        minWidth: '100px',
        maxWidth: '100px',
        maxHeight: '100px',
        height: '100px',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        border: `${theme.colors[theme.primaryColor][2]} 1px solid`,
    },

    cartButton: {
        height: '60px',
        width: '200px',
        padding: theme.spacing.xs,
        margin: theme.spacing.xs,
        borderRadius: theme.radius.md,
        [theme.fn.smallerThan('sm')]: {
            padding: '0',
            margin: '0',
            marginLeft: '10px',
            height: '50px',
        },

        '@media not all and (min-width: 400px)': {
            marginLeft: '10px',
            width: '170px',
        },
    },
}))

interface ImageSrc {
    imgLink: string
}

export const ProductComponent: React.FC<{ product: IProduct }> = ({
    product,
}) => {
    const { classes } = useStyles()
    const { increaseCartQuantityByNumber } = useShoppingCart()
    const [isLoaded, setImageIsLoaded] = useState(false)
    const [cartCounter, setCartCounter] = useState(1)
    const theme = useMantineTheme()
    const thumb =
        process.env.NEXT_PUBLIC_STRAPI_UPLOAD_FOLDER +
        '/uploads/no-thumb.png?format=webp'
    let mediaArray: { media: string; thumb: string }[] = []

    const handleCounterChange = (newValue) => {
        setCartCounter(newValue)
    }

    const handleImageLoad = useCallback(
        debounce(() => {
            setImageIsLoaded(true)
        }, 100),
        []
    )

    // Create thumbnails
    if (product?.imagePrimary?.mediaItemUrl != null) {
        let thumb = product?.imagePrimary?.mediaItemUrl
        let mediaItem = product?.imagePrimary?.mediaItemUrl
        if (!(product?.imagePrimary?.thumbnailUrl === 'null')) {
            thumb = product.imagePrimary?.thumbnailUrl
        }
        mediaArray = [{ media: mediaItem, thumb: thumb }, ...mediaArray]
    }

    if (product.images != null) {
        product?.images?.map((img) => {
            let thumb = img.mediaItemUrl
            let mediaItem = img.mediaItemUrl
            if (!(img.thumbnailUrl === 'null')) {
                thumb = img.thumbnailUrl
            }
            mediaArray = [...mediaArray, { media: mediaItem, thumb: thumb }]
        })
    }
    if (mediaArray.length === 0) {
        mediaArray = [{ media: thumb, thumb: thumb }]
    }

    const [primaryImage, setPrimaryImage] = useState(mediaArray[0].media)
    const handlePrimaryPhotoChange = (value: string) => {
        setPrimaryImage(value)
    }
    const thumbnails = mediaArray.map((image, index) => {
        return (
            <div className={classes.thumbnail} key={index}>
                <Carousel.Slide
                    style={{ display: 'flex', flexDirection: 'row' }}
                >
                    <Image
                        src={`${image.thumb}`}
                        onClick={() => handlePrimaryPhotoChange(image.media)}
                        alt="thumbnail"
                        fit="fill"
                        width="100%"
                        height="100%"
                    />
                </Carousel.Slide>
            </div>
        )
    })
    // End of thumbnails

    return (
        <div>
            <Grid>
                <Grid.Col
                    span={12}
                    xs={12}
                    sm={12}
                    md={6}
                    className={classes.imagesColumn}
                >
                    <div className={classes.thumbnails}>
                        <div className={classes.primaryImageWrapper}>
                            {!isLoaded && (
                                <Loader
                                    size="xl"
                                    color={theme.colors[theme.primaryColor][6]}
                                />
                            )}
                            <Image
                                src={primaryImage}
                                style={{ display: isLoaded ? 'block' : 'none' }}
                                alt={
                                    product?.imagePrimary?.altText ??
                                    product?.title
                                }
                                className={classes.image}
                                onLoad={handleImageLoad}
                            />
                        </div>
                    </div>
                    <Carousel className={classes.thumbnails} align="start">
                        {thumbnails}
                    </Carousel>
                </Grid.Col>
                <Grid.Col span={12} xs={12} sm={12} md={6}>
                    <Paper className={classes.descriptionWrapper}>
                        <Paper className={classes.description}>
                            <Title color={theme.colors[theme.primaryColor][6]}>
                                {product.title}
                            </Title>
                            <Title
                                color={theme.colors[theme.primaryColor][3]}
                                order={2}
                            >
                                {product.price} zł
                            </Title>
                        </Paper>
                        <Paper mt={'30px'}>
                            <Group style={{ display: 'flex', gap: '0px' }}>
                                <CartCounterButton
                                    count={cartCounter}
                                    onChange={handleCounterChange}
                                />
                                <Button
                                    uppercase={true}
                                    className={classes.cartButton}
                                    onClick={() =>
                                        increaseCartQuantityByNumber(
                                            product.slug,
                                            cartCounter,
                                            product.price
                                        )
                                    }
                                >
                                    Dodaj do koszyka
                                </Button>
                            </Group>
                        </Paper>
                        <Paper mt={'50px'}>
                            <Description
                                dimensions={product.dimensions}
                                description={product.description}
                            />
                        </Paper>
                    </Paper>
                </Grid.Col>
            </Grid>
        </div>
    )
}
