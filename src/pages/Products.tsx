import {Fragment} from 'react'
import {Center, Container, createStyles, Image, MantineProvider, Title, Grid} from '@mantine/core'
import { useViewportSize } from '@mantine/hooks';
import ProductsNavbar from "../components/Products/Navbar/ProductsNavbar";
import ProductsGrid from "../components/Products/Grid/ProductsGrid";
import {InformationBanner} from "../components/Products/InformationBanner/InformationBanner";

interface ViewPortSize {
    viewPortHeight: number,
    viewPortWidth: number,
}

const useStyles = createStyles((theme, {viewPortHeight, viewPortWidth} : ViewPortSize) => ({
    wrapper: {
        minHeight: viewPortHeight - 80,
    }
}));



const Products = () =>{
    const { height: viewPortHeight, width: viewPortWidth } = useViewportSize();
    const { classes } = useStyles({ viewPortHeight, viewPortWidth });

    return(
        <Fragment>
            <Container size={'lg'} className={classes.wrapper}>
                <InformationBanner/>
                <Grid mt={'20px'}>
                    <Grid.Col span={12} xs={3} sm={3}>
                        <ProductsNavbar/>
                    </Grid.Col>
                    <Grid.Col span={12} xs={9} sm={9}>
                        <ProductsGrid/>
                    </Grid.Col>
                </Grid>
            </Container>
        </Fragment>
    );
}

export default Products;