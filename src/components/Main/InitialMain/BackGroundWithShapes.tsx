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
            backgroundColor: theme.colors[theme.primaryColor][6],
            height: viewPortHeight - 65,
            width: "auto",
            zIndex: -1000,
            background: 'transparent',
        },


        customShape: {
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: viewPortHeight - 50,
            overflow: "hidden",
            lineHeight: 0,
            zIndex: -60,
            backgroundColor: theme.colors[theme.primaryColor][6],

            svg: {
                position: "absolute",
                display: "block",
                width: "calc(161% + 1.3px)",
                height: "700px",
                transform: "rotateY(180deg)",
                zIndex: -60,
                overflow: "hidden",
            },
        },

        shapeFill: {
            fill: theme.colors[theme.primaryColor][4],
            overflow: "hidden",
        },

        childrenContent: {
            overflow: "overlay",
            height: "100vh",
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
                     preserveAspectRatio="none">
                    <path
                        d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
                        className={classes.shapeFill}>
                    </path>
                </svg>
                <div className={classes.childrenContent}>
                {children}
                </div>
            </div>
        </div>
    )
}

export default BackGroundWithShapes