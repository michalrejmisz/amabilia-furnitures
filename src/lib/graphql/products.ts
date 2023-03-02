import { gql } from '@apollo/client'

export const PRODUCTS_ALL3 = gql`
    query GetProducts($searchString: String) {
        produkties(
            where: {
                attributes: {
                    OR: [
                        { Nazwa: { contains: $searchString } }
                        { Opis: { contains: $searchString } }
                    ]
                }
            }
        ) {
            data {
                attributes {
                    Nazwa
                    Opis
                    Link
                    Cena
                    Zdjecie_glowne {
                        data {
                            attributes {
                                formats
                                url
                                name
                            }
                        }
                    }
                    Zdjecia {
                        data {
                            attributes {
                                formats
                                url
                            }
                        }
                    }
                    kategoria {
                        data {
                            attributes {
                                Nazwa
                                Link
                            }
                        }
                    }
                    createdAt
                    updatedAt
                }
            }
        }
    }
`

export const PRODUCTS_ALL = gql`
    query GetProducts {
        produkties {
            data {
                attributes {
                    Nazwa
                    Opis
                    Link
                    Cena
                    Zdjecie_glowne {
                        data {
                            attributes {
                                formats
                                url
                                name
                            }
                        }
                    }
                    Zdjecia {
                        data {
                            attributes {
                                formats
                                url
                            }
                        }
                    }
                    kategoria {
                        data {
                            attributes {
                                Nazwa
                                Link
                            }
                        }
                    }
                    createdAt
                    updatedAt
                }
            }
        }
    }
`

export const GET_PRODUCTS_BY_LINKS = gql`
    query GetProductsByCartLinks($cartLinks: [String!]!) {
        produkties(filters: { Link: { in: $cartLinks } }) {
            data {
                attributes {
                    Nazwa
                    Opis
                    Link
                    Cena
                    Zdjecie_glowne {
                        data {
                            attributes {
                                formats
                                url
                                name
                            }
                        }
                    }
                    Zdjecia {
                        data {
                            attributes {
                                formats
                                url
                            }
                        }
                    }
                    kategoria {
                        data {
                            attributes {
                                Nazwa
                                Link
                            }
                        }
                    }
                    createdAt
                    updatedAt
                }
            }
        }
    }
`

export const PRODUCTS_BY_CATEGORY = gql`
    query GetProductsByCategory($filters: ProduktyFiltersInput) {
        produkties(filters: $filters) {
            data {
                attributes {
                    Nazwa
                    Opis
                    Link
                    Cena
                    Wymiary
                    Zdjecie_glowne {
                        data {
                            attributes {
                                url
                                name
                                formats
                            }
                        }
                    }
                    Zdjecia {
                        data {
                            attributes {
                                url
                                name
                                formats
                            }
                        }
                    }
                    kategoria {
                        data {
                            attributes {
                                Nazwa
                                Link
                            }
                        }
                    }
                    createdAt
                    updatedAt
                }
            }
        }
    }
`

export const PRODUCTS_BY_SPECIAL_CATEGORY = gql`
    query GetProductsByCategory($link: String!) {
        wlasnaKategorias(
            filters: { StworzKategorie: { Link: { eq: $link } } }
        ) {
            data {
                attributes {
                    Nazwa
                    StworzKategorie {
                        Nazwa
                        Link
                        produkty {
                            data {
                                attributes {
                                    Nazwa
                                    Opis
                                    Link
                                    Cena
                                    Wymiary
                                    Zdjecie_glowne {
                                        data {
                                            attributes {
                                                url
                                                name
                                                formats
                                            }
                                        }
                                    }
                                    Zdjecia {
                                        data {
                                            attributes {
                                                url
                                                name
                                                formats
                                            }
                                        }
                                    }
                                    kategoria {
                                        data {
                                            attributes {
                                                Nazwa
                                                Link
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`

export const PRODUCTS_ALL2 = gql`
    query Produkty($Link: ID!) {
        Produkty(Link: $Link) {
            Link
            Cena
        }
    }
`

export const PRODUCT_BY_SLUG = gql`
    query GetProductsByCategory($slug: String) {
        produkties(filters: { Link: { eq: $slug } }) {
            data {
                attributes {
                    Nazwa
                    Opis
                    Link
                    Cena
                    Wymiary
                    Zdjecie_glowne {
                        data {
                            attributes {
                                url
                                name
                                formats
                            }
                        }
                    }
                    Zdjecia {
                        data {
                            attributes {
                                url
                                formats
                            }
                        }
                    }
                    kategoria {
                        data {
                            attributes {
                                Nazwa
                                Link
                            }
                        }
                    }
                    createdAt
                    updatedAt
                }
            }
        }
    }
`

// (filters: {kategoria: {Link: {eq: "krzeslo-1"}}})
