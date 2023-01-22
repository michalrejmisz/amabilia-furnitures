import {
    createStyles,
    useMantineTheme,
    ThemeIcon,
    Image,
    Container,
    Title,
    Button,
    Group,
    Text,
    List,
    Grid,
} from '@mantine/core';
import { IconCheck } from '@tabler/icons';
import image from './image.svg';
import BottomContactArea from "./BottomContactArea";

const useStyles = createStyles((theme) => ({
    inner: {
        display: 'flex',
        justifyContent: 'space-between',
        paddingTop: theme.spacing.xl * 4,
        paddingBottom: theme.spacing.xl * 4,
    },

    content: {
        maxWidth: 480,
        marginLeft: theme.spacing.xl * 3,

        [theme.fn.smallerThan('md')]: {
            maxWidth: '100%',
            marginRight: 0,
        },
    },

    title: {
        // color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        color: theme.white,
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        fontSize: 44,
        lineHeight: 1.2,
        fontWeight: 900,

        [theme.fn.smallerThan('xs')]: {
            fontSize: 28,
        },
    },

    control: {
        backgroundColor: theme.colors[theme.primaryColor][5],

        [theme.fn.smallerThan('xs')]: {
            flex: 1,
        },
    },

    image: {
        flex: 1,
        maxWidth: '40%',

        [theme.fn.smallerThan('md')]: {
            display: 'none',
        },
    },

    highlight: {
        position: 'relative',
        backgroundColor: theme.colors[theme.primaryColor][8],
        borderRadius: theme.radius.sm,
        padding: '4px 12px',
    },
}));

export function HeroBullets() {
    const { classes } = useStyles();
    const theme = useMantineTheme();
    return (
        <div>
            <Container size={"lg"}>
                <div className={classes.inner}>
                    <Image src={process.env.PUBLIC_URL + "/images/desk_main.png"} className={classes.image} />
                    <div className={classes.content}>
                        <Title className={classes.title}>
                            <span className={classes.highlight}>Amabilia</span> Nieźle <br /> Cię urządzimy
                        </Title>
                        <Text color="dimmed" mt="md">
                            W ofercie znajdą Państwo nie tylko tanie meble używane i poleasingowe, ale również końcówki serii w bardzo dobrych cenach.
                        </Text>

                        <List
                            mt={30}
                            spacing="md"
                            size="md"
                            icon={
                                <ThemeIcon size={20} radius="xl" color={theme.colors[theme.primaryColor][4]}>
                                    {/*<IconCheck size={12} stroke={1.5} />*/}
                                </ThemeIcon>
                            }
                        >
                            <List.Item>
                                <b>Meble poleasingowe</b> – w naszej ofercie znajdą Państwo końcówki serii oraz meble poleasingowe
                            </List.Item>
                            <List.Item>
                                <b>Rabat</b> – Złóż zamówienie z płatnością przy odbiorze, a otrzymasz rabat!
                            </List.Item>
                            <List.Item>
                                <b>Darmowa Dostawa</b> – w zależności od wielkości zamówienia oraz odległości od klienta możliwa jest darmowa dostawa,<br /> zadzwoń a napewno się dogadamy!
                            </List.Item>
                        </List>

                        <Group mt={30}>
                            <Grid>
                                <Grid.Col xs={6}>
                                    <Button radius="md" size="xl" className={classes.control} >
                                        Kliknij i zadzwoń! <br /> 777 888 999
                                    </Button>
                                </Grid.Col>
                                <Grid.Col xs={6}>
                                    <Button variant="default" radius="md" size="xl" className={classes.control}>
                                        Kliknij, a my <br/> zadzwonimy do Ciebie!
                                    </Button>
                                </Grid.Col>
                            </Grid>
                        </Group>
                    </div>
                </div>
            </Container>
        </div>
    );
}