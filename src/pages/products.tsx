import {Fragment} from 'react'
import {Center, Container, createStyles, Image, MantineProvider, Title, Grid} from '@mantine/core'
import { useViewportSize } from '@mantine/hooks';
import ProductsNavbar from "../components/Products/Navbar/ProductsNavbar";
import ProductsGrid from "../components/Products/Grid/ProductsGrid";
import {InformationBanner} from "../components/Products/InformationBanner/InformationBanner";
import {Layout} from '../components/Layout/Layout';
import type { NextPageWithLayout } from './_app'
import Home from "./Home";
import {getCategories} from "../utils/apollo-client";
import {ICategory} from "../interfaces/Categories";
import { GetStaticPaths, GetStaticProps } from 'next';
import {ParsedUrlQuery} from "querystring";


interface IParams extends ParsedUrlQuery {
    slug: string
}

interface ViewPortSize {
    viewPortHeight: number,
    viewPortWidth: number,
}

const useStyles = createStyles((theme, {viewPortHeight, viewPortWidth} : ViewPortSize) => ({
    wrapper: {
        minHeight: viewPortHeight - 80,
    }
}));


const Products: NextPageWithLayout<{ categories : ICategory[]}> = ({categories}) =>{
    console.log("Inside products")
    console.log(categories)
    console.log("-----")
    const { height: viewPortHeight, width: viewPortWidth } = useViewportSize();
    const { classes } = useStyles({ viewPortHeight, viewPortWidth });

    return(
        <Fragment>
                <Container size={'lg'} className={classes.wrapper}>
                    <InformationBanner/>
                    <Grid mt={'20px'}>
                        <Grid.Col span={12} xs={3} sm={3}>
                            <ProductsNavbar categories={categories}/>
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

Products.getLayout = function getLayout(page: React.ReactElement){
    return(
        <Layout>
            {page}
        </Layout>
    );
}

//
// export async function getStaticProps() {
//     const categories = await getCategories();
//
//     return {
//         props: {
//             categories,
//         },
//         revalidate: 10, // In seconds
//     };
// }



export const getStaticProps: GetStaticProps = async(context) => {
    // const { slug } = context.params as IParams
    console.log("------------SLUGUS--------------")
    // console.log(slug)
    const categories = await getCategories();
    console.log(categories)
    return {
        props: {
            categories,
        },
        revalidate: 10, // In seconds
    };
}


export async function getStaticPath() {
    console.log("Sciezka")
    console.log(paths)
    return {
        fallback: 'blocking',
    }
}
