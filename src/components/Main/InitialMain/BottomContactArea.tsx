import {createStyles, Text, Card, RingProgress, Group, Grid, SimpleGrid, Image, Title, Container, Center, useMantineTheme} from '@mantine/core';

export const PhoneCallMakeIcon = () => {
    return(
        <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6" >
            <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 3.75v4.5m0-4.5h-4.5m4.5 0l-6 6m3 12c-8.284 0-15-6.716-15-15V4.5A2.25 2.25 0 014.5 2.25h1.372c.516 0 .966.351 1.091.852l1.106 4.423c.11.44-.054.902-.417 1.173l-1.293.97a1.062 1.062 0 00-.38 1.21 12.035 12.035 0 007.143 7.143c.441.162.928-.004 1.21-.38l.97-1.293a1.125 1.125 0 011.173-.417l4.423 1.106c.5.125.852.575.852 1.091V19.5a2.25 2.25 0 01-2.25 2.25h-2.25z" />
        </svg>
    )
}


export const PhoneCallReceiveIcon = () => {
    return(
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75v-4.5m0 4.5h4.5m-4.5 0l6-6m-3 18c-8.284 0-15-6.716-15-15V4.5A2.25 2.25 0 014.5 2.25h1.372c.516 0 .966.351 1.091.852l1.106 4.423c.11.44-.054.902-.417 1.173l-1.293.97a1.062 1.062 0 00-.38 1.21 12.035 12.035 0 007.143 7.143c.441.162.928-.004 1.21-.38l.97-1.293a1.125 1.125 0 011.173-.417l4.423 1.106c.5.125.852.575.852 1.091V19.5a2.25 2.25 0 01-2.25 2.25h-2.25z" />
        </svg>
    )
}

export const MailIcon = () => {
    return(
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
        </svg>
    )
}

const data = [
    {
        svg: <PhoneCallMakeIcon/>,
        title: 'Kliknij i zadzwoń!',
        text: "777 999 888",
    },
    {
        svg: <PhoneCallReceiveIcon/>,
        title: 'Kliknij i zostaw numer',
        text: 'A my oddzwonimy!',
    },
    {
        svg: <MailIcon/>,
        title: 'Wyślij maila',
        text: 'Zostaw wiadomość za pomocą formularza',
    },
];

const useStyles = createStyles((theme) => ({
    contactArea: {
        marginTop: "-60px",
    },

    card: {
        minHeight: '140px',
        border: `solid 2px ${theme.colors[theme.primaryColor][4]}`,


        '&:hover': {
            boxShadow: `${theme.shadows.md} !important`,
            transform: 'scale(1.05)',
        },

        svg: {
            // linearGradient: "90deg, ${theme.colors[theme.primaryColor][4]}, ${theme.colors[theme.primaryColor][8]}",
            // linearGradient: "90deg, red, blue",
            stroke: theme.colors[theme.primaryColor][8],
            [theme.fn.smallerThan('sm')]: {
                display: 'none',
                // padding: '25px',
                // width: '10px',
                // height: '10px',
                // minWidth: '10px',
                // minHeight: '10px',
            }
        },


    },

    // svg2: {
    //     // linearGradient: "90deg, ${theme.colors[theme.primaryColor][4]}, ${theme.colors[theme.primaryColor][8]}",
    //     // linearGradient: "90deg, red, blue",
    //     stroke: theme.colors[theme.primaryColor][8],
    //     [theme.fn.smallerThan('md')]: {
    //         display: 'none',
    //     }
    // },


    gridClass: {
        gap: '30px',

        [theme.fn.smallerThan('md')]: {
            gap: '10px',
            // padding: '5px',
        }
    }

}));

interface CardProps {
    svg: JSX.Element;
    title: string;
    text: string;
}

const CardExamples = ({svg, title, text} : CardProps) => {
    const { classes } = useStyles();
    const theme = useMantineTheme();

    return(
        <Card radius={"lg"} withBorder className={classes.card}>
            {/* top, right, left margins are negative – -1 * theme.spacing.xl */}
            {/*<Card.Section my={"lg"}>*/}
            {/*    First section*/}
            {/*    <Text>First text</Text>*/}
            {/*</Card.Section>*/}

            {/*/!* Content that is not inside Card.Section will have theme.spacing.xl spacing on all sides relative to Card *!/*/}
            {/*<Text>Some other content</Text>*/}

            {/*/!* right, left margins are negative – -1 * theme.spacing.xl *!/*/}
            {/*<Card.Section>Middle section</Card.Section>*/}

            {/*/!* bottom, right, left margins are negative – -1 * theme.spacing.xl *!/*/}
            {/*<Card.Section>Last section</Card.Section>*/}
            <Grid>
                <Grid.Col xs={4} sm={4}  style={{padding: '15px'}}>
                    <Center>
                        {svg}
                    </Center>
                </Grid.Col>
                <Grid.Col xs={8} sm={8}>
                    <Container>
                        <Title order={5} color={theme.colors[theme.primaryColor][7]} mt={"md"}>{title}</Title>
                        <Title order={6} color={theme.colors[theme.primaryColor][5]} mt={"xs"}>{text}</Title>
                    </Container>
                </Grid.Col>
            </Grid>
        </Card>
    );
}

const BottomContactArea = () => {
    const { classes } = useStyles();

    return(
        <div className={classes.contactArea}>

            <SimpleGrid className={classes.gridClass}
                        cols={3}
                        breakpoints={[
                            { minWidth: 1, cols: 1 },
                            { minWidth: 501, cols: 3 },
                        ]}
            >
                {data.map((item)=> <CardExamples {...item}/>)}
            </SimpleGrid>

        </div>
    );
}

export default BottomContactArea;