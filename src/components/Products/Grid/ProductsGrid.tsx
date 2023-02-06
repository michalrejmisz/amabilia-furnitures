import {SingleProductCard} from "./SingleProductCard";
import {SearchBar} from "./SearchBar/SearchBar";
import {
    Grid,
} from '@mantine/core';
import {IProduct} from "../../../interfaces/Products";

const ProductsGrid: React.FC<{products : IProduct[]}> = ({products}) => {
    return(
        <Grid style={{marginBottom: "30px"}}>
            <Grid.Col span={12}><SearchBar/></Grid.Col>
            {products.map((product) => (
                <Grid.Col span={12} xs={6} md={4} ><SingleProductCard product={product}/></Grid.Col>
            ))}
        </Grid>
    );
}

export default ProductsGrid;