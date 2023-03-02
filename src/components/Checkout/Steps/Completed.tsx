import {
    createStyles,
    Text,
    useMantineTheme,
    Loader,
    Title,
    Alert,
} from '@mantine/core'
import React, { useEffect, useState } from 'react'
import { useCheckout } from '@/context/CheckoutContext'
import { useShoppingCart } from '@/context/ShoppingCartContext'

const useStyles = createStyles((theme) => ({
    title: {
        margin: '0px 10px 15px 10px',
        float: 'left',
        fontFamily: 'Roboto, sans-serif',
        textTransform: 'uppercase',
        fontWeight: '100',
        letterSpacing: '2.5px',
        color: theme.colors[theme.primaryColor][6],
        marginTop: theme.spacing.sm,
        marginLeft: theme.spacing.xl,
        marginBottom: theme.spacing.xs,
        [theme.fn.smallerThan('sm')]: {
            marginLeft: theme.spacing.xs,
            marginBottom: 0,
        },
    },

    form: {
        borderTop: `1px solid ${theme.fn.variant({ variant: 'outline', color: theme.primaryColor }).border}`,
        display: 'flex',
        height: '100%',
        flexDirection: 'row',
        alignItems: 'left',
        width: '100%',
        justifyContent: 'space-between',
        flexFlow: 'wrap',
        paddingTop: theme.spacing.lg,
        textAlign: 'left',
    },

    segmentControlGroup: {
        flexBasis: '100%',
        zIndex: '1',
        marginBottom: theme.spacing.xl,

        [theme.fn.smallerThan('sm')]: {
            width: '100%',
        },
    },

    segmentControl: {
        minWidth: '400px',
        [theme.fn.smallerThan('sm')]: {
            minWidth: '1px',
            width: '95%',
        },
    },

    icon: {
        '@media not all and (min-width: 365px)': {
            display: 'none',
        },
    },

    alert: {
        margin: 0,
        marginBottom: theme.spacing.xl,
        colors: theme.colors.blue[6],
    },
}))

export const Completed = () => {
    const { classes } = useStyles()
    const theme = useMantineTheme()
    const { formProps } = useCheckout()
    const { cartItems, handleCartValue, cleanCart } = useShoppingCart()
    const [isLoading, setIsLoading] = useState(true)
    const [isError, setIsError] = useState(true)
    const [isOrderValid, setIsOrderValid] = useState()
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const mutation = `
       mutation createOrder($input: OrderInput!) {
         createOrder(data: $input) {
         data{
            id
           attributes{
             Imie
             Nazwisko
             Email
             Telefon
             Faktura
             Nip
             NazwaFirmy
             Delivery
             Miejscowosc
             KodPocztowy
             Street
             houseNumber
             isPhone
             isCash
             isNewsletter
             moreInformation
           }
         }
         }
       }
    `

    const submitOrder2 = async () => {
        await fetch(process.env.NEXT_PUBLIC_REST_API, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: process.env.NEXT_PUBLIC_STRAPI_ORDER_TOKEN,
            },
            body: JSON.stringify({
                data: {
                    Imie: formProps.Imie,
                    Nazwisko: formProps.Nazwisko,
                    Email: formProps.Email,
                    Telefon: formProps.Telefon,
                    Faktura: formProps.isFaktura,
                    Nip: formProps.isFaktura ? formProps.Nip : '',
                    NazwaFirmy: formProps.isFaktura ? formProps.NazwaFirmy : '',
                    Delivery: formProps.isDelivery,
                    Miejscowosc: formProps.isDelivery
                        ? formProps.Miejscowosc
                        : '',
                    KodPocztowy: formProps.isDelivery
                        ? formProps.KodPocztowy
                        : '',
                    Street: formProps.isDelivery ? formProps.Street : '',
                    houseNumber: formProps.isDelivery
                        ? formProps.houseNumber
                        : '',
                    isPhone: formProps.isPhone,
                    isCash: formProps.isCash,
                    isNewsletter: formProps.isNewsletter,
                    moreInformation: formProps.moreInformation,
                    Products: cartItems,
                },
            }),
        })
            .then(() => {
                cleanCart()
                handleCartValue(0)
                setIsError(false)
                setIsLoading(false)
            })
            .catch(() => {
                setIsError(true)
                setIsLoading(false)
            })
    }

    useEffect(() => {
        submitOrder2()
    }, [])

    return (
        <>
            <Alert
                className={classes.alert}
                mt={theme.spacing.xl}
                style={{
                    minHeight: '200px',
                    justifyContent: 'center',
                    textAlign: 'center',
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                {isLoading ? (
                    <Loader color="blue" />
                ) : isError ? (
                    <>
                        <Title
                            order={1}
                            style={{ color: theme.colors.blue[6] }}
                        >
                            Niestety wystąpił błąd!
                        </Title>
                        <Text
                            size={'xl'}
                            style={{ color: theme.colors.blue[6] }}
                        >
                            Spróbuj ponownie za kilka minut
                        </Text>
                    </>
                ) : (
                    <>
                        <Title
                            order={1}
                            style={{ color: theme.colors.blue[6] }}
                        >
                            Gratulacje!
                        </Title>
                        <Text
                            size={'xl'}
                            style={{ color: theme.colors.blue[6] }}
                        >
                            Wkrótce skontakuje się z Tobą nasz pracownik.
                        </Text>
                        <Text
                            size={'xl'}
                            style={{ color: theme.colors.blue[6] }}
                        >
                            Na mailu znajdziesz potwierdzenie zamówienia.
                        </Text>
                        <Text
                            size={'xl'}
                            style={{ color: theme.colors.blue[6] }}
                        >
                            Zapraszamy ponownie!
                        </Text>
                    </>
                )}
            </Alert>
        </>
    )
}
