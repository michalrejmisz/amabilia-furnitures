import {
    createStyles,
    Group,
    useMantineTheme,
    Flex,
    TextInput,
    Title,
    Transition,
    SegmentedControl,
    Box,
    Center,
    Alert,
} from '@mantine/core'
import {
    IconUser,
    IconReceiptOff,
    IconReceipt,
    IconPackage,
    IconAlertCircle,
} from '@tabler/icons'
import React, { useEffect, useState } from 'react'
import { useId } from '@mantine/hooks'
import { useForm, isEmail } from '@mantine/form'
import { useCheckout } from '@/context/CheckoutContext'
import { useQuery } from '@apollo/client'
import { ENTIRE_STATIC_CONTENT } from '@/lib/graphql/pagesContent'

interface CustomerBoxProps {
    Icon: React.FC<any>
    description: String
}

const formStyles = createStyles((theme) => ({
    title: {
        margin: '0px 10px 15px 10px',
        float: 'left',
        fontFamily: 'Roboto, sans-serif',
        textTransform: 'uppercase',
        fontWeight: '100',
        letterSpacing: '2.5px',
        color: theme.colors[theme.primaryColor][6],
        '&:not(:first-child)': {
            marginTop: theme.spacing.xl,
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

    item: {
        flex: '1',
        marginBottom: theme.spacing.xs,
        marginRight: theme.spacing.md,
        flexBasis: '45%',
        color: theme.colors[theme.primaryColor][6],
        '&:nth-child(2n)': {
            marginRight: 0,
        },

        [theme.fn.smallerThan('sm')]: {
            flexBasis: '100%',
            marginRight: 0,
        },
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

    inputsGroup: {
        display: 'flex',
        height: '100%',
        flexDirection: 'row',
        alignItems: 'left',
        width: '100%',
        justifyContent: 'space-between',
        flexFlow: 'wrap',
        paddingTop: theme.spacing.xs,
        textAlign: 'left',
        [theme.fn.smallerThan('sm')]: {
            // width: "95%",
            // minWidth: "1px",
            // width: "100%",
        },
    },

    icon: {
        '@media not all and (min-width: 365px)': {
            display: 'none',
        },
    },

    alert: {
        display: 'flex',
        flexBasis: '100%',
        flexDirection: 'row',
        margin: 0,
        marginBottom: theme.spacing.xl,
        colors: theme.colors.blue[6],
    },
}))

const CustomerForm = () => {
    const id = useId()
    const theme = useMantineTheme()
    const {
        handleSecondStepValid,
        isSecondStepClicked,
        handleSecondStep,
        secondStep,
        formProps,
        handleFormProps,
    } = useCheckout()
    const userForm = useForm({
        validateInputOnBlur: true,
        initialValues: {
            firstName: formProps.Imie,
            secondName: formProps.Nazwisko,
            email: formProps.Email,
            phoneNumber: formProps.Telefon,
        },
        validate: {
            firstName: (value) =>
                value.length < 2
                    ? 'Imię musi posiadać przynajmniej dwa znaki'
                    : null,
            secondName: (value) =>
                value.length < 2
                    ? 'Nazwisko musi posiadać przynajmniej dwa znaki'
                    : null,
            email: isEmail('Wprowadź poprawny email'),
            phoneNumber: (value) =>
                value.length < 9 ? 'Wprowadź poprawny numer telefonu' : null,
        },
        validateInputOnChange: [
            'firstName',
            'secondName',
            'email',
            'phoneNumber',
        ],
    })

    const receiptForm = useForm({
        validateInputOnBlur: true,
        initialValues: {
            nip: formProps.Nip,
            companyName: formProps.NazwaFirmy,
        },
        validate: {
            nip: (value) =>
                value.length != 10 ? 'NIP składa się z 10 cyfr' : null,
        },
        validateInputOnChange: ['nip', 'companyName'],
    })

    const deliveryForm = useForm({
        validateInputOnBlur: true,
        initialValues: {
            city: formProps.Miejscowosc,
            postalCode: formProps.KodPocztowy,
            street: formProps.Street,
            houseNumber: formProps.houseNumber,
        },
        validate: {
            city: (value) =>
                value.length < 1 ? 'Pole nie może być puste' : null,
            postalCode: (value) =>
                value.length < 1 ? 'Pole nie może być puste' : null,
            street: (value) =>
                value.length < 1 ? 'Pole nie może być puste' : null,
            houseNumber: (value) =>
                value.length < 1 ? 'Pole nie może być puste' : null,
        },
        validateInputOnChange: [
            'firstName',
            'postalCode',
            'street',
            'houseNumber',
        ],
    })

    const { classes } = formStyles()
    const [value, setValue] = useState('')
    const [segmentControlReceipt, setSegmentControlReceipt] = useState('false')
    const [mountReceipt, setMountReceipt] = useState(
        segmentControlReceipt === 'true'
    )
    const [segmentControlDelivery, setSegmentControlDelivery] =
        useState('false')
    const [mountDelivery, setMountDelivery] = useState(
        segmentControlDelivery === 'true'
    )
    const [formChange, setFormChange] = useState()
    const { data } = useQuery(ENTIRE_STATIC_CONTENT)

    useEffect(() => {
        handleFormProps({ isFaktura: segmentControlReceipt === 'true' })
        setMountReceipt(segmentControlReceipt === 'true')
    }, [segmentControlReceipt])

    useEffect(() => {
        setMountDelivery(segmentControlDelivery === 'true')
        handleFormProps({ isDelivery: segmentControlDelivery === 'true' })
    }, [segmentControlDelivery])

    useEffect(() => {
        if (secondStep.isClicked == true) {
            userForm.validate()
            if (segmentControlReceipt === 'true') {
                receiptForm.validate()
            }
            if (segmentControlDelivery === 'true') {
                deliveryForm.validate()
            }
            {
                handleSecondStep({ ...secondStep, isClicked: false })
            }
        }
    }, [secondStep.isClicked])

    useEffect(() => {
        if (userForm.isValid()) {
            handleFormProps({
                Imie: userForm.getInputProps('firstName').value,
                Nazwisko: userForm.getInputProps('secondName').value,
                Email: userForm.getInputProps('email').value,
                Telefon: userForm.getInputProps('phoneNumber').value,
            })
            if (segmentControlReceipt === 'true') {
                if (receiptForm.isValid()) {
                    handleFormProps({
                        Nip: receiptForm.getInputProps('nip').value,
                        NazwaFirmy:
                            receiptForm.getInputProps('companyName').value,
                    })
                }
                if (segmentControlDelivery === 'true') {
                    handleFormProps({
                        Miejscowosc: deliveryForm.getInputProps('city').value,
                        Street: deliveryForm.getInputProps('street').value,
                        KodPocztowy:
                            deliveryForm.getInputProps('postalCode').value,
                        houseNumber:
                            deliveryForm.getInputProps('houseNumber').value,
                    })
                    if (receiptForm.isValid() && deliveryForm.isValid()) {
                        handleSecondStep({ ...secondStep, isValid: true })
                    } else {
                        handleSecondStep({ ...secondStep, isValid: false })
                    }
                } else {
                    if (receiptForm.isValid()) {
                        handleSecondStep({ ...secondStep, isValid: true })
                    } else {
                        handleSecondStep({ ...secondStep, isValid: false })
                    }
                }
            } else {
                if (segmentControlDelivery === 'true') {
                    if (deliveryForm.isValid()) {
                        handleSecondStep({ ...secondStep, isValid: true })
                        handleFormProps({
                            Miejscowosc:
                                deliveryForm.getInputProps('city').value,
                            Street: deliveryForm.getInputProps('street').value,
                            KodPocztowy:
                                deliveryForm.getInputProps('postalCode').value,
                            houseNumber:
                                deliveryForm.getInputProps('houseNumber').value,
                        })
                    } else {
                        handleSecondStep({ ...secondStep, isValid: false })
                    }
                } else {
                    handleSecondStep({ ...secondStep, isValid: true })
                }
            }
        } else {
            handleSecondStep({ ...secondStep, isValid: false })
        }
    }, [
        secondStep.isUserValid,
        secondStep.isReceiptValid,
        secondStep.isDeliveryValid,
        segmentControlReceipt,
        segmentControlDelivery,
        formChange,
    ])

    const handleFormChange = (value) => {
        setFormChange(value)
    }

    // Phone number Mask
    const formatPhoneNumber = (value) => {
        const phoneNumber = value.replace(/[^\d]/g, '')
        const phoneNumberLength = phoneNumber.length

        if (phoneNumberLength <= 3) {
            return phoneNumber
        }

        if (phoneNumberLength <= 6) {
            return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3)}`
        }

        return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 9)}`
    }

    const handleValueChange = (event) => {
        setValue(formatPhoneNumber(event.target.value))
    }

    return (
        <div style={{ float: 'left' }}>
            <Title order={4} className={classes.title}>
                Dane odbiorcy
            </Title>
            <form className={classes.form} onChange={handleFormChange}>
                <TextInput
                    label="Imię "
                    placeholder="Jan"
                    {...userForm.getInputProps('firstName')}
                    withAsterisk
                    className={classes.item}
                    error={userForm.errors.firstName}
                />

                <TextInput
                    color={'red'}
                    label="Nazwisko "
                    placeholder="Kowalski"
                    {...userForm.getInputProps('secondName')}
                    withAsterisk
                    className={classes.item}
                    error={userForm.errors.secondName}
                />

                <TextInput
                    label="Email "
                    placeholder="jankowalski@wp.pl"
                    withAsterisk
                    {...userForm.getInputProps('email')}
                    className={classes.item}
                    error={userForm.errors.email}
                />

                <TextInput
                    type="tel"
                    label="Numer telefonu"
                    withAsterisk
                    placeholder="777-666-555"
                    {...userForm.getInputProps('phoneNumber')}
                    className={classes.item}
                    error={userForm.errors.phoneNumber}
                />
            </form>

            <Title order={4} className={classes.title}>
                Faktura
            </Title>
            <form className={classes.form}>
                <Group className={classes.segmentControlGroup}>
                    <SegmentedControl
                        className={classes.segmentControl}
                        color="blue"
                        size="sm"
                        value={segmentControlReceipt}
                        onChange={setSegmentControlReceipt}
                        data={[
                            {
                                value: 'false',
                                label: (
                                    <Center>
                                        <IconReceiptOff
                                            className={classes.icon}
                                        />
                                        <Box my={theme.spacing.sm}>
                                            BEZ FAKTURY
                                        </Box>
                                    </Center>
                                ),
                            },
                            {
                                value: 'true',
                                label: (
                                    <Center>
                                        <IconReceipt className={classes.icon} />
                                        <Box my={theme.spacing.sm}>FAKTURA</Box>
                                    </Center>
                                ),
                            },
                        ]}
                    />
                </Group>

                <Transition
                    mounted={mountReceipt}
                    transition="scale-y"
                    duration={400}
                    timingFunction="ease"
                >
                    {(styles) => (
                        <form
                            className={classes.inputsGroup}
                            onChange={handleFormChange}
                        >
                            <TextInput
                                className={classes.item}
                                style={{ ...styles }}
                                {...receiptForm.getInputProps('nip')}
                                type="number"
                                label="NIP"
                                withAsterisk
                                placeholder="0000004579"
                                error={receiptForm.errors.nip}
                            />

                            <TextInput
                                className={classes.item}
                                style={{ ...styles }}
                                {...receiptForm.getInputProps('companyName')}
                                type="text"
                                label="Nazwa Firmy (opcjonalnie)"
                                placeholder="Wprowadź nazwę firmy"
                            />
                        </form>
                    )}
                </Transition>
            </form>

            <Title order={4} className={classes.title}>
                Dostawa
            </Title>
            <form className={classes.form}>
                <form className={classes.segmentControlGroup}>
                    <SegmentedControl
                        className={classes.segmentControl}
                        color="blue"
                        size="sm"
                        value={segmentControlDelivery}
                        onChange={setSegmentControlDelivery}
                        data={[
                            {
                                value: 'false',
                                label: (
                                    <Center>
                                        <IconUser className={classes.icon} />
                                        <Box my={theme.spacing.sm}>
                                            ODBIÓR OSOBISTY
                                        </Box>
                                    </Center>
                                ),
                            },
                            {
                                value: 'true',
                                label: (
                                    <Center>
                                        <IconPackage className={classes.icon} />
                                        <Box my={theme.spacing.sm}>DOSTAWA</Box>
                                    </Center>
                                ),
                            },
                        ]}
                    />
                </form>

                <Transition
                    mounted={mountDelivery}
                    transition="scale-y"
                    duration={400}
                    timingFunction="ease"
                >
                    {(styles) => (
                        <>
                            <Alert
                                icon={<IconAlertCircle size={24} />}
                                title="Uwaga!"
                                className={classes.alert}
                                style={{ ...styles }}
                            >
                                {data?.zamowienieDostawa?.data?.attributes?.InformacjaMyslnik?.map(
                                    (item, index) => {
                                        return (
                                            <p
                                                key={index}
                                                style={{
                                                    color: theme.colors.blue[6],
                                                }}
                                            >
                                                {item.Myslnik}
                                            </p>
                                        )
                                    }
                                )}
                            </Alert>
                            <form
                                className={classes.inputsGroup}
                                onChange={handleFormChange}
                            >
                                <TextInput
                                    style={{ ...styles }}
                                    {...deliveryForm.getInputProps('city')}
                                    type="text"
                                    label="Miejscowość"
                                    withAsterisk
                                    placeholder="Poznań"
                                    className={classes.item}
                                    error={deliveryForm.errors.city}
                                />
                                <TextInput
                                    style={{ ...styles }}
                                    type="text"
                                    label="Kod Pocztowy"
                                    withAsterisk
                                    placeholder="60-123"
                                    {...deliveryForm.getInputProps(
                                        'postalCode'
                                    )}
                                    className={classes.item}
                                    error={deliveryForm.errors.postalCode}
                                />

                                <TextInput
                                    style={{ ...styles }}
                                    type="text"
                                    label="Ulica/Osiedle"
                                    withAsterisk
                                    placeholder="ul. Poznańska"
                                    {...deliveryForm.getInputProps('street')}
                                    className={classes.item}
                                    error={deliveryForm.errors.street}
                                />

                                <TextInput
                                    style={{ ...styles }}
                                    type="text"
                                    label="Numer Domu/Nr Lokalu(opcjonalnie)"
                                    withAsterisk
                                    placeholder="171/12b"
                                    {...deliveryForm.getInputProps(
                                        'houseNumber'
                                    )}
                                    className={classes.item}
                                    error={deliveryForm.errors.houseNumber}
                                />
                            </form>
                        </>
                    )}
                </Transition>
            </form>
        </div>
    )
}

export const CustomerDetailsStep = () => {
    return (
        <Flex direction="column" align={'center'} mt={'25px'}>
            <CustomerForm />
        </Flex>
    )
}
