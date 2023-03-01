import {NextPageWithLayout} from "../_app";
import {useViewportSize} from "@mantine/hooks";
import {Fragment} from "react";
import {Container, createStyles, Grid} from "@mantine/core";
import {Layout} from "../../Layout/Layout";
import {ICategory} from "../../interfaces/Categories";
import {IProduct} from "../../interfaces/Products";
import {ProductComponent}  from '../../components/Product/ProductComponent';
import {GetServerSideProps} from 'next';
import { ParsedUrlQuery } from 'querystring';
import { initializeApollo, addApolloState } from "@/lib/apolloClient";
import {useRouter} from "next/router";
import {useContext, createContext} from 'react';
import {PRODUCT_BY_SLUG, PRODUCTS_ALL} from "@/lib/graphql/products";
import { NextSeo, ProductJsonLd } from 'next-seo';


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


    let otherImages = null
    otherImages = product?.attributes?.Zdjecia?.data?.map((img) => {
        let thumbnailUrl = null
        // if(img.attributes?.formats?.thumbnail?.url){
        thumbnailUrl = process.env.NEXT_PUBLIC_STRAPI_UPLOAD_FOLDER+
            (img.attributes?.formats?.thumbnail?.url ? img.attributes?.formats?.thumbnail?.url : img.attributes?.url || "/uploads/no-thumb.png") +
            "?format=webp";
        // }
        // let mediaItemUrl = process.env.NEXT_PUBLIC_STRAPI_UPLOAD_FOLDER+img.attributes?.url+"?format=webp"
        let mediaItemUrl = process.env.NEXT_PUBLIC_STRAPI_UPLOAD_FOLDER +
            (img.attributes?.formats?.large ? img.attributes.formats.large.url : img.attributes?.url || "/uploads/no-thumb.png") +
            "?format=webp";
        return{
            mediaItemUrl,
            thumbnailUrl
        }
    })

    let imageThumbnail = product?.imagePrimary?.thumbnailUrl;
    let primaryMediaItemUrl = `${process.env.NEXT_PUBLIC_STRAPI_UPLOAD_FOLDER}${product?.attributes?.Zdjecie_glowne?.data?.attributes?.formats?.large?.url ? product?.attributes?.Zdjecie_glowne?.data?.attributes?.formats?.large?.url : product?.attributes?.Zdjecie_glowne?.data?.attributes?.url || "/uploads/no-thumb.png"}${"?format=webp"}`;

    // let primaryMediaItemUrl = `${process.env.NEXT_PUBLIC_STRAPI_UPLOAD_FOLDER}${product?.attributes?.Zdjecie_glowne?.data?.attributes?.url || "/uploads/no-thumb.png"}${"?format=webp"}`;
    // if(product?.attributes?.Zdjecie_glowne?.data?.attributes?.formats?.large?.url){primaryMediaItemUrl = `${process.env.NEXT_PUBLIC_STRAPI_UPLOAD_FOLDER}${product?.attributes?.Zdjecie_glowne?.data?.attributes?.formats?.large?.url}${"?format=webp"}`;}
    //
    // let otherImages = null
    // otherImages = product.attributes?.Zdjecia?.data?.map((img) => {
    //     let thumbnailUrl = null
    //     if(img.attributes?.formats?.thumbnail?.url){
    //         thumbnailUrl = process.env.NEXT_PUBLIC_STRAPI_UPLOAD_FOLDER+img.attributes?.formats?.thumbnail?.url+"?format=webp"
    //     }
    //     let mediaItemUrl = process.env.NEXT_PUBLIC_STRAPI_UPLOAD_FOLDER+img.attributes?.url+"?format=webp"
    //     return{
    //         mediaItemUrl,
    //         thumbnailUrl
    //     }
    // })
    //
    // let imageThumbnail = product?.imagePrimary?.mediaItemUrl;
    // if (!(product?.imagePrimary?.thumbnailUrl === "null")) {
    //     imageThumbnail = product?.imagePrimary?.thumbnailUrl;
    // }


    return(
        <>
            <NextSeo
                title={`${product?.attributes?.Nazwa ?? ''} | Amabilia-meble.pl`}
                description={`${product?.attributes?.Opis ?? ''} > Meble poleasingowe w niskiej cenie. Zapewniamy wysoką jakość.`}
                canonical={`https://amabilia-meble.pl/product/${product?.attributes?.Link}`}
                openGraph={{
                    url: `https://amabilia-meble.pl/product/${product?.attributes?.Link}`,
                    title: `${product?.attributes?.Nazwa ?? ''} | Amabilia-meble.pl`,
                    description: `${product?.attributes?.Opis ?? ''} > Meble poleasingowe w niskiej cenie. Zapewniamy wysoką jakość.`,
                    images:[
                        {
                            url: primaryMediaItemUrl,
                            alt: product?.attributes?.Nazwa ?? '',
                            type: 'image/webp',
                        }
                    ]
                }}
            />
            <ProductJsonLd
                productName={product?.attributes?.Nazwa ?? ''}
                description={product?.attributes?.Opis ?? ''}
                images={[
                    primaryMediaItemUrl,
                ]}

                offers={[
                    {
                        price: product?.attributes?.Cena,
                        priceCurrency: 'PLN',
                        itemCondition: 'UsedCondition',
                        availability: 'InStock',
                        url: `https://amabilia-meble.pl/product/${product?.attributes?.Link}`,
                    }
                ]}
            />
            <Container size={'xl'} mt={"50px"} className={classes.wrapper} >
                <ProductComponent product={
                    {
                        title: product?.attributes?.Nazwa,
                        price: product?.attributes?.Cena ,
                        slug: product?.attributes?.Link,
                        description: product.attributes?.Opis ?? null,
                        dimensions: product.attributes?.Wymiary ?? null,
                        imagePrimary: {
                            mediaItemUrl: `${process.env.NEXT_PUBLIC_STRAPI_UPLOAD_FOLDER}${product?.attributes?.Zdjecie_glowne?.data?.attributes?.formats?.large?.url ? product?.attributes?.Zdjecie_glowne?.data?.attributes?.formats?.large?.url : product?.attributes?.Zdjecie_glowne?.data?.attributes?.url || "/uploads/no-thumb.png"}${"?format=webp"}`,
                            // thumbnailUrl: `${product?.attributes?.Zdjecie_glowne?.data?.attributes?.formats?.thumbnail?.url ? `${process.env.NEXT_PUBLIC_STRAPI_UPLOAD_FOLDER}${product?.attributes?.Zdjecie_glowne?.data?.attributes?.formats?.thumbnail?.url}${"?format=webp"}` : null}`,
                            thumbnailUrl: `${process.env.NEXT_PUBLIC_STRAPI_UPLOAD_FOLDER}${product?.attributes?.Zdjecie_glowne?.data?.attributes?.formats?.thumbnail?.url ? product?.attributes?.Zdjecie_glowne?.data?.attributes?.formats?.thumbnail?.url+"?format=webp" : product?.attributes?.Zdjecie_glowne?.data?.attributes?.url || "/uploads/no-thumb.png"}`,
                        },

                        images: [
                            ...otherImages
                        ],

                    }
                }/>
            </Container>
        </>
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

export const getServerSideProps: GetServerSideProps = async(context) => {
    const { slug } = context.params as IParams
    const apolloClient = initializeApollo()
    const {data: product2} = await apolloClient.query({
        query: PRODUCTS_ALL,
    })


    console.log("get statis pathssd")
    const urls = product2.produkties.data.map((item) => {
        return {
            loc: `https://amabilia-meble.pl/product/${item.attributes.Link}`,
            lastmod: new Date().toISOString(),
            // changefreq
            // priority
        };
    });
    console.log(urls)
    // console.log(product2.produkties.data)
    console.log("get statis pathssd")

    const { data, error, errors } = await apolloClient.query({
        // query: PRODUCTS_BY_CATEGORY, variables: { id: "1"}
        query: PRODUCT_BY_SLUG,
        variables: { slug: slug },
    })

    const product = data.produkties.data[0]
    // const images = product?.attributes?.Zdjecia?.data?.map((img) => {mediaItemUrl: process.env.STRAPI_UPLOAD_FOLDER+img.attributes.url})
    const images = product?.attributes?.Zdjecia?.data?.map((img) => {
        return{
            mediaItemUrl: process.env.NEXT_PUBLIC_STRAPI_UPLOAD_FOLDER+img.attributes.url
        }
    })


    return addApolloState(apolloClient, {
        props: {
            slug,
            product: data.produkties.data[0],
        },
    });
}
//
// export async function getStaticPaths() {
//     const apolloClient = initializeApollo()
//     const {data: product} = await apolloClient.query({
//         query: PRODUCTS_ALL,
//     })
//
//     console.log("get statis pathssd")
//     console.log(product)
//     console.log("get statis pathssd")
//     let posts = await fetch("https://jsonplaceholder.typicode.com/posts");
//     posts = await posts.json();
//     let paths = [];
//     posts.forEach((item) => {
//         paths.push({
//             params: {
//                 postId: item.id.toString(),
//             },
//         });
//     });
//
//     return {
//         paths,
//         fallback: true,
//     };
// }