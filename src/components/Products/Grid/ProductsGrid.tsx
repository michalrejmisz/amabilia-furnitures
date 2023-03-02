import { SingleProductCard } from './SingleProductCard'
import { SearchBar } from './SearchBar/SearchBar'
import { Grid } from '@mantine/core'
import { IProduct } from '../../../interfaces/Products'
import { ICategory } from '../../../interfaces/Categories'
import { useViewportSize } from '@mantine/hooks'

interface Props {
    categories?: ICategory[]
    products?: IProduct[]
    slug?: string
    data: any
    handleSearchBar: (arg: string) => void
}

const ProductsGrid = ({ data, handleSearchBar }: Props) => {
    const { width } = useViewportSize()

    return (
        <Grid style={{ marginBottom: '30px' }}>
            <Grid.Col span={12}>
                <SearchBar handleSearchInput={handleSearchBar} />
            </Grid.Col>
            {data?.map(
                (product: {
                    attributes: {
                        Nazwa: string
                        Cena: number
                        Link: string
                        Opis: string
                        Wymiary: string
                        Zdjecie_glowne?: {
                            data?: { attributes?: { url: string } }
                        }
                    }
                }) => (
                    <Grid.Col
                        span={12}
                        xs={6}
                        md={4}
                        key={product.attributes.Link}
                    >
                        <SingleProductCard
                            key={product.attributes.Link}
                            product={{
                                title: product.attributes.Nazwa,
                                price: product.attributes.Cena,
                                slug: product.attributes.Link,
                                description: product.attributes?.Opis ?? null,
                                dimensions: product.attributes?.Wymiary ?? null,
                                imagePrimary: {
                                    mediaItemUrl: `${process.env.NEXT_PUBLIC_STRAPI_UPLOAD_FOLDER}${product?.attributes?.Zdjecie_glowne?.data?.attributes?.formats?.large?.url ? product?.attributes?.Zdjecie_glowne?.data?.attributes?.formats?.large?.url : product?.attributes?.Zdjecie_glowne?.data?.attributes?.url || '/uploads/no-thumb.png'}${'?format=webp'}`,
                                    thumbnailUrl: `${
                                        process.env
                                            .NEXT_PUBLIC_STRAPI_UPLOAD_FOLDER
                                    }${
                                        width > 575
                                            ? product?.attributes
                                                  ?.Zdjecie_glowne?.data
                                                  ?.attributes?.formats
                                                  ?.thumbnail?.url
                                                ? product?.attributes
                                                      ?.Zdjecie_glowne?.data
                                                      ?.attributes?.formats
                                                      ?.thumbnail?.url +
                                                  '?format=webp'
                                                : product?.attributes
                                                      ?.Zdjecie_glowne?.data
                                                      ?.attributes?.url ||
                                                  '/uploads/no-thumb.png'
                                            : product?.attributes
                                                    ?.Zdjecie_glowne?.data
                                                    ?.attributes?.formats?.small
                                                    ?.url
                                              ? product?.attributes
                                                    ?.Zdjecie_glowne?.data
                                                    ?.attributes?.formats?.small
                                                    ?.url + '?format=webp'
                                              : product?.attributes
                                                    ?.Zdjecie_glowne?.data
                                                    ?.attributes?.url ||
                                                '/uploads/no-thumb.png'
                                    }`,
                                },
                                images: product.attributes.Zdjecia,
                            }}
                        />
                    </Grid.Col>
                )
            )}
        </Grid>
    )
}

export default ProductsGrid
