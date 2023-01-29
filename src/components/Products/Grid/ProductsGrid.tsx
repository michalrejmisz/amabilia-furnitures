import {SingleProductCard} from "./SingleProductCard";
import {SearchBar} from "./SearchBar/SearchBar";
import {
    Grid,
} from '@mantine/core';

const ProductsGrid = () => {
    return(
        <Grid>
            <Grid.Col span={12}><SearchBar/></Grid.Col>
            <Grid.Col span={12} xs={6} md={4} ><SingleProductCard/></Grid.Col>
            <Grid.Col span={12} xs={6} md={4} ><SingleProductCard/></Grid.Col>
            <Grid.Col span={12} xs={6} md={4} ><SingleProductCard/></Grid.Col>
            <Grid.Col span={12} xs={6} md={4} ><SingleProductCard/></Grid.Col>
            <Grid.Col span={12} xs={6} md={4} ><SingleProductCard/></Grid.Col>
            <Grid.Col span={12} xs={6} md={4} ><SingleProductCard/></Grid.Col>
            <Grid.Col span={12} xs={6} md={4} ><SingleProductCard/></Grid.Col>
        </Grid>
    );
}

export default ProductsGrid;