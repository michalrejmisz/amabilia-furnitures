import { NextPageWithLayout } from './_app'
import { Container, createStyles, Grid } from '@mantine/core'
import { Layout } from '../Layout/Layout'
import { CheckoutStepper } from '../components/Checkout/CheckoutStepper'
import { ParsedUrlQuery } from 'querystring'
import { initializeApollo, addApolloState } from '@/lib/apolloClient'
import { PRODUCTS_ALL } from '@/lib/graphql/products'
import { CheckoutContextProvider } from '@/context/CheckoutContext'
import { ENTIRE_STATIC_CONTENT } from '@/lib/graphql/pagesContent'
import { NextSeo } from 'next-seo'

interface IParams extends ParsedUrlQuery {
    slug: string
}

const useStyles = createStyles((theme) => ({
    wrapper: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: 'calc(100vh - 80px)',
        marginBottom: '50px',
        [theme.fn.smallerThan('sm')]: {
            minHeight: 'calc(100vh - 80px - 64px)',
        },
    },
}))

const Checkout: NextPageWithLayout = () => {
    const { classes } = useStyles()

    return (
        <>
            <NextSeo title="Zakupy | Amabilia" noindex={true} />
            <CheckoutContextProvider>
                <Container size={'xl'} className={classes.wrapper}>
                    <CheckoutStepper />
                </Container>
            </CheckoutContextProvider>
        </>
    )
}

export default Checkout

Checkout.getLayout = function getLayout(page: React.ReactElement) {
    return <Layout>{page}</Layout>
}

export const getServerSideProps = async () => {
    const apolloClient = initializeApollo()

    await apolloClient.query({
        query: PRODUCTS_ALL,
    })

    const { data } = await apolloClient.query({
        query: ENTIRE_STATIC_CONTENT,
    })

    return addApolloState(apolloClient, {
        props: {},
    })
}
