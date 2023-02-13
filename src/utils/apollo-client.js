import { ApolloClient, InMemoryCache } from "@apollo/client";
import { gql, useQuery } from "@apollo/client";


export const client = new ApolloClient({
    uri: "http://www.srv53487.seohost.com.pl/admin/graphql",
    cache: new InMemoryCache(),
});


// export const GET_PRODUCTS = gql`
//     query GetProducts {
//         produkty {
//             edges {
//                 node{
//                     id
//                     description
//                     slug
//                     title
//                 }
//             }
//         }
//     }
// `;
// // $slug: String!
// export const GET_PRODUCT = gql`
//     query GetProduct($id: ID!) {
//         produkt(id: "xd") {
//             id
//             description
//             slug
//             title
//         }
//      }
// `;
//
// export const getProductsNew = async() => {
//     const data = await client.query({query: GET_PRODUCTS});
//     console.log("------------")
//     console.log(data)
//     console.log("------------")
//     return data;
// }
//
// export const getProductBySlug = async(slug) => {
//     console.log("INSIDE GET PRODUCT BY SLUG")
//     console.log(slug)
//     console.log("INSIDE GET PRODUCT BY SLUG")
//     // const product = await client.query({
//     //     query: GET_PRODUCT,
//     //     variables: {slug: slug},
//     // })
//     // console.log("-------BYSLUG?-----")
//     // console.log(product)
//     // console.log("------------")
//     // return product;
// }


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
        // if(product.node.image[0] != null){
        //     const images = product.node.images[0]?.map((image) => {mediaItemUrl : image.mediaItemUrl})
        //     console.log("OBRAZKI W APOLLO")
        //     console.log(images)
        // }
        console.log("TEST PRZED APOLLO")
        console.log(product.node.images)
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
                // product.node.images != null ? product.node.images.map((image) => image.mediaItemUrl) : null,
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

export const getProductBySlug = async(slug) =>{
    const products = await getProducts();
    const productBySlug = products.filter((products) => products.slug == slug)
    return productBySlug[0];
}


