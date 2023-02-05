import { ApolloClient, InMemoryCache } from "@apollo/client";
import { gql } from "@apollo/client";


const client = new ApolloClient({
    uri: "http://admin.srv53226.seohost.com.pl/graphql",
    cache: new InMemoryCache(),
});

export const getCategoriesQuery = async() => {
    const categories = await client.query({
        query: gql`
          query data {
              kategorie {
                edges {
                  node {
                    id
                    name
                    slug
                    image {
                      id
                    }
                  }
                }
              }
            }
        `,
    });

    return categories;
}

export const getProductsQuery = async() => {
    const products = await client.query({
        query: gql`
            query MyQuery {
              produkty {
                edges {
                  node {
                    id
                    slug
                    title
                    produktId
                    price
                    description
                    categoryId {
                      node {
                        id
                      }
                    }
                    images {
                      mediaItemUrl
                      id
                    }
                    imagePrimary {
                      altText
                      mediaItemUrl
                    }
                  }
                }
              }
            }
        `,
    });

    return products;
}

// Get clean Categories arrays without nodes and edges.
export const getCategories = async() => {
    const categories = await getCategoriesQuery();
    // return categories.data.kategorie.edges[0].node.name;
    const edges = categories.data.kategorie.edges;
    let categoriesArray = [];
    edges.map((edge) => {
        categoriesArray = [...categoriesArray, {id: edge.node.id, name: edge.node.name, slug: edge.node.slug, image: edge.node.image}]
    })

    return categoriesArray;
}

export const getProducts = async() => {
    const products = await getProductsQuery();
    const edges = products.data.produkty.edges;
    let productsArray = [];
    edges.map((product) => {
        productsArray = [...productsArray, {
            id: product.node.id,
            slug: product.node.slug,
            title: product.node.title,
            description: product.node.description,
            price: product.node.price,
            categoryId: product.node.categoryId.node.id,
            imagePrimary: {
                altText: product.node.imagePrimary != null ? product.node.imagePrimary.altText : null,
                mediaItemUrl: product.node.imagePrimary != null ? product.node.imagePrimary.mediaItemUrl : null,
            },
            images: [
                product.node.images != null ? product.node.images : null,
            ],
        }]
    })
    return productsArray;
}

export const getProductsByCategory = async(category) =>{
    const products = await getProducts();
    const productsByCategory = products.filter((product) => product.categoryId === category.id)
    return productsByCategory;
}

export const getCategoryBySlug = async(slug) => {
    const categories = await getCategories();
    const categoryBySlug = categories.filter((category) => category.slug == slug)
    const category = categoryBySlug.length > 0 ? categoryBySlug[0] : null;
    return category;
}

export const getProductsByCategoryId = async(id) =>{

}


export default client;