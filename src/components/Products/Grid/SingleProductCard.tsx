import {
    Card,
    Image,
    Center,
    Badge,
    createStyles, Text, Group
} from '@mantine/core';

import {
    IconGasStation,
    IconShoppingCart,
    IconSearch,
} from '@tabler/icons';

const useStyles = createStyles((theme, _params, getRef) => ({

    card :{
        '&:hover': {
            boxShadow: `${theme.shadows.xl} !important`,
            transform: 'scale(1.05)',

        },

        [`&:hover .${getRef('hoverBox')}`]: {
            opacity: 1
        }
    },

    imageSection: {
        height: "200px",
        padding: theme.spacing.md,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottom: `1px solid ${
            theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
        }`,
    },

    hoverCart: {
        display: "flex",
        backgroundColor: theme.colors[theme.primaryColor][7],
        color: "white",
        height: '75px',
        width: '100%',
    },

    hoverBox: {
        ref: getRef('hoverBox'),
        display: 'flex',
        flexDirection: 'column',
        margin: 0,
        position: "absolute",
        bottom: 0,
        left: 0,
        height: '100%',
        width: '100%',
        opacity: 0,
    },

    search: {
        width: '100%',
        height: '100%',
        background: "rgba(0,0,0,0.35)",
    },

    iconSearch: {
        color: "white",
        // color: theme.colors[theme.primaryColor][5],
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

export const SingleProductCard = () => {
    const { classes } = useStyles();

    return(
        <Card withBorder className={classes.card}>
            <Card.Section className={classes.imageSection}>
                <Image src="https://i.imgur.com/ZL52Q2D.png" alt="Tesla Model S" />
            </Card.Section>


            {/* Hover Box Section */}
            <Card.Section className={classes.hoverBox}>
                <Center className={classes.search}>
                    <IconSearch className={classes.iconSearch} size={70} stroke={1.5}/>
                </Center>
                <Center className={classes.hoverCart}>
                    <IconShoppingCart size={50} stroke={1.5}/>
                </Center>
            </Card.Section>

            <Group position="apart">
                <div>
                    <Text weight={500}>Krzesło obrotowe z aluminiowymu kółkami</Text>
                    {/*<Text size="xs" color="dimmed">*/}
                    {/*    Free recharge at any station*/}
                    {/*</Text>*/}
                </div>
                <Badge variant="outline">150zł</Badge>
            </Group>



            {/*<Card.Section className={classes.section} mt="md">*/}
            {/*    <Text size="xl" color="dimmed" className={classes.label}>*/}
            {/*        Krzesło obrotowe z aluminiowymu kółkami*/}
            {/*    </Text>*/}
            {/*</Card.Section>*/}

                {/*<Group spacing={8} mb={-8}>*/}
                {/*    <Center key="testuj">*/}
                {/*        <IconGasStation size={18} className={classes.icon} stroke={1.5} />*/}
                {/*        <Text size="xs">Testuje?</Text>*/}
                {/*    </Center>*/}

                {/*    <Center key="testuj">*/}
                {/*        <IconGasStation size={18} className={classes.icon} stroke={1.5} />*/}
                {/*        <Text size="xs">Testuje?</Text>*/}
                {/*    </Center>*/}
                {/*</Group>*/}




        </Card>
    )
}
