import {NextPageWithLayout} from "../_app";
import {useViewportSize} from "@mantine/hooks";
import {Fragment} from "react";
import {Container, createStyles, Grid} from "@mantine/core";
import {Layout} from "../../Layout/Layout";
import {ICategory} from "../../interfaces/Categories";
import {IProduct} from "../../interfaces/Products";
import {ProductComponent}  from '../../components/Product/ProductComponent';
import { GetStaticPaths, GetStaticProps } from 'next';
import { ParsedUrlQuery } from 'querystring';
import {useRouter} from "next/router";
import {useContext, createContext} from 'react';
import {
    getCategories,
    getCategoryBySlug,
    getProductsByCategory,
    getProductBySlug,
    getProducts
} from "../../utils/apollo-client";

interface ViewPortSize {
    viewPortHeight: number,
    viewPortWidth: number,
}

interface IParams extends ParsedUrlQuery {
    slug: string
}


const useStyles = createStyles((theme, {viewPortHeight, viewPortWidth} : ViewPortSize) => ({
    wrapper: {
        minHeight: viewPortHeight - 80,
    }
}));


const Product: NextPageWithLayout<{ category : ICategory, product : IProduct}> = ({category, product}) =>{
    // const product = useContext(Context) as IProduct;

    const { height: viewPortHeight, width: viewPortWidth } = useViewportSize();
    const { classes } = useStyles({ viewPortHeight, viewPortWidth });
    console.log("-------INSIDE-------")
    console.log(product)
    console.log(product.title)
    console.log("-------")
    // console.log("TEST"+product);

    return(
        <Fragment>
            <Container size={'lg'} mt={"50px"} className={classes.wrapper} >
                <ProductComponent product={product}/>
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

export const getStaticProps: GetStaticProps = async(context) => {
    const { slug } = context.params as IParams
    // const product = await getProductBySlug(slug);
    // const category = await getCategoryBySlug(slug)
    // const categories = await getCategories();
    console.log("-------------------")
    // console.log(product);
    console.log("-------------------")

    const categories = [
        {id: "xd1", name: "Kategoria 1", slug: "slug-1", image: ''},
        {id: "xd2", name: "Kategoria 2", slug: "slug-2", image: ''},
        {id: "xd3", name: "Kategoria 2", slug: "slug-3", image: ''},
    ];

    const product = [
        {id: "1", name: "prod 1", slug: "slug1", title: "Tit", description: "dsc", price: 25, categoryId: "xd1", imagePrimary: [], images: [] },
        {id: "2", name: "prod 1", slug: "slug1", title: "Tit", description: "dsc", price: 25, categoryId: "xd1", imagePrimary: [], images: [] },
        {id: "3", name: "prod 1", slug: "slug1", title: "Tit", description: "dsc", price: 25, categoryId: "xd1", imagePrimary: [], images: [] },
        {id: "4", name: "prod 1", slug: "slug1", title: "Tit", description: "dsc", price: 25, categoryId: "xd1", imagePrimary: [], images: [] },
    ]

    return {
        props: {
            slug,
            categories,
            product: product,
        },
        revalidate: 10, // In seconds
    };
}

export const getStaticPaths: GetStaticPaths = async () => {
    // const products = await getProducts();
    // const paths = products.map((product) => ({
    //     params: {slug : product.slug}
    // }))


    const categories = [
        {id: "xd1", name: "Kategoria 1", slug: "slug-1", image: ''},
        {id: "xd2", name: "Kategoria 2", slug: "slug-2", image: ''},
        {id: "xd3", name: "Kategoria 2", slug: "slug-3", image: ''},
    ];

    const products = [
        {id: "1", name: "prod 1", slug: "slug1", title: "Tit", description: "dsc", price: 25, categoryId: "xd1", imagePrimary: [], images: [] },
        {id: "2", name: "prod 1", slug: "slug1", title: "Tit", description: "dsc", price: 25, categoryId: "xd1", imagePrimary: [], images: [] },
        {id: "3", name: "prod 1", slug: "slug1", title: "Tit", description: "dsc", price: 25, categoryId: "xd1", imagePrimary: [], images: [] },
        {id: "4", name: "prod 1", slug: "slug1", title: "Tit", description: "dsc", price: 25, categoryId: "xd1", imagePrimary: [], images: [] },
    ]

    const paths = products.map((product) => ({
        params: {slug : product.slug}
    }))

    return {
        paths,
        fallback: false,
    }
}
