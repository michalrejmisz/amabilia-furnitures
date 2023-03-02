import { gql } from '@apollo/client'

export const CATEGORY_NAME_BY_SLUG = gql`
    query CategoryName($searchString: String) {
        categories(filters: { Link: { eq: $searchString } }) {
            data {
                attributes {
                    Link
                    Nazwa
                }
            }
        }
    }
`

export const CATEGORIES_ALL = gql`
    {
        categories {
            data {
                id
                attributes {
                    Nazwa
                    Link
                }
            }
        }
    }
`

export const SPECIAL_CATEGORIES_ALL = gql`
    {
        wlasnaKategorias {
            data {
                attributes {
                    StworzKategorie {
                        Nazwa
                        Link
                    }
                }
            }
        }
    }
`

export const HOME_PAGE_CATEGORIES = gql`
    {
        kategoriesLinki {
            data {
                attributes {
                    Podlinkowane {
                        __typename
                        ... on ComponentNowaNazwaTestowa {
                            kategoria {
                                data {
                                    attributes {
                                        Link
                                    }
                                }
                            }
                            NazwaTestowa: Nazwa
                            ZdjecieTestowa: Zdjecie {
                                data {
                                    attributes {
                                        ZdjecieTestowaUrl: url
                                        ZdjecieTestowaFormats: formats
                                    }
                                }
                            }
                        }
                        ... on ComponentNowaNowaWlasna {
                            wlasna_kategoria {
                                data {
                                    attributes {
                                        StworzKategorie {
                                            Link
                                        }
                                    }
                                }
                            }
                            NazwaWlasna: Nazwa
                            ZdjecieWlasna: Zdjecie {
                                data {
                                    attributes {
                                        ZdjecieWlasnaUrl: url
                                        ZdjecieWlasnaFormats: formats
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
