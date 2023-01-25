import {Container, createStyles} from "@mantine/core";

const useStyles = createStyles((theme) => ({
    footer: {
        // backgroundColor: theme.colors[theme.primaryColor][9],
        backgroundColor: theme.colors.gray[7],
        minHeight: "10vh",

        [theme.fn.smallerThan('sm')]: {
            // minHeight: '20vh',
        }
    }
}));


const Footer = () => {
    const { classes } = useStyles();

    return(
        <footer className={classes.footer}>
            <Container>
                Amabilia Kontakt
            </Container>
        </footer>
    )
}

export default Footer;