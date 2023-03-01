import { createStyles, Title, Text, Button, Container, Group } from '@mantine/core';
import { useRouter } from "next/router";

const useStyles = createStyles((theme) => ({
    root: {
        height: "100vh",
        paddingTop: "80px",
        paddingBottom: "120px",
        backgroundColor: theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background,
    },

    label: {
        textAlign: 'center',
        fontWeight: 900,
        fontSize: 220,
        lineHeight: 1,
        marginBottom: `calc(${theme.spacing.xl} * 1.5)`,
        color: theme.colors[theme.primaryColor][3],

        [theme.fn.smallerThan('sm')]: {
            fontSize: 120,
        },
    },

    title: {
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        textAlign: 'center',
        fontWeight: 900,
        fontSize: 38,
        color: theme.white,

        [theme.fn.smallerThan('sm')]: {
            fontSize: 32,
        },
    },

    description: {
        maxWidth: "540px",
        margin: 'auto',
        marginTop: theme.spacing.xl,
        marginBottom: `calc(${theme.spacing.xl} * 1.5)`,
        color: theme.colors[theme.primaryColor][1],
    },
}));

export default function FourOhFour(){
    const { classes } = useStyles();
    const router = useRouter();

    const handleRedirect = () => {
        router.push('/');
    };

    // Delay redirect by 5 seconds
    setTimeout(handleRedirect, 3500);


    return (
        <div className={classes.root}>
            <Container>
                <div className={classes.label}>404</div>
                <Title className={classes.title}>Coś poszło nie tak...</Title>
                <Text size="lg" align="center" className={classes.description}>
                    Niestety podana podstrona nie istnieje. Za chwilę przekierujemy Cię na stronę główną.
                </Text>
            </Container>
        </div>
    );
}

