import React, { useState } from 'react';
import {
    createStyles,
    Center,
    Loader,
} from "@mantine/core";
import Logo from "../Logo";

interface Props {
    children: React.ReactNode;
    isLoading: boolean;
}

const useStyles = createStyles((theme) => ({
    background:  {
        position: "absolute",
        left: 0,
        top: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: theme.colors[theme.primaryColor][6],
    },

    logo: {
        maxWidth: '50%',
        maxHeight: '50%',
        animationDuration: "3s",
        animationName: "zooming",
        animationIterationCount: "Infinite",

        "@keyframes zooming": {
            // "80%": {
            //     transform: "rotate(15deg)",
            // },
            "50%": {
                transform: "scale(1.3)",
            },
            // "to": {
            //     transform: "rotate(15deg)",
            // },
        },

    },



}));

export const LoadingScreen: React.FC<Props> = ({ children, isLoading }) => {

    const {classes} = useStyles();

    return isLoading ? (
                <div className={classes.background}>
                    {/*<div style={{ textAlign: 'center', marginTop: '20%' }}>*/}
                        <Center style={{width: "100vw", height: "100vh"}}>
                                <div className={classes.logo}>
                                    <Logo/>
                                </div>
                        </Center>
                    {/*</div>*/}
                </div>
            ) : (
                children
            );
};

