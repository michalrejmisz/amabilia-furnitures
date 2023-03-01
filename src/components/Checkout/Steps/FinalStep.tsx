import {
    ActionIcon,
    createStyles,
    Group,
    Image,
    List,
    MediaQuery,
    Text,
    useMantineTheme,
    Flex,
    UnstyledButton,
    SimpleGrid,
    Grid, TextInput, Input,
    Title,
    Button,
    Transition,
    SegmentedControl,
    Box,
    Center,
    Alert,
    ThemeIcon,
    Textarea
} from "@mantine/core";
import {IconMail, IconCreditCard, IconBusinessplan, IconPlus, IconPhone, IconUser, IconBuildingSkyscraper, IconChevronUp, IconTrash, IconReceiptOff, IconReceipt, IconPackage, IconAlertCircle, IconCircleCheck} from "@tabler/icons";
import React, {isValidElement, useEffect, useState} from "react";
import {Fragment} from "react";
import {useViewportSize, useId} from "@mantine/hooks";
import { useForm } from '@mantine/form';
import {useCheckout} from "@/context/CheckoutContext";
import Router from "next/router";
import {PrivacyPolicyModal} from "@/components/UI/PrivacyPolicy/PrivacyPolicy";


const useStyles = createStyles((theme) => ({
    title: {
        margin: "0px 10px 15px 10px",
        float: "left",
        fontFamily: 'Roboto, sans-serif',
        textTransform: 'uppercase',
        fontWeight: "100",
        letterSpacing: "2.5px",
        color: theme.colors[theme.primaryColor][6],
        marginTop: theme.spacing.sm,
        marginLeft: theme.spacing.xl,
        marginBottom: theme.spacing.xs,
        // marginBottom: theme.spacing.xs,
        // "&:not(:first-child)": {
        //     marginTop: theme.spacing.xl,
        // }
        [theme.fn.smallerThan('sm')]: {
            marginLeft: theme.spacing.xs,
            marginBottom: 0,
        },
    },


    form: {
        borderTop: `1px solid ${theme.fn.variant({ variant: 'outline', color: theme.primaryColor }).border}`,
        display: "flex",
        height: "100%",
        flexDirection: 'row',
        alignItems: 'left',
        width: "100%",
        justifyContent: "space-between",
        flexFlow: "wrap",
        paddingTop: theme.spacing.lg,
        textAlign: "left",
    },

    segmentControlGroup: {
        flexBasis: "100%",
        zIndex: "1",
        marginBottom: theme.spacing.xl,

        [theme.fn.smallerThan('sm')]: {
            width: "100%",
        },
    },

    segmentControl: {
        minWidth: "400px",
        [theme.fn.smallerThan('sm')]: {
            minWidth: "1px",
            width: "95%",
        },
    },

    icon: {
        "@media not all and (min-width: 365px)": {
            display: "none",
        },
    },

    alert: {
        display: "flex",
        flexBasis: "100%",
        flexDirection: 'row',
        margin: 0,
        marginBottom: theme.spacing.xl,
        colors: theme.colors.blue[6],
    },

}));

