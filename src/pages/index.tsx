import { Fragment } from 'react'
import { createStyles } from '@mantine/core'
import { useViewportSize } from '@mantine/hooks'
import ProductsOffer from '../components/Main/ProductsOffer/ProductsOffer'
import InitialMain from '../components/Main/InitialMain/InitialMain'
import type { NextPageWithLayout } from './_app'
import { gql, useQuery } from '@apollo/client'
import { IProduct } from '../interfaces/Products'
import { initializeApollo, addApolloState } from '../lib/apolloClient'
import { CATEGORIES_ALL, HOME_PAGE_CATEGORIES } from '../lib/graphql/categories'
import { PRODUCTS_ALL } from '../lib/graphql/products'
import { Layout } from '../Layout/Layout'
import { ENTIRE_STATIC_CONTENT } from '../lib/graphql/pagesContent'

interface ViewPortSize {
    viewPortHeight: number
    viewPortWidth: number
}

interface ProductsData {
    products: IProduct[]
}
const useStyles = createStyles(
    (theme, { viewPortHeight, viewPortWidth }: ViewPortSize) => ({})
)

interface NavbarCategoryItem {
    categories: string
}

interface ParentProps {
    children: React.ReactNode
}

const Index: NextPageWithLayout = (props: ParentProps) => {
    const { height: viewPortHeight, width: viewPortWidth } = useViewportSize()
    const { classes } = useStyles({ viewPortHeight, viewPortWidth })

    const { data: pageContent } = useQuery(ENTIRE_STATIC_CONTENT)
    const {
        loading: loadingCategories,
        error: errorCategories,
        data: dataCategories,
        fetchMore: fetchCategories,
        networkStatus: networkCategories,
    } = useQuery(CATEGORIES_ALL)
    const {
        loading: loadingProducts,
        error: errorProducts,
        data: dataProducts,
        fetchMore: fetchProducts,
        networkStatus: networkProducts,
    } = useQuery(PRODUCTS_ALL)

    return (
        <Fragment>
            <InitialMain handleScrollToMail={props.handleScrollToFooter} />
            <ProductsOffer
                brands={
                    pageContent?.naszeMarki?.data?.attributes?.Zdjecia?.data
                }
            />
        </Fragment>
    )
}

export const GET_PRODUCTS = gql`
    query GetProducts {
        produkty {
            edges {
                node {
                    id
                    description
                    slug
                    title
                }
            }
        }
    }
`

export default Index

Index.getLayout = function getLayout(page: React.ReactElement) {
    return <Layout>{page}</Layout>
}

export const getServerSideProps = async () => {
    const apolloClient = initializeApollo()

    const { data } = await apolloClient.query({
        query: CATEGORIES_ALL,
    })

    const { data: debuguje } = await apolloClient.query({
        query: HOME_PAGE_CATEGORIES,
    })

    await apolloClient.query({
        query: PRODUCTS_ALL,
    })

    const test = await apolloClient.query({
        query: ENTIRE_STATIC_CONTENT,
    })

    return addApolloState(apolloClient, {
        props: {},
    })
}
