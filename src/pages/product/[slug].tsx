import {NextPageWithLayout} from "../_app";
import {useViewportSize} from "@mantine/hooks";
import {Fragment} from "react";
import {Container, Grid} from "@mantine/core";
import {InformationBanner} from "../../components/Products/InformationBanner/InformationBanner";
import ProductsNavbar from "../../components/Products/Navbar/ProductsNavbar";
import ProductsGrid from "../../components/Products/Grid/ProductsGrid";
import {Layout} from "../../components/Layout/Layout";
import {getCategories} from "../../utils/apollo-client";
import {ICategory} from "../../interfaces/Categories";
import { GetStaticPaths, GetStaticProps } from 'next';
import { ParsedUrlQuery } from 'querystring';


const Product: NextPageWithLayout<{ category : ICategory}> = ({category}) =>{
    const { height: viewPortHeight, width: viewPortWidth } = useViewportSize();
    const { classes } = useStyles({ viewPortHeight, viewPortWidth });

    return(
        <Fragment>
            <Container size={'lg'} className={classes.wrapper}>

            </Container>
        </Fragment>
    );
}

export default Product;

Product.getLayout = function getLayout(page: React.ReactElement){
    return(
        <Layout>
            {page}
        </Layout>
    );
}