export const FinalStep = () => {
    const { thirdStep, handleThirdStep, handleFormProps, formProps} = useCheckout();
    const { classes } = useStyles();
    const theme = useMantineTheme();
    const [contactOption, setContactOption] = useState("phone")
    const [paymentOption, setPaymentOption] = useState("cash")
    const [privacyAgreement , setPrivacyAgreement] = useState("nie")
    const [newsletterAgreement , setNewsletterAgreement] = useState("nie")
    const [isComment, setIsComment] = useState(false)



    useEffect(() => {
        handleFormProps({isPhone: contactOption === "phone"})
    }, [contactOption])


    useEffect(() => {
        handleFormProps({isCash: paymentOption === "cash"})
    }, [paymentOption])

    useEffect(() => {
        handleFormProps({isPhone: newsletterAgreement === "tak"})
    }, [newsletterAgreement])

    useEffect(() => {
        if(isComment === false){handleFormProps({moreInformation: ''})}
    }, [isComment])





    const handlePrivacyAgreement = (value) => {
        if(value == "tak") {handleThirdStep({isClicked: thirdStep.isClicked, isValid: true })}
        if(value == "nie") {handleThirdStep({isClicked: thirdStep.isClicked, isValid: false })}
        setPrivacyAgreement(value);
    }

    const handleShowCommentArea = () => {
        setIsComment(true)
    };

    const handleAdditionalInfo = (event) => {
        handleFormProps({moreInformation: event.target.value})
    }

    const alertStyle = thirdStep.isValid == false && thirdStep.isClicked == true ? {color: theme.colors.red[6]} : {color: theme.colors.blue[6]};
    const alertColor = thirdStep.isValid == false && thirdStep.isClicked == true ? "red" : "blue";




    return(
        <>
            <Title order={4} className={classes.title}>Kontakt</Title>
            <form className={classes.form}>
                <Alert className={classes.alert}>

                    <p style={{color: theme.colors.blue[6]}}>Wybierz w jaki sposób ma się z Tobą skontaktować nasz pracownik w celu finalizacji zakupu.</p>

                </Alert>
                <SegmentedControl
                    className={classes.segmentControl}
                    color="blue"
                    size="sm"
                    value={contactOption}
                    onChange={setContactOption}
                    // onChange={(value) => receiptHandler(value)}
                    data={[
                        {
                            value: "phone",
                            label: (
                                <Center>
                                    <IconMail className={classes.icon}/>
                                    <Box my={theme.spacing.sm} ml={theme.spacing.xs}>TELEFON</Box>
                                </Center>
                            ),
                        },
                        {
                            value: "mail",
                            label: (
                                <Center>
                                    <IconMail className={classes.icon}/>
                                    <Box my={theme.spacing.sm} ml={theme.spacing.xs}>MAIL</Box>
                                </Center>
                            ),
                        },
                    ]}
                />
            </form>

            <Title order={4} className={classes.title}>Płatność</Title>
            <form className={classes.form}>
                <Alert className={classes.alert}>

                    <p style={{color: theme.colors.blue[6]}}>Wybierz metodę płatności.</p>

                </Alert>
                <SegmentedControl
                    className={classes.segmentControl}
                    color="blue"
                    size="sm"
                    value={paymentOption}
                    onChange={setPaymentOption}
                    // onChange={(value) => receiptHandler(value)}
                    data={[
                        {
                            value: "cash",
                            label: (
                                <Center>
                                    <IconBusinessplan className={classes.icon}/>
                                    <Box my={theme.spacing.sm} ml={theme.spacing.xs}>GOTÓWKA</Box>
                                </Center>
                            ),
                        },
                        {
                            value: "transfer",
                            label: (
                                <Center>
                                    <IconCreditCard className={classes.icon}/>
                                    <Box my={theme.spacing.sm} ml={theme.spacing.xs}>PRZELEW</Box>
                                </Center>
                            ),
                        },
                    ]}
                />
            </form>

            <Title order={4} className={classes.title}>Zgody</Title>
            <form className={classes.form}>

                <Alert className={classes.alert} title="Zgoda na newsletter(opcjonalnie).">

                    <p style={{color: theme.colors.blue[6]}}>
                        Wyrażam zgodę na przesyłanie mi za pomocą środków komunikacji elektronicznej informacji handlowej w postaci Newslettera przez lub na zlecenie Castorama Polska Sp. z o.o., z siedzibą w Warszawie (02-255), przy ul. Krakowiaków 78, wpisaną do rejestru przedsiębiorców Krajowego Rejestru Sądowego prowadzonego przez Sąd Rejonowy dla m. st. Warszawy w Warszawie, XIII Wydział Gospodarczy Krajowego Rejestru Sądowego, pod numerem KRS 0000024785, w rozumieniu ustawy z dnia 18 lipca 2002 r. o świadczeniu usług drogą elektroniczną.
                    </p>

                </Alert>
                <SegmentedControl
                    className={classes.segmentControl}
                    style={{marginBottom: theme.spacing.xl}}
                    color="blue"
                    size="sm"
                    value={newsletterAgreement}
                    onChange={setNewsletterAgreement}
                    // onChange={(value) => receiptHandler(value)}
                    data={[
                        {
                            value: "nie",
                            label: (
                                <Center>
                                    {/*<IconMail className={classes.icon}/>*/}
                                    <Box my={theme.spacing.sm}>NIE</Box>
                                </Center>
                            ),
                        },
                        {
                            value: "tak",
                            label: (
                                <Center>
                                    {/*<IconMail className={classes.icon}/>*/}
                                    <Box my={theme.spacing.sm}>TAK</Box>
                                </Center>
                            ),
                        },
                    ]}
                />



                <Alert className={classes.alert} style={alertStyle} title="Wymagana akceptacja regulaminów." color={`${thirdStep.isValid == false && thirdStep.isClicked == true ? "red" : "blue"}`}>
                    <PrivacyPolicyModal>
                        <p style={alertStyle}>
                        {/*<p style={{color: theme.colors.blue[6]}}>*/}
                           Oświadczam, iż zapoznałem się z <u>Polityką Cookies </u>oraz  <u>Polityką Prywatności</u> i je akceptuję.
                        </p>
                    </PrivacyPolicyModal>

                </Alert>
                <SegmentedControl
                    className={classes.segmentControl}
                    style={{marginBottom: theme.spacing.xl }}
                    color={alertColor}
                    size="sm"
                    value={privacyAgreement}
                    onChange={handlePrivacyAgreement}
                    data={[
                        {
                            value: "nie",
                            label: (
                                <Center>
                                    {/*<IconMail className={classes.icon}/>*/}
                                    <Box my={theme.spacing.sm}>NIE</Box>
                                </Center>
                            ),
                        },
                        {
                            value: "tak",
                            label: (
                                <Center>
                                    {/*<IconMail className={classes.icon}/>*/}
                                    <Box my={theme.spacing.sm}>TAK</Box>
                                </Center>
                            ),
                        },
                    ]}
                />
            </form>

            <Title order={4} className={classes.title}>Uwagi</Title>
            <form className={classes.form} >
                <Group mb={theme.spacing.xl} style={{width: "100%", color: theme.colors.blue[6]}}>

                    {!isComment && (
                        <UnstyledButton onClick={handleShowCommentArea}>
                            <Group style={{color: theme.colors.blue[6]}}>
                                <IconPlus/><Title order={6}>Dodaj uwagi do zamówienia(opcjonalnie)</Title>
                            </Group>
                        </UnstyledButton>
                    )}


                    {isComment && (
                        <Textarea
                            onChange={handleAdditionalInfo}
                            className={classes.item}
                            style={{color: theme.colors.blue[6], flexBasis: "100%"}}
                            size="md"
                            placeholder="Uwagi oraz pytania do zamówienia"
                            label="Uwagi oraz pytania do zamówienia (opcjonalnie)"
                            autosize
                            minRows={4}
                        />
                    )}
                </Group>

            </form>
        </>
    );
}