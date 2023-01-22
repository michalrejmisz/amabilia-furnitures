import {Container, createStyles, Image, Title, SimpleGrid} from "@mantine/core";
import {useViewportSize} from "@mantine/hooks";
import BackGroundWithShapes from "./BackGroundWithShapes";
import {LeadGrid} from "./LeadGrid";
import {HeroBullets} from "./HeroBullets";
import {HeaderBullets2} from "./HeaderBullets2";
import BottomContactArea from "./BottomContactArea";


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
                <HeroBullets/>
                <BottomContactArea/>
            </Container>
        </BackGroundWithShapes>
    )
}

export default InitialMain;