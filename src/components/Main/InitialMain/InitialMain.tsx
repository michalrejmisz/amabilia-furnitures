import {Container, createStyles, Image, Title, SimpleGrid} from "@mantine/core";
import {useViewportSize} from "@mantine/hooks";
import BackGroundWithShapes from "./BackGroundWithShapes";
import {LeadGrid} from "./LeadGrid";
import {HeroBullets} from "./HeroBullets";
import {HeaderBullets2} from "./HeaderBullets2";


interface ViewPortSize {
    viewPortHeight: number,
    viewPortWidth: number,
}

const useStyles = createStyles((theme, {viewPortHeight, viewPortWidth} : ViewPortSize) => ({
    container: {
        marginTop: '15vh',
    }

}));


const InitialMain = () => {
    const { height: viewPortHeight, width: viewPortWidth } = useViewportSize();
    const { classes } = useStyles({ viewPortHeight, viewPortWidth });

    return(
        <BackGroundWithShapes>
            <Container size={"lg"} className={classes.container}>
                {/*<SimpleGrid cols={2}>*/}

                {/*    <div style={{ maxWidth: "35%", height: "auto", marginLeft: 'auto', float: 'left', marginTop: '150px', zIndex: 1000}}>*/}
                {/*        <Image src={process.env.PUBLIC_URL + "/images/desk_main.png"}/>*/}
                {/*    </div>*/}
                {/*    <Title order={2} style={{ float: "right", marginRight: 'auto'}}>*/}
                {/*        Sprzedaż używanych i poleasingowych mebli biurowych.*/}
                {/*        W ofercie znajdą Państwo nie tylko tanie meble używane i poleasingowe, ale również końcówki serii w bardzo dobrych cenach.*/}
                {/*    </Title>*/}
                {/*</SimpleGrid>*/}
                <HeroBullets/>
                {/*<HeaderBullets2/>*/}
                {/*<LeadGrid/>*/}
            </Container>
        </BackGroundWithShapes>
    )
}

export default InitialMain;