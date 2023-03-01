import { Fragment } from 'react';
import {
    Text,
    Card,
    Container,
    Group,
    createStyles
} from '@mantine/core'
import Link from 'next/link';
import {ICategory} from "../../../interfaces/Categories";
import { PRODUCTS_ALL } from "../../../lib/graphql/products";
import {useQuery} from "@apollo/client";
import {CATEGORIES_ALL, SPECIAL_CATEGORIES_ALL} from "../../../lib/graphql/categories";

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
          color: theme.colors[theme.primaryColor][5],
        },

    },

    active: {
        color: theme.colors[theme.primaryColor][5],
    },


}))


const CATEGORIES = ['Stoły', 'Krzesła', 'Biurka', 'Recepcje', 'Kontenerki', 'Zestawy']
const BRANDS = ['Ikea', 'Black&Red', 'Obi', 'Leroy', 'Castorama']

interface CategoryFrameProps {
    name: string,
    items?: ICategory[];
    activeCategory: string;
}

interface ProductsNavbarProps {
    categories: ICategory[],
    currentSlug: string,
}

const SpecialCategoryFrame = ({name, items, activeCategory} : CategoryFrameProps) => {
    const { classes } = useStyles();
    const { data: specialCategories} = useQuery(SPECIAL_CATEGORIES_ALL);

    let showNavbar = true
    if (!specialCategories || !specialCategories.wlasnaKategorias || specialCategories.wlasnaKategorias.data.length === 0) {
        // Return null if specialCategories is falsy or the data array is empty
        showNavbar = false
    }

    return(
        showNavbar && (
        <Card shadow={'md'} mb={'lg'} className={classes.card} style={{paddingBottom: '4px', marginTop: '40px'}}>
            <Card.Section className={classes.cardHeader}>{name}</Card.Section>
            <ul className={classes.categoryList}>
                {specialCategories?.wlasnaKategorias?.data?.map((category: { attributes: { Link?: string, Nazwa?: string } })  => (
                    <Link href={`/products/special-category/${category.attributes?.StworzKategorie?.Link}`} key={category.attributes.StworzKategorie?.Link} legacyBehavior><li key={category.attributes.StworzKategorie?.Link} className={`${classes.categoryListItem} ${activeCategory === category.attributes.StworzKategorie?.Link ? classes.active : ""}`}>{category.attributes.StworzKategorie?.Nazwa}</li></Link>
                ))}
            </ul>
        </Card>
        )
    )
}

const CategoryFrame = ({name, items, activeCategory} : CategoryFrameProps) => {
    const { classes } = useStyles();
    const { data: categories} = useQuery(CATEGORIES_ALL);
    const { data: specialCategories} = useQuery(SPECIAL_CATEGORIES_ALL);

    return(
        <Card shadow={'md'} mb={'lg'} className={classes.card} style={{paddingBottom: '4px'}}>
            <Card.Section className={classes.cardHeader}>{name}</Card.Section>
            <ul className={classes.categoryList}>
                {categories.categories?.data?.map((category: { attributes: { Link?: string, Nazwa?: string } })  => (
                    <Link href={`/products/category/${category.attributes?.Link}`} key={category.attributes.Link} legacyBehavior><li key={category.attributes.Link} className={`${classes.categoryListItem} ${activeCategory === category.attributes?.Link ? classes.active : ""}`}>{category.attributes?.Nazwa}</li></Link>
                ))}
            </ul>
        </Card>
    )
}


const ProductsNavbar = ({categories, currentSlug} : ProductsNavbarProps) => {
    // const categoriesNames = categories.map((category: ICategory) => category.name)
    const { loading: loadingCategories, error: errorCategories, data: dataCategories, fetchMore: fetchCategories, networkStatus: networkCategories } = useQuery(CATEGORIES_ALL);
    return(
        <Fragment>
            <CategoryFrame name={'Kategoria'} activeCategory={currentSlug}/>
            <SpecialCategoryFrame name={'Inne'} activeCategory={currentSlug}/>
        </Fragment>
    );
}

export default ProductsNavbar;