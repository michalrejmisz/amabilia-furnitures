import { Fragment } from 'react'
import { createStyles } from '@mantine/core'
import { useViewportSize } from '@mantine/hooks'
import ProductsOffer from '../components/Main/ProductsOffer/ProductsOffer'
import InitialMain from '../components/Main/InitialMain/InitialMain'
import { ContactUsForm } from '../components/Main/ContactForm/ContactUsForm'
import { Layout } from '../Layout/Layout'
import type { NextPageWithLayout } from './_app'
import { gql, useQuery } from '@apollo/client'
import { IProduct } from '../interfaces/Products'

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

const Home: NextPageWithLayout = () => {
    const { height: viewPortHeight, width: viewPortWidth } = useViewportSize()
    const { classes } = useStyles({ viewPortHeight, viewPortWidth })
    const { loading, error, data } = useQuery(GET_PRODUCTS, {
        fetchPolicy: 'network-only',
    })
    return (
        <Fragment>
            <InitialMain />
            <ProductsOffer />
            <ContactUsForm />
        </Fragment>
    )
}

export default Home

Home.getLayout = function getLayout(page: React.ReactElement) {
    return <Layout>{page}</Layout>
}

export async function getStaticProps() {
    return {
        props: {},
        revalidate: 10,
    }
}
