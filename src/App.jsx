import {useState, useEffect} from 'react';
import React from 'react';
import logo from './logo.svg';
import './App.css';
import {MantineProvider, Container} from "@mantine/core";
import {HeaderMenuColored} from "./components/Header/HeaderMenuColored";
import Main from './components/pages/Main';
import {CardsCarousel} from "./components/Main/ProductsOffer/CardCarousel";
import {LeadGrid} from "./components/UI/LeadGrid";
import Footer from "./components/Footer/Footer";
import {MobileFooter} from "./components/Footer/MobileFooter"

const links = [
    {"link": "/contact", "label": "Kontakt"},
    {"link": "/about", "label": "O nas"},
    {"link": "/products", "label": "Produkty"},
    {"link": "/map", "label": "Dojazd"},
];
// {[{"link": "a", "label": "a"}, {"link": "b", "label": "b", "links" : [{"link": "second", "label": "second"}]}]}
function App() {
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


  return (
      <MantineProvider
          theme={{
              primaryColor: 'blue',
          }}
      >
        <div className="App">
            <main>
                <HeaderMenuColored links={links} transparent={scrollTop}/>
                <Main/>
                {/*<Container my="md" color="lime-4">*/}
                    {/*<CardsCarousel/>*/}
                    {/*<LeadGrid/>*/}
                {/*</Container>*/}
                <Footer/>
                <MobileFooter/>
            </main>
        </div>
      </MantineProvider>
  );
}

export default App;
