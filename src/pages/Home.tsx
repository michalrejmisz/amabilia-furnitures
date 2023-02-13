import {Fragment} from 'react'
import {Center, Container, createStyles, Image, MantineProvider, Title} from '@mantine/core'
import { useViewportSize } from '@mantine/hooks';
import ProductsOffer from "../components/Main/ProductsOffer/ProductsOffer";
import InitialMain from "../components/Main/InitialMain/InitialMain";
import {ContactUsForm} from "../components/Main/ContactForm/ContactUsForm";
import {client, Layout} from "../Layout/Layout";
import type { NextPageWithLayout } from './_app'
// import { getCategories } from '../utils/wordpress';
import { getCategories, getProductsNew } from '../utils/apollo-client';
import {gql, useQuery, TypedDocumentNode} from "@apollo/client";
import {IProduct} from '../interfaces/Products';

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


const Home: NextPageWithLayout = () => {
    const { height: viewPortHeight, width: viewPortWidth } = useViewportSize();
    const { classes } = useStyles({ viewPortHeight, viewPortWidth });
    const { loading, error, data } = useQuery(GET_PRODUCTS, {
        fetchPolicy: 'network-only',
    });
    console.log("-------------LAYOUT")
    console.log(data)
    console.log("-------------LAYOUT")
    // const jsxCategories = categories.map((category) => {
    //     return {category};
    // })

    // const { loading, error, produkty } = useQuery(GET_PRODUCTS);
    // console.log("ProviderT"+produkty);
    // console.log("ProviderT"+error);
    // console.log("ProviderTERROR"+error);
    // console.log("ProviderT"+loading);


    return(
        <Fragment>
                <InitialMain/>
                <ProductsOffer/>
                <ContactUsForm/>
        </Fragment>
    );
};

export default Home;

Home.getLayout = function getLayout(page: React.ReactElement){
    return(
        <Layout>
            {page}
        </Layout>
    );
}





export async function getStaticProps() {
    const products = await getProductsNew()
    console.log(products)
    const categories = await getCategories();
    console.log(categories)
    console.log("test static props")

    return {
        props: {
            categories,
        },
        revalidate: 10, // In seconds
    };
}


