import { useState, useEffect, useRef } from 'react';
import { Stepper, Button, Group, Text, Container } from '@mantine/core';
import {
    IconCircleCheck,
    IconShoppingCart,
    IconUserCheck,
    IconShieldCheck,
} from '@tabler/icons';
import { useMantineTheme, createStyles, MediaQuery } from '@mantine/core';
import { useViewportSize } from '@mantine/hooks';
import { CartStep } from "./Steps/CartStep";
import { Cus } from "./Steps/CartStep";
import {CustomerDetailsStep} from "@/components/Checkout/Steps/CustomerDetailsStep";
import {FinalStep} from "@/components/Checkout/Steps/FinalStep";
import {Completed} from "@/components/Checkout/Steps/Completed";
import {useShoppingCart} from "@/context/ShoppingCartContext";
import {useCheckout} from "@/context/CheckoutContext";

const useStyles = createStyles((theme) => ({
    wrapper: {
        flexDirection: "column",
        display: "flex",
        marginTop: "70px",


        [theme.fn.largerThan('lg')]: {
            margin: "0 auto",
            width: "800px",
            marginTop: "70px",
        },

        [theme.fn.smallerThan('lg')]: {
            margin: "0 auto",
            width: "700px",
            marginTop: "70px",
        },

        [theme.fn.smallerThan('md')]: {
            margin: "0 auto",
            width: "100%",
            marginTop: "70px",
        },

        [theme.fn.smallerThan('xs')]: {
            marginTop: "20px",
        },
    },

    stepper: {
        "::label": {
            display: "none",
        }
    },

    navButtons: {
        margin: "0 auto",
        [theme.fn.smallerThan('xs')]: {
            position: "sticky",
            // bottom: "10",
        },
    }
}))

interface SecondStepRefInterface {
    validateFormxdd: () => void;
}

export const CheckoutStepper = () => {
    const {
        isFirstStepValid,
        isSecondStepValid,
        isThirdStepValid,
        thirdStep,
        handleThirdStep,
        secondStep,
        handleSecondStep,
        handleSecondStepInValid,
        handleSecondStepClicked,
        handleSecondStepUnclicked,
    } = useCheckout();
    const {cartQuantity} = useShoppingCart();
    const [showLabels, setShowLabels] = useState(true);
    const { width } = useViewportSize();
    const [active, setActive] = useState( 0);
    const [isFirstStepValidate,setIsFirstStepValidate] = useState(cartQuantity > 0);
    const [isSecondStepValidate,setIsSecondStepValidate] = useState(false);
    const nextStep = () => setActive((current) => (current < 3 ? current + 1 : current));
    // const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));
    const theme = useMantineTheme();
    const { classes } = useStyles();

    useEffect(() => {
        setIsFirstStepValidate(cartQuantity > 0);
    }, [cartQuantity])


    // const handleSecondStepValidate = ({validate} : boolean) =>{
    //     setIsSecondStepValidate(validate)
    // }
    const prevStep = () => setActive(() => {
        if (active > 0) {
            // if(active == 1) {handleSecondStepUnclicked()}
            if(active == 1) {handleSecondStep({...secondStep, isClicked: false, isValid: false})}
            if(active == 2) {handleThirdStep({isClicked: false, isValid: thirdStep.isValid})}
            return active - 1
        } else {
            return active
        }
    });

    const validateSecondStep = () => {
        // if(isSecondStepValid){
        if(secondStep.isValid){
            setActive(2)
            // handleSecondStepInValid();
            // handleSecondStepUnclicked();
            handleSecondStep({...secondStep, isClicked: false, isValid: false})
        } else {
            handleSecondStep({...secondStep, isClicked: true})
            // handleSecondStepClicked();
        }
    }

    const validateThirdStep = () => {
        if(thirdStep.isValid){
            setActive(3)
            handleThirdStep({isClicked: false, isValid: false})
        } else {
            handleThirdStep({isClicked: true, isValid: thirdStep.isValid})
        }
    }


    useEffect(() => {
        setShowLabels(width > 576);
    }, [width])


    return (
        <div className={classes.wrapper}>
            <Group position="center">
                    <Stepper active={active} mt="0" onStepClick={false} style={{margin: "0 auto", width: "100%"}} completedIcon={<IconCircleCheck /> } allowNextStepsSelect={false}>
                        <Stepper.Step icon={<IconShoppingCart color={theme.colors.blue[7]}/>}
                                      label={showLabels ? "Krok 1" : ""}
                                      description={showLabels ? "Sprawdź swój koszyk" : ""}
                                      allowStepClick={false}
                        >
                            {/* Step 1*/}
                            <CartStep/>
                        </Stepper.Step>
                        <Stepper.Step icon={<IconUserCheck color={theme.colors.blue[7]} />}
                                      label={showLabels ? "Krok 2" : ""}
                                      description={showLabels ? "Wprowadź dane" : ""}
                                      style={{float: "left"}}
                                      allowStepClick={false}
                        >
                            {/*Step 2 */}
                            <CustomerDetailsStep/>
                        </Stepper.Step>
                        <Stepper.Step icon={<IconShieldCheck  color={theme.colors.blue[7]}/>}
                                      label={showLabels ? "Krok 3" : ""}
                                      description={showLabels ? "Finalizacja" : ""}
                                      allowStepClick={false}
                        >
                            {/* Step 3 */}
                            <FinalStep/>
                        </Stepper.Step>
                        <Stepper.Completed allowStepClick={false}>
                            <Completed/>
                        </Stepper.Completed>
                    </Stepper>
            </Group>
            <Group className={classes.navButtons} mb={theme.spacing.xl}>
                {active !== 3 && active !== 0 ? (
                <Button variant="light" size={"lg"} onClick={prevStep} style={{fontWeight: "300"}}>Wstecz</Button>
                ) : ''}
                {active === 0 ?(
                    <Button size={"lg"} onClick={nextStep} disabled={!isFirstStepValidate}>Dalej</Button>
                ) : active === 1 ? (
                    <Button size={"lg"} onClick={validateSecondStep}>Dalej</Button>
                ) : active === 2 ? (
                    <Button size={"lg"} onClick={validateThirdStep} >Dalej</Button>
                ): active === 3 ? '' : (
                    <Button size={"lg"} onClick={nextStep} >Dalej</Button>
                )
                }
            </Group>
        </div>
    );
};