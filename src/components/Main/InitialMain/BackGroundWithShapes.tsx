import {Container, createStyles, Image, Title} from "@mantine/core";
import {useViewportSize} from "@mantine/hooks";
import {FC, PropsWithChildren} from "react";

interface ViewPortSize {
    viewPortHeight: number,
    viewPortWidth: number,
}

const useStyles = createStyles((theme, {viewPortHeight, viewPortWidth} : ViewPortSize) => (
    {

        firstFrame: {
            // position: "relative",
            backgroundColor: theme.colors[theme.primaryColor][6],
            height: `${viewPortHeight - 100}px`,
            minHeight: '854px',
            // top: "-220px",
            width: "auto",
            zIndex: -1000,
            background: 'transparent',

            [theme.fn.smallerThan('xs')]: {
                height: '1200px',
            },

        },


        customShape: {
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: `${viewPortHeight - 100}px`,
            overflow: "hidden",
            lineHeight: 0,
            zIndex: -60,
            backgroundColor: theme.colors[theme.primaryColor][6],
            minHeight: '854px',
            // background: `url("${process.env.PUBLIC_URL+"/images/bgtest2.jpg"}") no-repeat fixed center`,
            // backgroundSize: 'cover',
            // filter: "linear-gradient(90deg, rgba(2,0,36,0.9696079115239846) 0%, rgba(114,114,231,1) 64%, rgba(0,212,255,1) 100%)",

            // [theme.fn.smallerThan('md')]: {
            //     height: 'stretch',
            // },

            [theme.fn.smallerThan('xs')]: {
                height: '1200px',
            },

        },

        svg: {
            position: "absolute",
            display: "block",
            width: "calc(161% + 1.3px)",
            // width: "100vh",
            height: "700px",
            transform: "rotateY(180deg)",
            zIndex: -60,
            overflow: "hidden",
        },



        shapeFill: {
            fill: theme.colors[theme.primaryColor][4],
            overflow: "hidden",
        },

        childrenContent: {
            // // position: "absolute",
            // height: "100vh",
            // top: "-150px",
            // left: "-50px",
        }


}));

type Props = {

}

const BackGroundWithShapes:FC<PropsWithChildren<Props>> = ({children}) => {

    const { height: viewPortHeight, width: viewPortWidth } = useViewportSize();
    const { classes } = useStyles({ viewPortHeight, viewPortWidth });

    return(
        <div className={classes.firstFrame}>
            <div className={classes.customShape}>
                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120"
                     preserveAspectRatio="none" className={classes.svg}>
                    <path
                        d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
                        className={classes.shapeFill}>
                    </path>
                </svg>
            </div>
            <div className={classes.childrenContent}>
                {children}
            </div>
        </div>
    )
}

export default BackGroundWithShapes