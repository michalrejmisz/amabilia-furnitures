import { useState, useEffect } from 'react'
import React from 'react'
import './App.css'
import { MantineProvider, Container } from '@mantine/core'
import { HeaderMenuColored } from './components/Header/HeaderMenuColored'
import Home from './pages/Home'
import Products from './pages/products'
import Footer from './components/Footer/Footer'
import { MobileFooter } from './components/Footer/MobileFooter'
import { Routes, Route } from 'react-router-dom'
import {
    ApolloProvider,
    useQuery,
    gql,
    ApolloClient,
    InMemoryCache,
} from '@apollo/client'
// import {client, GET_PRODUCTS} from "utils/apollo-client";

const links = [
    { link: '/', label: 'Home' },
    { link: '/about', label: 'O nas' },
    { link: '/map', label: 'Dojazd' },
    { link: '/products', label: 'Produkty' },
]

function App() {
    const [scrollTop, setScrollTop] = useState(true)
    const [layoutColor, setLayoutColor] = useState('blue')

    const primaryColor = (color) => {
        setLayoutColor(color)
    }

    useEffect(() => {
        const handleScroll = (event) => {
            if (window.scrollY > 0) {
                setScrollTop(false)
            } else {
                setScrollTop(true)
            }
        }

        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    return (
        <ApolloProvider client={client}>
            <MantineProvider
                theme={{
                    primaryColor: 'blue',
                }}
            >
                <div className="App">
                    <main>
                        <HeaderMenuColored
                            links={links}
                            transparent={scrollTop}
                        />
                        <Routes>
                            <Route path="/" element={<Home />}></Route>
                            <Route
                                path="/products"
                                element={<Products />}
                            ></Route>
                        </Routes>
                        <Footer primaryColor={primaryColor} />
                        <MobileFooter />
                    </main>
                </div>
            </MantineProvider>
        </ApolloProvider>
    )
}

export default App
