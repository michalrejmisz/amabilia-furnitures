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
    Container,
} from '@mantine/core'
import {
    IconBrandTwitter,
    IconBrandYoutube,
    IconBrandInstagram,
} from '@tabler/icons'
import { ContactIconsList } from './Icons/ContactIcons'

const useStyles = createStyles((theme) => ({
    wrapper: {
        minHeight: 400,
        boxSizing: 'border-box',
        backgroundImage: `linear-gradient(-60deg, ${theme.colors[theme.primaryColor][4]} 0%, ${
            theme.colors[theme.primaryColor][7]
        } 100%)`,
        padding: theme.spacing.xl * 2.5,

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
}))

const social = [IconBrandTwitter, IconBrandYoutube, IconBrandInstagram]

export function ContactUsForm() {
    const { classes } = useStyles()

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

    return (
        <div className={classes.wrapper}>
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
                    <div className={classes.form}>
                        <TextInput
                            label="Email"
                            placeholder="amabilia@gmail.com"
                            required
                            classNames={{
                                input: classes.input,
                                label: classes.inputLabel,
                            }}
                        />
                        <TextInput
                            label="Imię i nazwisko"
                            placeholder="Jan Kowalski"
                            mt="md"
                            classNames={{
                                input: classes.input,
                                label: classes.inputLabel,
                            }}
                        />
                        <Textarea
                            required
                            label="Twoja wiadomość"
                            placeholder="Zadaj pytaniee"
                            minRows={4}
                            mt="md"
                            classNames={{
                                input: classes.input,
                                label: classes.inputLabel,
                            }}
                        />

                        <Group position="right" mt="md">
                            <Button className={classes.control}>Wyślij</Button>
                        </Group>
                    </div>
                </SimpleGrid>
            </Container>
        </div>
    )
}
