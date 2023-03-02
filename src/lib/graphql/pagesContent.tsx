import { gql } from '@apollo/client'

export const ENTIRE_STATIC_CONTENT = gql`
    query {
        naszeMarki {
            data {
                attributes {
                    Zdjecia {
                        data {
                            attributes {
                                url
                                formats
                            }
                        }
                    }
                }
            }
        }
        formularzKontaktowy {
            data {
                attributes {
                    Email
                    Telefon
                    GodzinyOtwarcia
                    Adres
                }
            }
        }

        stronaTytulowaZdjecieBiurkaInformacje {
            data {
                attributes {
                    TytulPodkreslenie
                    TytulPierwszyWiersz
                    TytulDrugiWiersz
                    Podtytul
                    KliknijZadzwon
                    kat {
                        data {
                            attributes {
                                Link
                            }
                        }
                    }
                    InformacjeOdMyslnika {
                        PogrubionyTekst
                        TekstPoMyslniku
                    }
                    Zdjecie {
                        data {
                            attributes {
                                url
                            }
                        }
                    }
                }
            }
        }

        zamowienieDostawa {
            data {
                attributes {
                    InformacjaMyslnik {
                        ... on ComponentZamowienieInformacjaNowyMyslnik {
                            Myslnik
                        }
                    }
                }
            }
        }
    }
`

export const BANER_PRODUCT_PAGE = gql`
    {
        baner {
            data {
                attributes {
                    Tytul
                    Podtytul
                    PredkoscBanera
                    WlasneBanery {
                        ... on ComponentBanerBanerObrazy {
                            Zdjecie {
                                data {
                                    attributes {
                                        url
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

export const ABOUT_US_PAGE = gql`
    {
        aboutus {
            data {
                attributes {
                    __typename
                    Tytul
                    Podtytul
                    TekstKoncowy
                    Zdjecie {
                        data {
                            attributes {
                                url
                                formats
                            }
                        }
                    }
                    NowyElementZeZdjeciem {
                        ... on ComponentOnasDodajElement {
                            TytulComponent: Tytul
                            PodtytulComponent: Podtytul
                            ZdjecieComponent: Zdjecie {
                                data {
                                    attributes {
                                        url
                                        formats
                                    }
                                }
                            }
                            StronaZdjecia
                        }
                    }
                }
            }
        }
    }
`
