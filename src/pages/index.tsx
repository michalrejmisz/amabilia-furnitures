import {useState, useEffect} from 'react';
import React from 'react';
import {Layout} from '../Layout/Layout';
// import './App.css';
import {MantineProvider, Container} from "@mantine/core";
import {HeaderMenuColored} from "../components/Header/HeaderMenuColored";
import Home from './Home';
// import Products from './products';
import Footer from "../components/Footer/Footer";
import {MobileFooter} from "../components/Footer/MobileFooter";
import type {NextPageWithLayout} from "./_app";
import {ApolloProvider, useQuery, gql} from "@apollo/client";
// import {GET_PRODUCTS} from "../utils/apollo-client";

const Index: NextPageWithLayout = () => {
    return (
        <Home/>
    );
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

export default Index;

Index.getLayout = function getLayout(page: React.ReactElement){
    return(
        <Layout>
            {page}
        </Layout>
    )
}