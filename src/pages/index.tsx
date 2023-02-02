import {useState, useEffect} from 'react';
import React from 'react';
import {Layout} from '../components/Layout/Layout';
// import './App.css';
import {MantineProvider, Container} from "@mantine/core";
import {HeaderMenuColored} from "../components/Header/HeaderMenuColored";
import Home from './Home';
import Products from './Products';
import Footer from "../components/Footer/Footer";
import {MobileFooter} from "../components/Footer/MobileFooter";
import type {NextPageWithLayout} from "./_app";


const Index: NextPageWithLayout = () => {
    return (
            <Home/>
        // <MantineProvider
        //     theme={{
        //         primaryColor: 'blue',
        //     }}
        // >
        //     <div className="App">
        //         <main>
        //             {/*<HeaderMenuColored links={links} transparent={scrollTop}/>*/}
        //             {/*<Routes>*/}
        //             <Switch>
        //                 {/*    <Route path="/" element={<Home />}></Route>*/}
        //                 {/*    <Route path="/products" element={<Products />}></Route>*/}
        //             </Switch>
        //             {/*</Routes>*/}
        //             <Footer primaryColor={primaryColor}/>
        //             <MobileFooter/>
        //         </main>
        //     </div>
        // </MantineProvider>
    );
}

export default Index;

Index.getLayout = function getLayout(page: React.ReactElement){
    return(
        <Layout>
            {page}
        </Layout>
    )
}