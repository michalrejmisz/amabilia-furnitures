import {
    Grid,
    Card,
    Image,
    Center,
    createStyles, Text, Group
} from '@mantine/core'
import { IconGasStation, IconGauge, IconManualGearbox, IconUsers, IconShoppingCart } from '@tabler/icons';

const useStyles = createStyles((theme, _params, getRef) => ({
    onHover: {
        ref: getRef('onHover'),
        display: "none",

        margin: 0,
        position: "absolute",
        bottom: 0,
        left: 0,
        backgroundColor: theme.colors[theme.primaryColor][7],
        color: "white",
        height: '50px',
        width: '100%',
        textAlign: "center",
        justifyContent: "center",
    },

    card :{
        '&:hover': {

        },

        [`&:hover .${getRef('onHover')}`]: {
            display: "block",
        }
    },

    imageSection: {
        padding: theme.spacing.md,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottom: `1px solid ${
            theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
        }`,
    },

    label: {
        marginBottom: theme.spacing.xs,
        lineHeight: 1,
        fontWeight: 700,
        fontSize: theme.fontSizes.xs,
        letterSpacing: -0.25,
        textTransform: 'uppercase',
    },

    section: {
        padding: theme.spacing.md,
        borderTop: `1px solid ${
            theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
        }`,
    },

    icon: {
        marginRight: 5,
        color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[5],
    },

}))

const SingleProductFrame = () => {
    const { classes } = useStyles();

    return(
        <Card withBorder className={classes.card}>
            <Card.Section className={classes.imageSection}>
                <Image src="https://i.imgur.com/ZL52Q2D.png" alt="Tesla Model S" />
            </Card.Section>

            <Card.Section className={classes.onHover}>
                <Center>
                    Dodaj do koszyka <IconShoppingCart size={25} stroke={1.5}/>
                </Center>
            </Card.Section>

            <Card.Section className={classes.section} mt="md">
                <Text size="sm" color="dimmed" className={classes.label}>
                    Basic configuration
                </Text>

                <Group spacing={8} mb={-8}>
                    <Center key="testuj">
                        <IconGasStation size={18} className={classes.icon} stroke={1.5} />
                        <Text size="xs">Testuje?</Text>
                    </Center>

                    <Center key="testuj">
                        <IconGasStation size={18} className={classes.icon} stroke={1.5} />
                        <Text size="xs">Testuje?</Text>
                    </Center>
                </Group>
            </Card.Section>

        </Card>
    )
}


const ProductsGrid = () => {
    return(
        <Grid>
            <Grid.Col span={12} xs={6} md={4} ><SingleProductFrame/></Grid.Col>
            <Grid.Col span={12} xs={6} md={4} ><SingleProductFrame/></Grid.Col>
            <Grid.Col span={12} xs={6} md={4} ><SingleProductFrame/></Grid.Col>
            <Grid.Col span={12} xs={6} md={4} ><SingleProductFrame/></Grid.Col>
            <Grid.Col span={12} xs={6} md={4} ><SingleProductFrame/></Grid.Col>
            <Grid.Col span={12} xs={6} md={4} ><SingleProductFrame/></Grid.Col>
            <Grid.Col span={12} xs={6} md={4} ><SingleProductFrame/></Grid.Col>
        </Grid>
    );
}

export default ProductsGrid;