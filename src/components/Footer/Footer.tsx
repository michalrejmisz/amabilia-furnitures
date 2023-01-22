import {Container, createStyles} from "@mantine/core";

const useStyles = createStyles((theme) => ({
    footer: {
        // backgroundColor: theme.colors[theme.primaryColor][9],
        backgroundColor: theme.colors.gray[7],
        minHeight: "30vh",
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