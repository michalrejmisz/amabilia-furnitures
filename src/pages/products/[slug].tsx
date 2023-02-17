import {Fragment} from 'react'
import {Center, Container, createStyles, Image, MantineProvider, Title, Grid} from '@mantine/core'
import { useViewportSize } from '@mantine/hooks';
import ProductsNavbar from "../../components/Products/Navbar/ProductsNavbar";
import ProductsGrid from "../../components/Products/Grid/ProductsGrid";
import {InformationBanner} from "../../components/Products/InformationBanner/InformationBanner";
import {Layout} from '../../Layout/Layout';
import type { NextPageWithLayout } from '../_app'
// import Home from "./Home";
import {getCategories, getCategoryBySlug, getProducts, getProductsByCategory} from "../../utils/apollo-client";
import {ICategory} from "../../interfaces/Categories";
import {IProduct} from "../../interfaces/Products";
import { GetStaticPaths, GetStaticProps } from 'next';
import { ParsedUrlQuery } from 'querystring';


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

interface Props{
    categories: ICategory[];
    products: IProduct[];
}


const Products: NextPageWithLayout<Props> = ({categories, products}) => {
    const { height: viewPortHeight, width: viewPortWidth } = useViewportSize();
    const { classes } = useStyles({ viewPortHeight, viewPortWidth });
    console.log("PRODUCTS IN PRODUCTS", products)
    return(
        <Fragment>
                <Container size={'lg'} className={classes.wrapper}>
                    <InformationBanner/>
                    <Grid mt={'20px'}>
                        <Grid.Col span={12} xs={3} sm={3}>
                            <ProductsNavbar categories={categories}/>
                        </Grid.Col>
                        <Grid.Col span={12} xs={9} sm={9}>
                            <ProductsGrid products={products}/>
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


export const getStaticProps: GetStaticProps = async(context) => {
    const { slug } = context.params as IParams
    // const category = await getCategoryBySlug(slug)
    // const categories = await getCategories();

    const categories = [
        {id: "xd1", name: "Kategoria 1", slug: "slug-1", image: ''},
        {id: "xd2", name: "Kategoria 2", slug: "slug-2", image: ''},
        {id: "xd3", name: "Kategoria 2", slug: "slug-3", image: ''},
    ];

    const productsDumb = [
        {id: "1", name: "prod 1", slug: "slug1", title: "Tit", description: "dsc", price: 25, categoryId: "xd1", imagePrimary: [], images: [] },
        {id: "2", name: "prod 1", slug: "slug1", title: "Tit", description: "dsc", price: 25, categoryId: "xd1", imagePrimary: [], images: [] },
        {id: "3", name: "prod 1", slug: "slug1", title: "Tit", description: "dsc", price: 25, categoryId: "xd1", imagePrimary: [], images: [] },
        {id: "4", name: "prod 1", slug: "slug1", title: "Tit", description: "dsc", price: 25, categoryId: "xd1", imagePrimary: [], images: [] },
    ]
    // const productsByCategory = await getProductsByCategory(category)
    return {
        props: {
            slug,
            categories,
            products: productsDumb,
        },
        revalidate: 10, // In seconds
    };
}

export const getStaticPaths: GetStaticPaths = async () => {


    const categories = [
        {id: "xd1", name: "Kategoria 1", slug: "slug-1", image: ''},
        {id: "xd2", name: "Kategoria 2", slug: "slug-2", image: ''},
        {id: "xd3", name: "Kategoria 2", slug: "slug-3", image: ''},
    ];

    const productsDumb = [
        {id: "1", name: "prod 1", slug: "slug1", title: "Tit", description: "dsc", price: 25, categoryId: "xd1", imagePrimary: [], images: [] },
        {id: "2", name: "prod 1", slug: "slug1", title: "Tit", description: "dsc", price: 25, categoryId: "xd1", imagePrimary: [], images: [] },
        {id: "3", name: "prod 1", slug: "slug1", title: "Tit", description: "dsc", price: 25, categoryId: "xd1", imagePrimary: [], images: [] },
        {id: "4", name: "prod 1", slug: "slug1", title: "Tit", description: "dsc", price: 25, categoryId: "xd1", imagePrimary: [], images: [] },
    ]

    // const categories = await getCategories();
    const paths = categories.map((category) => ({
        params: {slug : category.slug}
    }))
    return {
        paths,
        fallback: false,
    }
}