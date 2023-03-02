import { Fragment, useState } from 'react'
import { Container, createStyles, Grid } from '@mantine/core'
import { useViewportSize } from '@mantine/hooks'
import ProductsNavbar from '@/components/Products/Navbar/ProductsNavbar'
import ProductsGrid from '@/components/Products/Grid/ProductsGrid'
import { InformationBanner } from '@/components/Products/InformationBanner/InformationBanner'
import type { NextPageWithLayout } from '@/_app'
import { ICategory } from '@/interfaces/Categories'
import { IProduct } from '@/interfaces/Products'
import { GetServerSideProps } from 'next'
import { ParsedUrlQuery } from 'querystring'
import { Layout } from '@/Layout/Layout'
import { initializeApollo, addApolloState } from '@/lib/apolloClient'
import { CATEGORIES_ALL } from '@/lib/graphql/categories'
import {
    PRODUCTS_BY_CATEGORY,
    PRODUCTS_BY_SPECIAL_CATEGORY,
} from '@/lib/graphql/products'
import { GET_PRODUCTS } from '@/pages'

interface IParams extends ParsedUrlQuery {
    slug: string
}

interface PageProps {
    data: string
}

interface ViewPortSize {
    viewPortHeight: number
    viewPortWidth: number
}

const useStyles = createStyles(
    (theme, { viewPortHeight, viewPortWidth }: ViewPortSize) => ({
        wrapper: {
            minHeight: viewPortHeight - 80,
        },
    })
)

interface Props {
    categories: ICategory[]
    products: IProduct[]
    slug: string
    data: any
}

const Products: NextPageWithLayout<Props> = ({ categories, slug, data }) => {
    const { height: viewPortHeight, width: viewPortWidth } = useViewportSize()
    const { classes } = useStyles({ viewPortHeight, viewPortWidth })
    const [searchItems, setSearchItems] = useState()
    function handleSearchItems(arg: string) {
        setSearchItems(arg)
    }

    return (
        <Fragment>
            <Container size={'lg'} className={classes.wrapper}>
                <InformationBanner />
                <Grid mt={'20px'}>
                    <Grid.Col span={12} xs={3} sm={3}>
                        <ProductsNavbar
                            categories={categories}
                            currentSlug={slug}
                        />
                    </Grid.Col>
                    <Grid.Col span={12} xs={9} sm={9}>
                        <ProductsGrid
                            data={data}
                            handleSearchBar={handleSearchItems}
                        />
                    </Grid.Col>
                </Grid>
            </Container>
        </Fragment>
    )
}

export default Products

Products.getLayout = function getLayout(page: React.ReactElement) {
    return <Layout>{page}</Layout>
}

export const getServerSideProps: GetServerSideProps<Props> = async (
    context
) => {
    const { slug } = context.query
    const pathname = context.resolvedUrl.split('?')[0]
    const categoryType = pathname.split('/')[2]
    const apolloClient = initializeApollo()

    let query
    let variables
    switch (categoryType) {
        case 'category':
            query = PRODUCTS_BY_CATEGORY
            variables = {
                filters: {
                    kategoria: { Link: { eq: slug } },
                },
            }
            break
        case 'special-category':
            query = PRODUCTS_BY_SPECIAL_CATEGORY
            variables = { link: slug }
            break
        default:
            query = PRODUCTS_BY_CATEGORY
            break
    }

    await apolloClient.query({
        query: CATEGORIES_ALL,
    })

    const { data, error, errors } = await apolloClient.query({
        query: query,
        variables: variables,
    })

    let universalData = data
    if (categoryType === 'special-category') {
        universalData =
            data?.wlasnaKategorias.data[0].attributes.StworzKategorie.produkty
                .data
    }
    if (categoryType === 'category') {
        universalData = data?.produkties?.data
    }

    return addApolloState(apolloClient, {
        props: {
            slug,
            data: universalData,
        },
    })
}
