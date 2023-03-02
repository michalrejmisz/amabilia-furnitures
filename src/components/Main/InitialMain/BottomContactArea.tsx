import {
    createStyles,
    Card,
    Grid,
    SimpleGrid,
    Title,
    Box,
    TextInput,
    Checkbox,
    Button,
    Group,
    Loader,
    Modal,
    useMantineTheme,
} from '@mantine/core'
import { useRef, useState } from 'react'
import { useQuery } from '@apollo/client'
import { ENTIRE_STATIC_CONTENT } from '../../../lib/graphql/pagesContent'
import { useForm } from '@mantine/form'
import { PrivacyPolicyModal } from '@/components/UI/PrivacyPolicy/PrivacyPolicy'
import axios from 'axios'
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3'

export const PhoneCallMakeIcon = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="#ffffff"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M20.25 3.75v4.5m0-4.5h-4.5m4.5 0l-6 6m3 12c-8.284 0-15-6.716-15-15V4.5A2.25 2.25 0 014.5 2.25h1.372c.516 0 .966.351 1.091.852l1.106 4.423c.11.44-.054.902-.417 1.173l-1.293.97a1.062 1.062 0 00-.38 1.21 12.035 12.035 0 007.143 7.143c.441.162.928-.004 1.21-.38l.97-1.293a1.125 1.125 0 011.173-.417l4.423 1.106c.5.125.852.575.852 1.091V19.5a2.25 2.25 0 01-2.25 2.25h-2.25z"
            />
        </svg>
    )
}

export const PhoneCallReceiveIcon = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.25 9.75v-4.5m0 4.5h4.5m-4.5 0l6-6m-3 18c-8.284 0-15-6.716-15-15V4.5A2.25 2.25 0 014.5 2.25h1.372c.516 0 .966.351 1.091.852l1.106 4.423c.11.44-.054.902-.417 1.173l-1.293.97a1.062 1.062 0 00-.38 1.21 12.035 12.035 0 007.143 7.143c.441.162.928-.004 1.21-.38l.97-1.293a1.125 1.125 0 011.173-.417l4.423 1.106c.5.125.852.575.852 1.091V19.5a2.25 2.25 0 01-2.25 2.25h-2.25z"
            />
        </svg>
    )
}

export const MailIcon = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
            />
        </svg>
    )
}

const useStyles = createStyles((theme) => ({
    contactArea: {
        marginLeft: '15px',
        marginRight: '15px',
        position: 'absolute',
        top: '850px',
        marginTop: '-60px',
    },

    card: {
        margin: '0px',
        padding: '0px',
        minHeight: '140px',
        border: `solid 2px ${theme.colors[theme.primaryColor][4]}`,
        justifyContent: 'center',
        alignItems: 'center',

        [theme.fn.smallerThan('md')]: {
            minHeight: '0',
            padding: '10px',
        },

        [theme.fn.smallerThan('sm')]: {
            minHeight: '0',
            padding: '10px',
        },

        [theme.fn.smallerThan('xs')]: {
            minHeight: '0',
        },

        '&:hover': {
            boxShadow: `${theme.shadows.md} !important`,
            transform: 'scale(1.05)',
        },

        svg: {
            stroke: theme.colors[theme.primaryColor][8],
            [theme.fn.smallerThan('sm')]: {},
        },
    },

    gridBoth: {
        margin: '0px',
        padding: '0px',
        flexWrap: 'nowrap',
        flexDirection: 'row',
        alignItems: 'center',
        height: '100%',
    },

    gridSvg: {
        margin: '0px',
        padding: '0px',
        maxWidth: '50px',
        maxHeight: '50px',
        justifyContent: 'center',
        alignItems: 'center',
        float: 'left',
        [theme.fn.smallerThan('sm')]: {
            padding: 0,
            maxWidth: 100,
            maxHeight: 100,
        },
    },

    gridTitle: {
        padding: '0px',
        float: 'right',
    },

    gridClass: {
        gap: '30px',

        [theme.fn.smallerThan('md')]: {
            gap: '10px',
        },
    },

    svgPadding: {
        padding: '20px',
        [theme.fn.smallerThan('md')]: {
            marginTop: '10px',
            padding: '0px',
            paddingRight: '80px',
            paddingLeft: '80px',
        },
        [theme.fn.smallerThan('sm')]: {
            marginTop: '10px',
            padding: '0px',
            paddingRight: '80px',
            paddingLeft: '80px',
        },
        [theme.fn.smallerThan('xs')]: {
            padding: '20px',
        },
    },

    form: {
        color: theme.white,
        textInput: {
            color: 'red',
        },

        label: {
            width: '100%',
            textAlign: 'left',
            color: theme.white,
        },

        error: {
            fontSize: 'large',
        },
    },
}))

