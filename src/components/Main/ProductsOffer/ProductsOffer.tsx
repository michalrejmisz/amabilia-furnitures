import {CardsCarousel} from "./CardCarousel";
import {Wrapper} from "@storybook/addon-docs";
import {createStyles} from "@mantine/core";

const useStyles = createStyles((theme) => ({
    products: {
        backgroundColor: 'red',
        padding: '10px'
    }
}))

const ProoductsOffer = () =>{
    const { classes } = useStyles();

    return(
        <div className={classes.products}>
            <CardsCarousel/>
        </div>
    );
}

export default ProoductsOffer;