import {
    Container,
    Image,
    Grid,
    createStyles,
} from '@mantine/core';

const useStyles = createStyles((theme) => ({
    banner: {
        marginTop: '20px',
        minHeight: '250px',
        maxHeight: '250px',
        // background: "rgb(34,139,230)",
        background: "linear-gradient(135deg, rgba(34,139,230,1) 45%, rgba(77,171,247,1) 45%)",
    },

    imageBanner: {
        minWidth: "50%",
        width: "calc(24.8vw)",
        position: "relative",
        // top: "70%",
        webkitTransform: "translateY(-50%)",
        mozTransform: "translateY(-50%)",
        msTransform: "translateY(-50%)",
        oTransform: "translateY(-50%)",
        transform: "translateY(-50%)",
        // left: 0,
    },

    fillHeight: {
        height: '100%',
    },

    row: {
        display: 'flex',
        flexWrap: 'wrap',
    },

    gridCol: {
        height: '100%',
        width: '100%',
    }


}));

export const InformationBanner = () => {
    const {classes} = useStyles();
    return(
        <div className={classes.banner}>
            <div className={classes.fillHeight}>
                <div className={classes.row}>
                    <Grid>
                        <Grid.Col span={4}>
                            Testujemy
                        </Grid.Col>
                        <Grid.Col span={8} className={classes.gridCol}>
                            {/*<Image src={process.env.PUBLIC_URL + "/images/desk.png"} className={classes.imageBanner}/>*/}
                        </Grid.Col>
                    </Grid>
                </div>
            </div>
        </div>
    );
}