import {Container, createStyles, Image, Title, SimpleGrid} from "@mantine/core";
import {useViewportSize} from "@mantine/hooks";
import BackGroundWithShapes from "./BackGroundWithShapes";
import {HeroBullets} from "./HeroBullets";
import BottomContactArea from "./BottomContactArea";
import {ContactUsForm} from "../ContactForm/ContactUsForm";

interface ViewPortSize {
    viewPortHeight: number,
    viewPortWidth: number,
}

const useStyles = createStyles((theme, {viewPortHeight, viewPortWidth} : ViewPortSize) => ({
    container: {
        // marginTop: '15vh',
    }

}));


const InitialMain = () => {
    const { height: viewPortHeight, width: viewPortWidth } = useViewportSize();
    const { classes } = useStyles({ viewPortHeight, viewPortWidth });

    return(
        <BackGroundWithShapes>
            <Container size={"lg"} className={classes.container}>
                <HeroBullets/>
            </Container>
        </BackGroundWithShapes>
    )
}

export default InitialMain;