import { Fragment } from 'react';
import {
    Text,
    Card,
    Container,
    Group,
    createStyles
} from '@mantine/core'

const useStyles = createStyles((theme) => ({
    card: {
        maxWidth: '230px',
        textAlign: 'left',
    },

    cardHeader: {
        backgroundColor: theme.colors[theme.primaryColor][8],
        height: '40px',
        textAlign: 'center',
    }


}))


const CATEGORIES = ['Stoły', 'Krzesła', 'Biurka', 'Recepcje', 'Kontenerki', 'Zestawy']
const BRANDS = ['Ikea', 'Black&Red', 'Obi', 'Leroy', 'Castoram', '']

interface CategoryFrameProps {
    name: string,
    items: Array<string>;
}

const CategoryFrame = ({name, items} : CategoryFrameProps) => {
    const { classes } = useStyles();

    return(
        <Card shadow={'sm'} p={'sm'} radius={'sm'} mb={'lg'} className={classes.card}>
            <Card.Section className={classes.cardHeader}>{name}</Card.Section>
            {items.map((category) => (
                <Text>{category}</Text>
            ))}
        </Card>
    )
}


const ProductsNavbar = () => {
    return(
        <Fragment>
            <CategoryFrame name={'Kategoria'} items={CATEGORIES}/>
            <CategoryFrame name={'Marki'} items={BRANDS}/>
            <CategoryFrame name={'Kategoria'} items={CATEGORIES}/>
        </Fragment>
    );
}

export default ProductsNavbar;