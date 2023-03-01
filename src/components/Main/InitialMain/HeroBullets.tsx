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
    Center,
} from '@mantine/core';
import { IconCheck } from '@tabler/icons';
import image from './image.svg';
import {Fragment} from 'react';
import BottomContactArea from "./BottomContactArea";
import {useQuery} from "@apollo/client";
import {ENTIRE_STATIC_CONTENT} from "../../../lib/graphql/pagesContent";

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
            // marginRight: 0,
            marginLeft: 0,
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

interface HeroBulletsProps{
    handleScrollToMail: () => void;
}

export function HeroBullets({handleScrollToMail} : HeroBulletsProps) {
    const { loading, error, data } = useQuery(ENTIRE_STATIC_CONTENT, {
        fetchPolicy: 'network-only',
        nextFetchPolicy: 'cache-first',
    });
    const { classes } = useStyles();
    const theme = useMantineTheme();
    return (
        <Fragment>
            <Container size={"lg"}>
                <div className={classes.inner}>
                    <Image src={`${process.env.NEXT_PUBLIC_STRAPI_UPLOAD_FOLDER}${data?.stronaTytulowaZdjecieBiurkaInformacje?.data?.attributes?.Zdjecie?.data?.attributes?.url ?? ""}${"?format=webp"}`} className={classes.image} alt=""/>
                    <div className={classes.content}>
                        <Title className={classes.title}>
                            <span className={classes.highlight}>{data?.stronaTytulowaZdjecieBiurkaInformacje?.data?.attributes?.TytulPodkreslenie ?? ""}</span> {data?.stronaTytulowaZdjecieBiurkaInformacje?.data?.attributes?.TytulPierwszyWiersz ?? ""} <br/> {data?.stronaTytulowaZdjecieBiurkaInformacje?.data?.attributes?.TytulDrugiWiersz ?? ""}
                        </Title>
                        <Text color="white" mt="md">
                            {data?.stronaTytulowaZdjecieBiurkaInformacje?.data?.attributes?.Podtytul ?? ""}
                        </Text>

                        <List
                            style={{textAlign: "left"}}
                            mt={30}
                            spacing="md"
                            size="md"
                            icon={
                                <ThemeIcon size={20} radius="xl" color={theme.colors[theme.primaryColor][4]}>
                                    <IconCheck size={18} stroke={1.5} />
                                </ThemeIcon>
                            }
                        >
                            {data?.stronaTytulowaZdjecieBiurkaInformacje?.data?.attributes?.InformacjeOdMyslnika?.map((singleDash, index) => {
                                return(
                                    <List.Item key={index} style={{color: theme.colors[theme.primaryColor][2]}}>
                                        <span className={classes.highlight}><b style={{color: "white"}}>{singleDash?.PogrubionyTekst}</b></span> – {singleDash?.TekstPoMyslniku}
                                    </List.Item>
                                )
                            })}
                            {/*<List.Item style={{color: theme.colors[theme.primaryColor][2]}}>*/}
                            {/*    <span className={classes.highlight}><b style={{color: "white"}}>Meble poleasingowe</b></span> – w naszej ofercie znajdą Państwo końcówki serii oraz meble poleasingowe*/}
                            {/*</List.Item>*/}
                            {/*<List.Item style={{color: theme.colors[theme.primaryColor][2]}}>*/}
                            {/*    <span className={classes.highlight}><b style={{color: "white"}}>Rabat</b></span>  – Złóż zamówienie z płatnością przy odbiorze, a otrzymasz rabat!*/}
                            {/*</List.Item>*/}
                            {/*<List.Item style={{color: theme.colors[theme.primaryColor][2]}}>*/}
                            {/*    <span className={classes.highlight}><b style={{color: "white"}}>Darmowa dostawa</b></span> – w zależności od wielkości zamówienia oraz odległości od klienta możliwa jest darmowa dostawa,<br /> zadzwoń a napewno się dogadamy!*/}
                            {/*</List.Item>*/}
                        </List>
                    </div>
                </div>
                <Center>
                    <BottomContactArea handleScrollToMail={handleScrollToMail}/>
                </Center>
            </Container>
        </Fragment>
    );
}