interface CardProps {
    svg: JSX.Element
    title: string
    text: string
    onClick?: () => void
}

const CardExamples = ({ svg, title, text, onClick }: CardProps) => {
    const { classes } = useStyles()
    const theme = useMantineTheme()

    return (
        <Card
            radius={'lg'}
            withBorder
            className={classes.card}
            onClick={onClick}
        >
            <Grid>
                <Grid.Col
                    span={4}
                    xs={12}
                    sm={12}
                    md={4}
                    lg={4}
                    xl={4}
                    className={classes.svgPadding}
                >
                    {svg}
                </Grid.Col>
                <Grid.Col span={8} xs={12} sm={12} md={8} lg={8} xl={8}>
                    <Title
                        order={5}
                        color={theme.colors[theme.primaryColor][7]}
                        mt={'md'}
                    >
                        {title}
                    </Title>
                    <Title
                        order={6}
                        color={theme.colors[theme.primaryColor][5]}
                        mt={'xs'}
                    >
                        {text}
                    </Title>
                </Grid.Col>
            </Grid>
        </Card>
    )
}

const ModalContent = ({ handleModal }: { handleModal: () => void }) => {
    const { classes } = useStyles()
    const theme = useMantineTheme()
    const { executeRecaptcha } = useGoogleReCaptcha()
    const [isSend, setIsSend] = useState(false)
    const [isError, setIsError] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const contactForm = useForm({
        initialValues: {
            name: '',
            phoneNumber: '',
            termsOfService: false,
        },

        validate: {
            name: (value) => (value.length < 2 ? 'Minimum dwa znaki' : null),
            phoneNumber: (value) =>
                value.length < 9 ? 'Za krótki numer telefonu!' : null,
            termsOfService: (value) =>
                value !== true ? 'Wymagana zgoda' : null,
        },
    })

    const handleSubmit = async () => {
        setIsLoading(true)
        if (contactForm.isValid()) {
            let form = {
                formType: 'phone',
                imie: contactForm.getInputProps('name').value,
                numer: contactForm.getInputProps('phoneNumber').value,
            }
            let token

            if (executeRecaptcha) {
                token = await executeRecaptcha()
            } else {
                console.error('reCaptcha script not loaded')
                return
            }

            let formName = 'FormPhone'
            const response = await axios
                .post('https://creator.amabilia-meble.pl/api/ezforms/submit', {
                    token,
                    formData: form,
                })
                .then((res) => {
                    setIsLoading(false)
                    setIsSend(true)
                    contactForm.reset()
                })
                .catch((error) => {
                    setIsLoading(false)
                    setIsError(true)
                })
                .finally(() => {
                    setTimeout(function () {
                        handleModal(false)
                    }, 1500)
                })
        }
    }
    const termsOfServiceText = (
        <PrivacyPolicyModal>
            <a style={{ color: theme.white }}>
                <u>Wyrażam zgodę na przetwarzanie danych osobowych.</u>
            </a>
        </PrivacyPolicyModal>
    )

    return (
        <div className={classes.form}>
            <Box
                sx={{ maxWidth: 300, marginTop: '30px', width: '300px' }}
                mx="auto"
            >
                {isLoading ? (
                    <Loader color="white" style={{ margin: '30px' }} />
                ) : isError ? (
                    <Title
                        order={5}
                        style={{ marginTop: '30px', marginBottom: '30px' }}
                    >
                        Niestety wystąpiły problemy z uwierzytelnieniem. Prosimy
                        spóbować ponownie później!{' '}
                    </Title>
                ) : isSend ? (
                    <Title
                        order={5}
                        style={{ marginTop: '30px', marginBottom: '30px' }}
                    >
                        Dziękujemy! W krótce się z Tobą skontaktujemy.{' '}
                    </Title>
                ) : (
                    <>
                        <Title order={3}>
                            Zostaw nam swój numer, oddzwonimy!
                        </Title>
                        <form onSubmit={contactForm.onSubmit(handleSubmit)}>
                            <TextInput
                                styles={{
                                    error: {
                                        textAlign: 'left',
                                    },
                                }}
                                style={{
                                    paddingTop: '15px',
                                    paddingBottom: '15px',
                                }}
                                label="Imię"
                                placeholder="Jan"
                                withAsterisk
                                {...contactForm.getInputProps('name')}
                                error={contactForm.errors.name}
                            />

                            <TextInput
                                styles={{
                                    error: {
                                        textAlign: 'left',
                                    },
                                }}
                                style={{ paddingBottom: '15px' }}
                                label="Numer"
                                placeholder="777-222-333"
                                withAsterisk
                                {...contactForm.getInputProps('phoneNumber')}
                                error={contactForm.errors.phoneNumber}
                            />

                            <Checkbox
                                styles={{
                                    error: {
                                        textAlign: 'left',
                                    },
                                }}
                                style={{ paddingTop: '15px' }}
                                mt="md"
                                label={termsOfServiceText}
                                {...contactForm.getInputProps(
                                    'termsOfService',
                                    { type: 'checkbox' }
                                )}
                                error={contactForm.errors.termsOfService}
                            />

                            <Group position="right" mt="md">
                                <Button
                                    type="submit"
                                    style={{
                                        backgroundColor:
                                            theme.colors[theme.primaryColor][8],
                                    }}
                                >
                                    Wyślij
                                </Button>
                            </Group>
                        </form>
                    </>
                )}
            </Box>
        </div>
    )
}

