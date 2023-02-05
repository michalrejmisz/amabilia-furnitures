import {Fragment} from 'react'
import {Center, Container, createStyles, Image, MantineProvider, Title} from '@mantine/core'
import { useViewportSize } from '@mantine/hooks';
import ProductsOffer from "../components/Main/ProductsOffer/ProductsOffer";
import InitialMain from "../components/Main/InitialMain/InitialMain";
import {ContactUsForm} from "../components/Main/ContactForm/ContactUsForm";
import {Layout} from "../components/Layout/Layout";
import type { NextPageWithLayout } from './_app'
// import { getCategories } from '../utils/wordpress';
import { getCategories } from '../utils/apollo-client';

interface ViewPortSize {
    viewPortHeight: number,
    viewPortWidth: number,
}

const useStyles = createStyles((theme, {viewPortHeight, viewPortWidth} : ViewPortSize) => (
    {

}));

interface NavbarCategoryItem {
    categories: string;
}

const Home: NextPageWithLayout = () => {
    const { height: viewPortHeight, width: viewPortWidth } = useViewportSize();
    const { classes } = useStyles({ viewPortHeight, viewPortWidth });

    // const jsxCategories = categories.map((category) => {
    //     return {category};
    // })



    return(
        <Fragment>
                <InitialMain/>
                <ProductsOffer/>
                <ContactUsForm/>
        </Fragment>
    );
};

export default Home;

Home.getLayout = function getLayout(page: React.ReactElement){
    return(
        <Layout>
            {page}
        </Layout>
    );
}





export async function getStaticProps() {
    const categories = await getCategories();
    console.log(categories)
    console.log("test static props")

    return {
        props: {
            categories,
        },
        revalidate: 10, // In seconds
    };
}


