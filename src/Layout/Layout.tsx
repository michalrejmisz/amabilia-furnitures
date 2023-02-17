import {useState, useEffect} from 'react';
import React from 'react';
import {ReactNode} from 'react';
import {MantineProvider, Container} from "@mantine/core";
import {HeaderMenuColored} from "../components/Header/HeaderMenuColored";
import Footer from "../components/Footer/Footer";
import {MobileFooter} from "../components/Footer/MobileFooter";
import {ApolloProvider, useQuery, gql, ApolloClient, InMemoryCache} from "@apollo/client";
// import {GET_PRODUCTS} from "../utils/apollo-client";
import {LoadingScreen} from "../components/UI/LoadingScreen/LoadingScreen";
// import {Switch} from 'next/router';


const links = [
    {"link": "/", "label": "Home"},
    {"link": "/about", "label": "O nas"},
    {"link": "/map", "label": "Dojazd"},
    {"link": "/products", "label": "Produkty"},
];

type Props = {
    children: React.ReactNode
}

export const client = new ApolloClient({
    uri: "http://www.srv53487.seohost.com.pl/admin/graphql",
    cache: new InMemoryCache(),
});



export const Layout = ({children} : Props) => {
    const [scrollTop, setScrollTop] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const handleScroll = () => {
            if(window.scrollY > 0){
                setScrollTop(false)
            } else {
                setScrollTop(true)
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        // if (document.readyState === 'complete') {
        //     setIsLoading(false)
        // }

        if (typeof window !== 'undefined') {
            setIsLoading(false)
        }
    }, []);


    return(
            <ApolloProvider client={client}>
                <MantineProvider
                    theme={{
                        primaryColor: 'blue',
                    }}
                >
                    <LoadingScreen isLoading={isLoading}>
                        <HeaderMenuColored links={links} transparent={scrollTop}/>
                        {children}
                        <Footer/>
                        <MobileFooter/>
                    </LoadingScreen>
                </MantineProvider>
            </ApolloProvider>
    );
}