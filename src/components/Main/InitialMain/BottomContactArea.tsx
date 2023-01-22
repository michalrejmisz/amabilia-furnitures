import {createStyles, Text, Card, RingProgress, Group, Grid, SimpleGrid} from '@mantine/core';


const useStyles = createStyles((theme) => ({
    contactArea: {
        marginTop: "-100px",
        zIndex: 100,
    },

    card: {
        minHeight: '100px',
        border: `solid 1px ${theme.colors[theme.primaryColor][4]}`,
    }

}));

const CardExamples = () => {
    const { classes } = useStyles();

    return(
        <Card radius={"md"} withBorder className={classes.card} p={"md"} m={"lg"}>
            {/* top, right, left margins are negative – -1 * theme.spacing.xl */}
            <Card.Section my={"lg"}>
                First section
                <Text>First text</Text>
            </Card.Section>

            {/* Content that is not inside Card.Section will have theme.spacing.xl spacing on all sides relative to Card */}
            <Text>Some other content</Text>

            {/* right, left margins are negative – -1 * theme.spacing.xl */}
            <Card.Section>Middle section</Card.Section>

            {/* bottom, right, left margins are negative – -1 * theme.spacing.xl */}
            <Card.Section>Last section</Card.Section>
        </Card>
    );
}

const BottomContactArea = () => {
    const { classes } = useStyles();

    return(
        <div className={classes.contactArea}>
            <Grid>
                <Grid.Col xs={4}><CardExamples/></Grid.Col>
                <Grid.Col xs={4}><CardExamples/></Grid.Col>
                <Grid.Col xs={4}><CardExamples/></Grid.Col>
            </Grid>
            <SimpleGrid cols={3}>
                <CardExamples/>
                <CardExamples/>
                <CardExamples/>
            </SimpleGrid>

        </div>
    );
}

export default BottomContactArea;