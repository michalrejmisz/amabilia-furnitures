import { getServerSideSitemapLegacy } from 'next-sitemap'
import { GetServerSideProps } from 'next'
import { initializeApollo } from '@/lib/apolloClient'
import { PRODUCTS_ALL } from '@/lib/graphql/products'
import { CATEGORIES_ALL } from '@/lib/graphql/categories'

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const apolloClient = initializeApollo()
    const { data: product } = await apolloClient.query({
        query: PRODUCTS_ALL,
    })

    const { data: categories } = await apolloClient.query({
        query: CATEGORIES_ALL,
    })

    const productsFields =
        product?.produkties?.data?.map((data) => ({
            loc: `https://amabilia-meble.pl/product/${data.attributes.Link}`,
            lastmod: new Date().toISOString(),
        })) || []

    const categoriesFields = categories?.categories?.data?.map((data) => ({
        loc: `https://amabilia-meble.pl/products/category/${data.attributes.Link}`,
        lastmod: new Date().toISOString(),
    }))

    const fields = [...categoriesFields, ...productsFields]

    return getServerSideSitemapLegacy(ctx, fields)
}

// Default export to prevent next.js errors
export default function Sitemap() {}
