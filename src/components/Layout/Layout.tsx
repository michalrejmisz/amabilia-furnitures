import {useState, useEffect} from 'react';
import React from 'react';
import {ReactNode} from 'react';
import {MantineProvider, Container} from "@mantine/core";
import {HeaderMenuColored} from "../Header/HeaderMenuColored";
import Footer from "../Footer/Footer";
import {MobileFooter} from "../Footer/MobileFooter";
// import {Switch} from 'next/router';


const links = [
    {"link": "/", "label": "Home"},
    {"link": "/about", "label": "O nas"},
    {"link": "/map", "label": "Dojazd"},
    {"link": "/Products", "label": "Produkty"},
];

type Props = {
    children: React.ReactNode
}


export const Layout = ({children} : Props) => {
    const [scrollTop, setScrollTop] = useState(true);

    useEffect(() => {
        const handleScroll = (event) => {
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


    return(
        <>
            <MantineProvider
                theme={{
                    primaryColor: 'blue',
                }}
            >
                <HeaderMenuColored links={links} transparent={scrollTop}/>
                {children}
                <Footer/>
                <MobileFooter/>
            </MantineProvider>
        </>
    );
}