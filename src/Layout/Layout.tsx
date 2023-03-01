import {useState, useEffect} from 'react';
import React, {useRef, createContext} from 'react';
import {ReactNode} from 'react';
import {MantineProvider, Container, useMantineTheme} from "@mantine/core";
import {HeaderMenuColored} from "@/components/Header/HeaderMenuColored";
import Footer from "../components/Footer/Footer";
import {MobileFooter} from "../components/Footer/MobileFooter";
import {ApolloProvider, useQuery, gql, ApolloClient, InMemoryCache} from "@apollo/client";
// import {GET_PRODUCTS} from "../utils/apollo-client";
import {LoadingScreen} from "../components/UI/LoadingScreen/LoadingScreen";
import {ShoppingCartProvider} from "@/context/ShoppingCartContext";
import {SideCart} from "@/components/SideCart/SideCart";
import {useShoppingCart} from "@/context/ShoppingCartContext";
// import {Switch} from 'next/router';
import CookieConsent from "react-cookie-consent";
import {ENTIRE_STATIC_CONTENT} from "@/lib/graphql/pagesContent";



type Props = {
    children: React.ReactNode
}


export const Layout = ({children} : Props) => {
    const theme = useMantineTheme();
    const [scrollTop, setScrollTop] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const {data: menu } = useQuery(ENTIRE_STATIC_CONTENT)
    const [isCartVisible, setIsCartVisible] = useState(false);

    const handleCartClick = () => {
        setIsCartVisible(!isCartVisible)
    }

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


    const footerRef = useRef(null); // Create a ref
    const mapRef = useRef(null); // Create a ref
    const handleFooterClick = () => {
        if (footerRef.current) {
            footerRef.current.scrollIntoView({ behavior: 'smooth' }); // Use the ref to get the DOM node and scroll to it
        }
    };

    const handleMapClick = () => {
        if (mapRef.current) {
            mapRef.current.scrollIntoView({ behavior: 'smooth' }); // Use the ref to get the DOM node and scroll to it
        }
    };

    const links = [
        {"link": "/", "label": "Home"},
        {"link": "/about", "label": "O nas"},
        {"link": () => handleMapClick(), "label": "Dojazd"},
        {"link": "/products/category/"+ menu?.stronaTytulowaZdjecieBiurkaInformacje?.data?.attributes?.kat?.data?.attributes?.Link, "label": "Produkty"},
    ];

    return(
        <MantineProvider
            theme={{
                primaryColor: 'blue',
                breakpoints: {
                    xs: 576,
                    sm: 768,
                    md: 992,
                    lg: 1200,
                    xl: 1400,
                },
            }}
        >
                <LoadingScreen isLoading={isLoading}>
                    <HeaderMenuColored
                        links={links}
                        transparent={scrollTop}
                        onClickCart={handleCartClick}
                        onClickToFooter={handleFooterClick}
                        onClickToMap={handleMapClick}
                    />
                    <SideCart opened={isCartVisible}/>
                        {React.Children.map(children, (child) => {
                            return React.cloneElement(child, { handleScrollToFooter: handleFooterClick });
                        })}
                        {/*{children}*/}
                    <Footer ref={footerRef} mapRef={mapRef}/>
                    <CookieConsent
                        buttonText="Rozumiem"
                        style={{ background: theme.colors[theme.primaryColor][9] }}
                        buttonStyle={{ color: theme.white, fontSize: "13px", backgroundColor: theme.colors[theme.primaryColor][4] }}

                    >
                        Korzystając z naszej strony wyrażasz zgodę na wykorzystywanie przez nas plików cookies. Możesz określić warunki przechowywania lub dostępu do plików cookies w Twojej przeglądarce.
                    </CookieConsent>
                    <MobileFooter/>
                </LoadingScreen>
        </MantineProvider>
    );
}