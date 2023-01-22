import {Fragment} from 'react'
import {Center, Container, createStyles, Image, MantineProvider, Title} from '@mantine/core'
import { useViewportSize } from '@mantine/hooks';
import ProductsOffer from "../Main/ProductsOffer/ProductsOffer";
import InitialMain from "../Main/InitialMain/InitialMain";

interface ViewPortSize {
    viewPortHeight: number,
    viewPortWidth: number,
}

const useStyles = createStyles((theme, {viewPortHeight, viewPortWidth} : ViewPortSize) => (
    {

}));



const Main = () =>{
    const { height: viewPortHeight, width: viewPortWidth } = useViewportSize();
    const { classes } = useStyles({ viewPortHeight, viewPortWidth });

    return(
        <Fragment>
                <InitialMain/>
                <ProductsOffer/>
        </Fragment>
    );
}

export default Main;