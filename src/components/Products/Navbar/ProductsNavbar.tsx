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
        // maxWidth: '230px',
        textAlign: 'left',
        // marginLeft: '10px',
        borderRadius: "0",
        lineHeight: "24px",
        fontSize: "14px",
        fontFamily: "Roboto, sans-serif",
        fontHeight: "400",
        color: "#777777",
        paddingBottom: '0px',
    },

    cardHeader: {
        backgroundColor: theme.colors[theme.primaryColor][6],
        lineHeight: '60px',
        textAlign: 'left',
        fontWeight: 'bold',
        fontSize: "16px",
        padding: '0 30px',
        color: '#fff',
    },

    categoryList: {
        padding: '0',
        margin: '0',
    },

    categoryListItem: {
        marginLeft: '0',
        listStyleType: "none",
        listStyle: "none",

        fontFamily: "Roboto, sans-serif",
        color: "#777777",
        fontSize: '14px',
        display: 'block',
        lineHeight: '50px',
        paddingLeft: '10px',
        borderBottom: '1px solid #eee',
        '&:last-child': {
            borderBottom: 'none',
            // backgroundColor: 'red',
        },

        '&:hover': {
          color: theme.colors[theme.primaryColor][5]
        },
    }


}))


const CATEGORIES = ['Stoły', 'Krzesła', 'Biurka', 'Recepcje', 'Kontenerki', 'Zestawy']
const BRANDS = ['Ikea', 'Black&Red', 'Obi', 'Leroy', 'Castoram']

interface CategoryFrameProps {
    name: string,
    items: Array<string>;
}

const CategoryFrame = ({name, items} : CategoryFrameProps) => {
    const { classes } = useStyles();

    return(
        <Card shadow={'md'} mb={'lg'} className={classes.card}>
            <Card.Section className={classes.cardHeader}>{name}</Card.Section>
            <ul className={classes.categoryList}>
                {items.map((category) => (
                    <li className={classes.categoryListItem}>{category}</li>
                ))}
            </ul>
        </Card>
    )
}


const ProductsNavbar = () => {
    return(
        <Fragment>
            <CategoryFrame name={'Kategoria'} items={CATEGORIES}/>
            <CategoryFrame name={'Marki'} items={BRANDS}/>
        </Fragment>
    );
}

export default ProductsNavbar;