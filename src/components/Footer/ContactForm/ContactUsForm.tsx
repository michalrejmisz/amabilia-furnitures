import {
    createStyles,
    Text,
    Title,
    SimpleGrid,
    TextInput,
    Textarea,
    Button,
    Group,
    ActionIcon,
    LoadingOverlay,
    Loader,
    Container,
    Checkbox,
    useMantineTheme,
    Modal,
} from '@mantine/core'
import {
    IconBrandTwitter,
    IconBrandYoutube,
    IconBrandInstagram,
} from '@tabler/icons'
import { ContactIconsList } from './Icons/ContactIcons'
import React, { Children, useState } from 'react'
import { PrivacyPolicyModal } from '@/components/UI/PrivacyPolicy/PrivacyPolicy'
import { isEmail, useForm } from '@mantine/form'
import axios from 'axios'
import {
    GoogleReCaptchaProvider,
    useGoogleReCaptcha,
} from 'react-google-recaptcha-v3'

const useStyles = createStyles((theme) => ({
    wrapper: {
        minHeight: 400,
        boxSizing: 'border-box',
        // backgroundImage: `linear-gradient(-60deg, ${theme.   colors[theme.primaryColor][4]} 0%, ${
        //     theme.colors[theme.primaryColor][7]
        // } 100%)`,
        // borderRadius: theme.radius.md,
        padding: theme.spacing.xl * 1.5,

        [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
            padding: theme.spacing.xl * 1.5,
        },
    },

    title: {
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        color: theme.white,
        lineHeight: 1,
    },

    description: {
        color: theme.colors[theme.primaryColor][0],
        // maxWidth: 300,

        [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
            maxWidth: '100%',
        },
    },

    form: {
        backgroundColor: theme.white,
        padding: theme.spacing.xl,
        borderRadius: theme.radius.md,
        boxShadow: theme.shadows.lg,
    },

    social: {
        color: theme.white,

        '&:hover': {
            color: theme.colors[theme.primaryColor][1],
        },
    },

    input: {
        backgroundColor: theme.white,
        borderColor: theme.colors.gray[4],
        color: theme.black,

        '&::placeholder': {
            color: theme.colors.gray[5],
        },
    },

    inputLabel: {
        color: theme.black,
    },

    control: {
        backgroundColor: theme.colors[theme.primaryColor][6],
    },

    formModal: {
        // backgroundColor: theme.colors[theme.primaryColor][4]
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

const social = [IconBrandTwitter, IconBrandYoutube, IconBrandInstagram]

export function ContactUsForm() {
    const { classes } = useStyles()
    const theme = useMantineTheme()
    const { executeRecaptcha } = useGoogleReCaptcha()
    const [opened, setOpened] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)

    const contactForm = useForm({
        initialValues: {
            name: '',
            email: '',
            message: '',
            termsOfService: false,
        },

        validate: {
            name: (value) => (value.length < 2 ? 'Minimum dwa znaki' : null),
            message: (value) =>
                value.length < 1 ? 'Wiadomość jest pusta!' : null,
            email: isEmail('Wprowadź poprawny email'),
            termsOfService: (value) =>
                value !== true ? 'Wymagana zgoda' : null,
        },
    })

    const handleModal = (value) => {
        setOpened(value)
    }

    const handleSubmit = async () => {
        if (contactForm.isValid()) {
            setIsLoading(true)
            handleModal(true)
            let mailForm = {
                formType: 'mail',
                imie: contactForm.getInputProps('name').value,
                email: contactForm.getInputProps('email').value,
                wiadomosc: contactForm.getInputProps('message').value,
            }
            let token

            if (executeRecaptcha) {
                token = await executeRecaptcha()
            } else {
                return
            }

            let formName = 'FormMail'
            const response = await axios
                .post('https://creator.amabilia-meble.pl/api/ezforms/submit', {
                    token,
                    formData: mailForm,
                })
                .then((res) => {
                    setIsLoading(false)
                    contactForm.reset()
                })
                .catch((error) => {
                    setIsLoading(false)
                    setIsError(true)
                    // error.response.status Check status code
                })
                .finally(() => {
                    setTimeout(function () {
                        handleModal(false)
                    }, 1500)
                })
        }
        // Do something with the form data, like send it to a server
        // or update a state variable to display a success message
    }

    const icons = social.map((Icon, index) => (
        <ActionIcon
            key={index}
            size={28}
            className={classes.social}
            variant="transparent"
        >
            <Icon size={22} stroke={1.5} />
        </ActionIcon>
    ))

    const termsOfServiceText = (
        <PrivacyPolicyModal>
            <a>
                <u>Wyrażam zgodę na przetwarzanie danych osobowych.</u>
            </a>
        </PrivacyPolicyModal>
    )

    return (
        <div className={classes.wrapper}>
            <Modal
                styles={{
                    modal: {
                        backgroundImage: `linear-gradient(-60deg, ${theme.colors[theme.primaryColor][4]} 0%, ${
                            theme.colors[theme.primaryColor][7]
                        } 100%)`,
                    },
                }}
                className={classes.formModal}
                opened={opened}
                onClose={() => setOpened(false)}
            >
                {isLoading ? (
                    // <LoadingOverlay visible={isLoading} overlayBlur={0} />
                    <Loader style={{ margin: '30px' }} color="white" />
                ) : isError ? (
                    <Title
                        order={5}
                        style={{ margin: '30px', color: theme.white }}
                    >
                        Niestety wystąpiły problemy z uwierzytelnieniem. Prosimy
                        spóbować ponownie później!{' '}
                    </Title>
                ) : (
                    <Title
                        order={5}
                        style={{ margin: '30px', color: theme.white }}
                    >
                        Dziękujemy! W krótce się z Tobą skontaktujemy.
                    </Title>
                )}
            </Modal>
            <Container>
                <SimpleGrid
                    cols={2}
                    spacing={50}
                    breakpoints={[{ maxWidth: 'sm', cols: 1 }]}
                >
                    <div>
                        <Title className={classes.title}>Skontaktuj Się</Title>
                        <Text className={classes.description} mt="sm" mb={30}>
                            Zostaw nam wiadomość, a odpiszemy w ciągu 24 godzin
                            roboczych.
                        </Text>

                        <ContactIconsList variant="white" />
                    </div>
                    <form
                        onSubmit={contactForm.onSubmit(handleSubmit)}
                        className={classes.form}
                    >
                        <TextInput
                            styles={{
                                error: {
                                    textAlign: 'left',
                                },
                            }}
                            withAsterisk
                            label="Email"
                            placeholder="amabilia.poznan@gmail.com"
                            classNames={{
                                input: classes.input,
                                label: classes.inputLabel,
                            }}
                            {...contactForm.getInputProps('email')}
                            error={contactForm.errors.email}
                        />
                        <TextInput
                            styles={{
                                error: {
                                    textAlign: 'left',
                                },
                            }}
                            withAsterisk
                            label="Imię i nazwisko"
                            placeholder="Jan Kowalski"
                            mt="md"
                            classNames={{
                                input: classes.input,
                                label: classes.inputLabel,
                            }}
                            {...contactForm.getInputProps('name')}
                            error={contactForm.errors.name}
                        />
                        <Textarea
                            styles={{
                                error: {
                                    textAlign: 'left',
                                },
                            }}
                            withAsterisk
                            label="Twoja wiadomość"
                            placeholder="Zadaj pytanie"
                            minRows={4}
                            mt="md"
                            classNames={{
                                input: classes.input,
                                label: classes.inputLabel,
                            }}
                            {...contactForm.getInputProps('message')}
                            error={contactForm.errors.message}
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
                            {...contactForm.getInputProps('termsOfService', {
                                type: 'checkbox',
                            })}
                            error={contactForm.errors.termsOfService}
                        />

                        <Group position="right" mt="md">
                            <Button type="submit" className={classes.control}>
                                Wyślij
                            </Button>
                        </Group>
                    </form>
                </SimpleGrid>
            </Container>
            {/*Copyright © Amabilia 2023*/}
        </div>
    )
}