interface BottomContactAreaProps {
    handleScrollToMail: () => void
}

const BottomContactArea = ({ handleScrollToMail }: BottomContactAreaProps) => {
    const { classes } = useStyles()
    const footerRef = useRef(null)
    const [opened, setOpened] = useState(false)
    const theme = useMantineTheme()

    const { loading, error, data } = useQuery(ENTIRE_STATIC_CONTENT, {
        fetchPolicy: 'network-only',
        nextFetchPolicy: 'cache-first',
    })

    const handleModal = (value) => {
        setOpened(value)
    }

    const contactOptions = [
        {
            svg: <PhoneCallMakeIcon />,
            title: 'Kliknij i zadzwoń!',
            text: `${data?.stronaTytulowaZdjecieBiurkaInformacje?.data?.attributes?.KliknijZadzwon ?? ''}`,
            onClick: () =>
                window.open(
                    `tel:+48${data?.stronaTytulowaZdjecieBiurkaInformacje?.data?.attributes?.KliknijZadzwon ?? ''}`
                ),
        },
        {
            svg: <PhoneCallReceiveIcon />,
            title: 'Kliknij i zostaw numer',
            text: 'A my oddzwonimy!',
            onClick: () => handleModal(true),
        },
        {
            svg: <MailIcon />,
            title: 'Wyślij maila',
            text: 'Zostaw wiadomość za pomocą formularza',
            onClick: () => handleScrollToMail(),
        },
    ]

    return (
        <div className={classes.contactArea}>
            <Modal
                styles={{
                    modal: {
                        backgroundImage: `linear-gradient(-60deg, ${theme.colors[theme.primaryColor][4]} 0%, ${
                            theme.colors[theme.primaryColor][7]
                        } 100%)`,
                    },
                }}
                className={classes.form}
                opened={opened}
                onClose={() => setOpened(false)}
            >
                <ModalContent handleModal={handleModal} />
            </Modal>
            <SimpleGrid
                className={classes.gridClass}
                cols={3}
                breakpoints={[
                    { minWidth: 1, cols: 1 },
                    { minWidth: 501, cols: 3 },
                ]}
            >
                {contactOptions.map((item) => (
                    <CardExamples key={item.text} {...item} />
                ))}
            </SimpleGrid>
        </div>
    )
}

export default BottomContactArea
