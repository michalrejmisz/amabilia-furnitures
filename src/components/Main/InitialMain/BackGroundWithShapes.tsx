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
            height: `${viewPortHeight} - 100px`,
            minHeight: '854px',
            // top: "-220px",
            width: "auto",
            zIndex: -1000,
            background: 'transparent',
        },


        customShape: {
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: `${viewPortHeight} - 100px`,
            overflow: "hidden",
            lineHeight: 0,
            zIndex: -60,
            backgroundColor: theme.colors[theme.primaryColor][6],
            minHeight: '854px',

            // [theme.fn.smallerThan('md')]: {
            //     height: 'stretch',
            // },

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
                     preserveAspectRatio="none">
                    <path
                        d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
                        className={classes.shapeFill}>
                    </path>
                </svg>
            </div>


                {/*<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="1920px" height="1024px" preserveAspectRatio="none">*/}
                {/*    <path className={classes.shapeFill} d="M -0.5,-0.5 C 372.833,-0.5 746.167,-0.5 1119.5,-0.5C 1009.75,20.0529 907.415,59.5529 812.5,118C 747.155,159.67 690.988,211.503 644,273.5C 603.915,329.351 576.582,391.018 562,458.5C 530.217,552.617 468.05,617.784 375.5,654C 273.086,689.958 175.086,680.625 81.5,626C 57.288,610.136 35.1213,591.636 15,570.5C 10.0521,564.242 4.8854,558.242 -0.5,552.5C -0.5,368.167 -0.5,183.833 -0.5,-0.5 Z"/>*/}
                {/*</svg>*/}
                {/*<img src={process.env.PUBLIC_URL + "/images/background5.svg"} className={classes.customShape}/>*/}

                {/*<svg xmlns="http://www.w3.org/2000/svg" width="1920" height="1024">*/}
                {/*    <path className={classes.shapeFill} d="M0 0L0 313L0 483L0 531C0 537.48 -1.74188 547.01 0.988426 553C5.33864 562.544 15.6845 571.673 23 579C42.3785 598.41 63.4464 615.469 87 629.6C200.769 697.86 348.262 688.987 455 611.575C496.314 581.612 529.531 539.609 550.138 493C562.521 464.992 568.073 435.018 577.344 406C587.731 373.492 602.308 342.475 619.424 313C697.115 179.212 835.828 90.9445 978 38.9468C1008.43 27.8169 1039.58 18.9812 1071 11.1265C1086.67 7.20807 1103.82 1.69635 1120 1L1091 0L1025 0L795 0L0 0z"/>*/}
                {/*    <path className={classes.shapeFill} d="M0 553L0 1024L1920 1024L1920 0L1386 0L1209 0C1180.3 0 1149.48 -3.21082 1121 0.286255C1048.29 9.21625 973.182 36.9194 907 67.3087C796.931 117.849 696.086 193.766 629.344 296C607.699 329.156 590.407 365.412 578.001 403C563.88 445.784 555.476 487.805 531.796 527C452.662 657.981 278.083 708.841 138 653.797C100.842 639.196 66.6735 618.668 37 591.83C23.9821 580.056 13.7429 563.518 0 553z"/>*/}
                {/*</svg>*/}



                {/*</div>*/}
                <div className={classes.childrenContent}>
                    {children}
                </div>
        </div>
    )
}

export default BackGroundWithShapes