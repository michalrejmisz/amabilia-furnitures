import {NextPageWithLayout} from "./_app";
import {useViewportSize} from "@mantine/hooks";
import {Fragment} from "react";
import {Container, createStyles, Grid} from "@mantine/core";
import {Layout} from "../Layout/Layout";
import {CheckoutStepper} from "../components/Checkout/CheckoutStepper"
import { ParsedUrlQuery } from 'querystring';
import { initializeApollo, addApolloState } from "@/lib/apolloClient";
import {useRouter} from "next/router";
import {useContext, createContext} from 'react';
import {PRODUCT_BY_SLUG, PRODUCTS_ALL} from "@/lib/graphql/products";
import {ICategory} from "../interfaces/Categories";
import {IProduct} from "../interfaces/Products";
// import {ProductComponent}  from '../../components/Product/ProductComponent';
import {GetServerSideProps} from 'next';
import {CheckoutContextProvider} from "@/context/CheckoutContext";
import {ENTIRE_STATIC_CONTENT} from "@/lib/graphql/pagesContent";
import { NextSeo } from 'next-seo';


interface IParams extends ParsedUrlQuery {
    slug: string
}


const useStyles = createStyles((theme) => ({
    wrapper: {
        display: "flex",
        flexDirection: "column",
        minHeight: "calc(100vh - 80px)",
        marginBottom: "50px",
        [theme.fn.smallerThan('sm')]: {
            minHeight: 'calc(100vh - 80px - 64px)',
        },
    },
}));


const Checkout: NextPageWithLayout = () => {
    const { classes } = useStyles();
    // const product = useContext(Context) as IProduct;

    return(
        <>
            <NextSeo
                title="Zakupy | Amabilia"
                noindex={true}
            />
            <CheckoutContextProvider>
                <Container size={'xl'} className={classes.wrapper}>
                    <CheckoutStepper/>
                </Container>
            </CheckoutContextProvider>
        </>
    );
}

export default Checkout;

Checkout.getLayout = function getLayout(page: React.ReactElement){
    return(
        <Layout>
            {page}
        </Layout>
    );
}

export const getServerSideProps = async () => {
    const apolloClient = initializeApollo()

    await apolloClient.query({
        query: PRODUCTS_ALL,
    })

    const {data} = await apolloClient.query({
        query: ENTIRE_STATIC_CONTENT,
    })

    return addApolloState(apolloClient, {
        props: {

        },
    });
}
