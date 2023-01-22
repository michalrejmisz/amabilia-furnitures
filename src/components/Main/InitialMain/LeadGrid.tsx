import { Container, Grid, SimpleGrid, Skeleton, useMantineTheme, Image } from '@mantine/core';

const PRIMARY_COL_HEIGHT = 300;

export function LeadGrid() {
    const theme = useMantineTheme();
    const SECONDARY_COL_HEIGHT = PRIMARY_COL_HEIGHT / 2 - theme.spacing.md / 2;

    return (
        <Container size={"lg"} my="md">
            <SimpleGrid cols={2} spacing="md" breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
                <Skeleton height={"100%"} radius="md" animate={false} visible={false}>
                    <Image src={process.env.PUBLIC_URL + "/images/desk_main.png"}/>
                </Skeleton>
                <Grid gutter="md">
                    <Grid.Col>
                        <Skeleton height={SECONDARY_COL_HEIGHT} radius="md" animate={false} >
                        </Skeleton>
                    </Grid.Col>
                    <Grid.Col span={6}>
                        <Skeleton height={SECONDARY_COL_HEIGHT} radius="md" animate={false} visible={false} >
                            Kliknij i zadzwoń
                            777 888 999
                        </Skeleton>
                    </Grid.Col>
                    <Grid.Col span={6}>
                        <Skeleton height={SECONDARY_COL_HEIGHT} radius="md" animate={false} />
                    </Grid.Col>
                </Grid>
            </SimpleGrid>
        </Container>
    );
}