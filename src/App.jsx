import {useState, useEffect} from 'react';
import React from 'react';
import logo from './logo.svg';
import './App.css';
import {MantineProvider, Container} from "@mantine/core";
import {HeaderMenuColored} from "./components/Header/HeaderMenuColored";
import Main from './components/pages/Main';
import {CardsCarousel} from "./components/Main/ProductsOffer/CardCarousel";
import {LeadGrid} from "./components/UI/LeadGrid";

const links = [
    {"link": "/contact", "label": "Kontakt"},
    {"link": "/about", "label": "O nas"},
    {"link": "/products", "label": "Produkty"},
    {"link": "/map", "label": "Dojazd"},
];
// {[{"link": "a", "label": "a"}, {"link": "b", "label": "b", "links" : [{"link": "second", "label": "second"}]}]}
function App() {
    const [scrollTop, setScrollTop] = useState(0);

    useEffect(() => {
        const handleScroll = (event) => {
            setScrollTop(window.scrollY);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);


  return (
      <MantineProvider
          theme={{
              primaryColor: 'lime',
          }}
      >
        <div className="App">
          <HeaderMenuColored links={links}/>
            <main>
                <Main/>
                {/*<Container my="md" color="lime-4">*/}
                    {/*<CardsCarousel/>*/}
                    {/*<LeadGrid/>*/}
                {/*</Container>*/}
            </main>
        </div>
      </MantineProvider>
  );
}

export default App;
