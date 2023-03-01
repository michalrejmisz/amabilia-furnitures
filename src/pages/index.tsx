// import {useState, useEffect} from 'react';
// import React from 'react';
// import {Layout} from '../Layout/Layout';
// // import './App.css';
// import {MantineProvider, Container} from "@mantine/core";
// import {HeaderMenuColored} from "../components/Header/HeaderMenuColored";
// import Home from './Home';
// // import Products from './products';
// import Footer from "../components/Footer/Footer";
// import {MobileFooter} from "../components/Footer/MobileFooter";
// import type {NextPageWithLayout} from "./_app";
// import {ApolloProvider, useQuery, gql} from "@apollo/client";
// import {addApolloState, initializeApollo} from "../lib/apolloClient";
// import {CATEGORIES_ALL} from "../lib/graphql/categories";
// import {PRODUCTS_ALL} from "../lib/graphql/products";
// import {ENTIRE_STATIC_CONTENT} from "../lib/graphql/pagesContent";
// // import {GET_PRODUCTS} from "../utils/apollo-client";

import {Fragment} from 'react'
import {Center, Container, createStyles, Image, MantineProvider, Title} from '@mantine/core'
import { useViewportSize } from '@mantine/hooks';
import ProductsOffer from "../components/Main/ProductsOffer/ProductsOffer";
import InitialMain from "../components/Main/InitialMain/InitialMain";
import {ContactUsForm} from "../components/Main/ContactForm/ContactUsForm";
import type { NextPageWithLayout } from './_app'
import {gql, useQuery, TypedDocumentNode} from "@apollo/client";
import {IProduct} from '../interfaces/Products';
import { initializeApollo, addApolloState } from "../lib/apolloClient";
import {CATEGORIES_ALL, HOME_PAGE_CATEGORIES} from "../lib/graphql/categories";
import { PRODUCTS_ALL } from "../lib/graphql/products";
import {client, Layout} from "../Layout/Layout";
import {ENTIRE_STATIC_CONTENT} from "../lib/graphql/pagesContent";

interface ViewPortSize {
    viewPortHeight: number,
    viewPortWidth: number,
}

interface ProductsData {
    products: IProduct[];
}
const useStyles = createStyles((theme, {viewPortHeight, viewPortWidth} : ViewPortSize) => (
    {

    }));

interface NavbarCategoryItem {
    categories: string;
}

interface ParentProps {
    children: React.ReactNode;
}






const Index: NextPageWithLayout = (props: ParentProps) => {
    const { height: viewPortHeight, width: viewPortWidth } = useViewportSize();
    const { classes } = useStyles({ viewPortHeight, viewPortWidth });

    const {data: pageContent } = useQuery(ENTIRE_STATIC_CONTENT)
    const { loading: loadingCategories, error: errorCategories, data: dataCategories, fetchMore: fetchCategories, networkStatus: networkCategories } = useQuery(CATEGORIES_ALL);
    const { loading: loadingProducts, error: errorProducts, data: dataProducts, fetchMore: fetchProducts, networkStatus: networkProducts } = useQuery(PRODUCTS_ALL);


    return(
        <Fragment>
            <InitialMain handleScrollToMail={props.handleScrollToFooter}/>
            <ProductsOffer brands={pageContent?.naszeMarki?.data?.attributes?.Zdjecia?.data}/>
            {/*<ContactUsForm/>*/}

            {/*<span>*/}
            {/*    Witajcie! Jesteśmy firmą specjalizującą się w sprzedaży mebli biurowych używanych. Nasza firma została założona z myślą o dostarczeniu wysokiej jakości i funkcjonalnych mebli biurowych, które będą idealnie spełniać potrzeby naszych klientów.*/}
            {/*</span>*/}
            {/*<p>*/}
            {/*    W naszej ofercie znajdują się różnego rodzaju meble biurowe, takie jak biurka, krzesła, szafy, regały, fotele a także wiele innych artykułów, które pozwolą na wyposażenie biura w sposób ergonomiczny i efektywny. Wszystkie nasze meble są dokładnie sprawdzone pod względem jakości i trwałości, co zapewnia naszym klientom pełne zadowolenie z zakupów.*/}
            {/*</p>*/}
            {/*<p>*/}
            {/*    Dzięki temu, że zajmujemy się sprzedażą mebli biurowych używanych, możemy zaoferować naszym klientom nie tylko wysoką jakość produktów, ale także bardzo atrakcyjne ceny. Nasza firma stawia na indywidualne podejście do każdego klienta, co pozwala nam na dopasowanie oferty do jego potrzeb i oczekiwań.*/}
            {/*</p>*/}
            {/*<p>*/}
            {/*    Zapewniamy szybką i profesjonalną obsługę, która pozwoli na zakup mebli biurowych używanych w sposób bezpieczny i wygodny. Dzięki naszemu doświadczeniu i wiedzy na temat mebli biurowych, jesteśmy w stanie doradzić naszym klientom w wyborze najlepszych produktów, które będą idealnie odpowiadać ich potrzebom.*/}
            {/*</p>*/}
            {/*<p>*/}
            {/*    Zapraszamy do zapoznania się z naszą ofertą mebli biurowych używanych oraz do skorzystania z naszych usług. Jesteśmy przekonani, że uda nam się spełnić oczekiwania nawet najbardziej wymagających klientów!*/}
            {/*</p>*/}
        </Fragment>
    );
};

export const GET_PRODUCTS = gql`
    query GetProducts {
        produkty {
            edges {
                node{
                    id
                    description
                    slug
                    title
                }
            }
        }
    }
`;

export default Index;

Index.getLayout = function getLayout(page: React.ReactElement){
    return(
        <Layout>
            {page}
        </Layout>
    )
}


export const getServerSideProps = async () => {
    const apolloClient = initializeApollo()

    const { data } = await apolloClient.query({
        query: CATEGORIES_ALL,
    })

    const {data: debuguje } = await apolloClient.query({
        query: HOME_PAGE_CATEGORIES,
    })

    // data.categories.data.map((category) => console.log(category.attributes.Nazwa))
    await apolloClient.query({
        query: PRODUCTS_ALL,
    })

    const test = await apolloClient.query({
        query: ENTIRE_STATIC_CONTENT,
    })

    
    return addApolloState(apolloClient, {
        props: {

        },
    });
}