import { NextPageWithLayout } from '../_app'
import { useViewportSize } from '@mantine/hooks'
import { Container, createStyles } from '@mantine/core'
import { Layout } from '../../Layout/Layout'
import { ICategory } from '../../interfaces/Categories'
import { IProduct } from '../../interfaces/Products'
import { ProductComponent } from '../../components/Product/ProductComponent'
import { GetServerSideProps } from 'next'
import { ParsedUrlQuery } from 'querystring'
import { initializeApollo, addApolloState } from '@/lib/apolloClient'
import { PRODUCT_BY_SLUG, PRODUCTS_ALL } from '@/lib/graphql/products'
import { NextSeo, ProductJsonLd } from 'next-seo'

interface ViewPortSize {
    viewPortHeight: number
    viewPortWidth: number
}

interface IParams extends ParsedUrlQuery {
    slug: string
}

const useStyles = createStyles(
    (theme, { viewPortHeight, viewPortWidth }: ViewPortSize) => ({
        wrapper: {
            minHeight: viewPortHeight - 80,
        },
    })
)

const Product: NextPageWithLayout<{
    category: ICategory
    product: IProduct
}> = ({ category, product }) => {
    const { height: viewPortHeight, width: viewPortWidth } = useViewportSize()
    const { classes } = useStyles({ viewPortHeight, viewPortWidth })

    let otherImages = null
    otherImages = product?.attributes?.Zdjecia?.data?.map((img) => {
        let thumbnailUrl = null
        thumbnailUrl =
            process.env.NEXT_PUBLIC_STRAPI_UPLOAD_FOLDER +
            (img.attributes?.formats?.thumbnail?.url
                ? img.attributes?.formats?.thumbnail?.url
                : img.attributes?.url || '/uploads/no-thumb.png') +
            '?format=webp'
        let mediaItemUrl =
            process.env.NEXT_PUBLIC_STRAPI_UPLOAD_FOLDER +
            (img.attributes?.formats?.large
                ? img.attributes.formats.large.url
                : img.attributes?.url || '/uploads/no-thumb.png') +
            '?format=webp'
        return {
            mediaItemUrl,
            thumbnailUrl,
        }
    })

    let imageThumbnail = product?.imagePrimary?.thumbnailUrl
    let primaryMediaItemUrl = `${process.env.NEXT_PUBLIC_STRAPI_UPLOAD_FOLDER}${product?.attributes?.Zdjecie_glowne?.data?.attributes?.formats?.large?.url ? product?.attributes?.Zdjecie_glowne?.data?.attributes?.formats?.large?.url : product?.attributes?.Zdjecie_glowne?.data?.attributes?.url || '/uploads/no-thumb.png'}${'?format=webp'}`

    return (
        <>
            <NextSeo
                title={`${product?.attributes?.Nazwa ?? ''} | Amabilia-meble.pl`}
                description={`${product?.attributes?.Opis ?? ''} > Meble poleasingowe w niskiej cenie. Zapewniamy wysoką jakość.`}
                canonical={`https://amabilia-meble.pl/product/${product?.attributes?.Link}`}
                openGraph={{
                    url: `https://amabilia-meble.pl/product/${product?.attributes?.Link}`,
                    title: `${product?.attributes?.Nazwa ?? ''} | Amabilia-meble.pl`,
                    description: `${product?.attributes?.Opis ?? ''} > Meble poleasingowe w niskiej cenie. Zapewniamy wysoką jakość.`,
                    images: [
                        {
                            url: primaryMediaItemUrl,
                            alt: product?.attributes?.Nazwa ?? '',
                            type: 'image/webp',
                        },
                    ],
                }}
            />
            <ProductJsonLd
                productName={product?.attributes?.Nazwa ?? ''}
                description={product?.attributes?.Opis ?? ''}
                images={[primaryMediaItemUrl]}
                offers={[
                    {
                        price: product?.attributes?.Cena,
                        priceCurrency: 'PLN',
                        itemCondition: 'UsedCondition',
                        availability: 'InStock',
                        url: `https://amabilia-meble.pl/product/${product?.attributes?.Link}`,
                    },
                ]}
            />
            <Container size={'xl'} mt={'50px'} className={classes.wrapper}>
                <ProductComponent
                    product={{
                        title: product?.attributes?.Nazwa,
                        price: product?.attributes?.Cena,
                        slug: product?.attributes?.Link,
                        description: product.attributes?.Opis ?? null,
                        dimensions: product.attributes?.Wymiary ?? null,
                        imagePrimary: {
                            mediaItemUrl: `${process.env.NEXT_PUBLIC_STRAPI_UPLOAD_FOLDER}${product?.attributes?.Zdjecie_glowne?.data?.attributes?.formats?.large?.url ? product?.attributes?.Zdjecie_glowne?.data?.attributes?.formats?.large?.url : product?.attributes?.Zdjecie_glowne?.data?.attributes?.url || '/uploads/no-thumb.png'}${'?format=webp'}`,
                            thumbnailUrl: `${process.env.NEXT_PUBLIC_STRAPI_UPLOAD_FOLDER}${product?.attributes?.Zdjecie_glowne?.data?.attributes?.formats?.thumbnail?.url ? product?.attributes?.Zdjecie_glowne?.data?.attributes?.formats?.thumbnail?.url + '?format=webp' : product?.attributes?.Zdjecie_glowne?.data?.attributes?.url || '/uploads/no-thumb.png'}`,
                        },

                        images: [...otherImages],
                    }}
                />
            </Container>
        </>
    )
}

export default Product

Product.getLayout = function getLayout(page: React.ReactElement) {
    return <Layout>{page}</Layout>
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { slug } = context.params as IParams
    const apolloClient = initializeApollo()
    const { data: product2 } = await apolloClient.query({
        query: PRODUCTS_ALL,
    })

    console.log('get statis pathssd')
    const urls = product2.produkties.data.map((item) => {
        return {
            loc: `https://amabilia-meble.pl/product/${item.attributes.Link}`,
            lastmod: new Date().toISOString(),
        }
    })

    const { data, error, errors } = await apolloClient.query({
        query: PRODUCT_BY_SLUG,
        variables: { slug: slug },
    })

    const product = data.produkties.data[0]
    const images = product?.attributes?.Zdjecia?.data?.map((img) => {
        return {
            mediaItemUrl:
                process.env.NEXT_PUBLIC_STRAPI_UPLOAD_FOLDER +
                img.attributes.url,
        }
    })

    return addApolloState(apolloClient, {
        props: {
            slug,
            product: data.produkties.data[0],
        },
    })
}
