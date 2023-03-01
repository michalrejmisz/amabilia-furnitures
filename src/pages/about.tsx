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
import {Center, createStyles, Image, MantineProvider, Title, Container, Text, Grid, useMantineTheme } from '@mantine/core'
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
import {ABOUT_US_PAGE, ENTIRE_STATIC_CONTENT} from "../lib/graphql/pagesContent";
import { NextSeo } from 'next-seo';
import {IconArrowRoundaboutLeft} from "@tabler/icons";



interface ViewPortSize {
    viewPortHeight: number,
    viewPortWidth: number,
}

interface ProductsData {
    products: IProduct[];
}

interface NavbarCategoryItem {
    categories: string;
}

type DescriptionElementProps = {
    title: String;
    subtitle: String;
    image: String;
    imageSite: String;
}

const useStyles = createStyles((theme) => ({
    grid: {
        padding: '4rem 0',
        [theme.fn.smallerThan('sm')]: {
            padding: '2rem 0',
        }
    },

    descriptionCol: {
        maxWidth: "28rem",
        [theme.fn.smallerThan('sm')]: {
            maxWidth: "100%",
            margin: "0 auto",
            // minHeight: '100%',
            paddingLeft: '2rem',
            paddingRight: '2rem',
        },
    },

    imageCol: {
        marginBottom: '2rem',
        [theme.fn.smallerThan('sm')]: {
            marginBottom: '0.5rem',
        },

    },

    title:{
        maxWidth: '28rem',
        [theme.fn.smallerThan('sm')]: {
            maxWidth: "100%",
        },
    },

    subtitle:{
        maxWidth: '28rem',
            [theme.fn.smallerThan('sm')]: {
            maxWidth: "100%",
        }
    },

}))



const ImageCol = ({ polygon, image, order }: { polygon: string; image: string; order: number }) => {
    const {classes} = useStyles();
    return (
        <Grid.Col span={12} sm={6} orderSm={order} order={1} className={classes.imageCol}>
            <Image
                src={image}
                alt=""
                height={350}
                style={{ clipPath: polygon }}
            />
        </Grid.Col>
    );
};

const DescriptionCol = ({ title, subtitle, order }: { title: string; subtitle: string; order: number}) => {
    const theme = useMantineTheme();
    const { classes } = useStyles();
    return (
        <>
            <Grid.Col sm={6} span={12} style={{ paddingLeft: '2rem' }} orderSm={order} order={2} className={classes.descriptionCol}>
                {/*<Grid>*/}
                    {/*<Grid.Col sm={6}>*/}
                        <div style={{  }} className={classes.title}>
                            <h2
                                style={{
                                    marginBottom: '1rem',
                                    fontSize: '2.5rem',
                                    fontWeight: 'bold',
                                    color: theme.colors[theme.primaryColor][6],
                                }}
                            >
                                {title}
                            </h2>
                        </div>
                    {/*</Grid.Col>*/}

                    {/*<Grid.Col sm={12}>*/}
                        <div style={{  }} className={classes.subtitle}>
                            <Text size="lg" style={{ color: '#6B7280' }}>
                                {subtitle}
                            </Text>
                        </div>
                    {/*</Grid.Col>*/}
                {/*</Grid>*/}
            </Grid.Col>
        </>
    );
};


const DescriptionElement = ({title, subtitle, image, imageSite} : DescriptionElementProps) => {
    const theme = useMantineTheme();
    const {classes} = useStyles()

    let polygon;
    if(imageSite == "lewa"){polygon = 'polygon(0% 0%, 75% 0, 100% 100%, 0% 100%)'}
    if(imageSite == "prawa"){polygon = 'polygon(25% 0, 100% 0, 100% 100%, 0% 100%)'}

    return(
        <>
            <Grid columns={12} className={classes.grid}>
                    <>
                        <ImageCol polygon={polygon} image={image} order={imageSite === 'lewa' ? 1 : 2}/>
                        <DescriptionCol title={title} subtitle={subtitle} order={imageSite === 'lewa' ? 2 : 1}/>
                    </>
            </Grid>
        </>
    )
}

const About: NextPageWithLayout = () => {
    const { height: viewPortHeight, width: viewPortWidth } = useViewportSize();
    const { data } = useQuery(ABOUT_US_PAGE)
    const theme = useMantineTheme();

    return(
        <>
            <NextSeo
                title="Informacje o sklepie | Amabilia-meble.pl "
            />
            <Container size="lg" style={{ paddingBottom: 96 }}>
                <div style={{ display: 'flex', alignItems: 'center', paddingBottom: "75px" }}>
                    <div style={{ flex: 1 }}>
                            <Title order={1} style={{marginBottom: 24, color: theme.colors[theme.primaryColor][6]}}>
                                {data?.aboutus?.data?.attributes?.Tytul ?? "Witajcie w sklepie Amabilia"}
                            </Title>
                        <Text
                            size="lg" style={{ marginBottom: 24, color: '#6B7280', marginRight: 20 }}
                        >
                            {data?.aboutus?.data?.attributes?.Podtytul ?? "Witajcie! Jesteśmy firmą specjalizującą się w sprzedaży mebli biurowych używanych. Nasza firma została założona z myślą o dostarczeniu wysokiej jakości i funkcjonalnych mebli biurowych, które będą idealnie spełniać potrzeby naszych klientów."}
                        </Text>
                    </div>
                    <div style={{ flex: 1 }}>
                        <Image
                            src={`${process.env.NEXT_PUBLIC_STRAPI_UPLOAD_FOLDER}${data?.aboutus?.data?.attributes?.Zdjecie?.data?.attributes?.formats?.small?.url || data?.aboutus?.data?.attributes?.Zdjecie?.data.attributes.url}${"?format=webp"}`}
                            // src="https://images.unsplash.com/photo-1458080767772-b1011d305557?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=1043&amp;q=80"
                            alt=""
                            height={400}
                            style={{ clipPath: 'polygon(0 0, 100% 0%, 100% 80%, 0 100%)' }}
                        />
                    </div>
                </div>

                {data?.aboutus?.data?.attributes?.NowyElementZeZdjeciem?.map((item, index) => (
                    <DescriptionElement
                        key={index}
                        title={item.TytulComponent}
                        subtitle={item.PodtytulComponent}
                        image={`${process.env.NEXT_PUBLIC_STRAPI_UPLOAD_FOLDER}${item?.ZdjecieComponent?.data?.attributes?.formats?.medium?.url || item?.ZdjecieComponent?.data?.attributes?.url}${"?format=webp"}`}
                        imageSite={item.StronaZdjecia ?? ''}
                    />
                ))}

                <Text size="lg" style={{ marginBottom: 24, color: '#6B7280' }}>
                    {data?.aboutus?.data?.attributes?.TekstKoncowy ?? ""}
                </Text>
            </Container>
        </>
    );
};


export default About;

About.getLayout = function getLayout(page: React.ReactElement){
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

    await apolloClient.query({
        query: ABOUT_US_PAGE,
    })

    const {data: debuguje } = await apolloClient.query({
        query: HOME_PAGE_CATEGORIES,
    })

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