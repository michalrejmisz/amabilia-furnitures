import {createContext, ReactNode, useContext, useState} from "react";

type CheckoutProviderProps = {
    children: ReactNode
}


interface ThirdStep{
    isClicked: boolean;
    isValid: boolean;
}

interface SecondStep{
    isClicked: boolean;
    isValid: boolean;
}

interface FormProps{
    Imie: string;
    Nazwisko: string;
    Email: string;
    Telefon: number;
    isFaktura: boolean;
    Nip: number;
    NazwaFirmy: string;
    isDelivery: boolean;
    Miejscowosc: string;
    KodPocztowy: string;
    Street: string;
    houseNumber: string;
    isPhone: boolean;
    isCash: boolean;
    isNewsletter: boolean;
    moreInformation: string;
}

type CheckoutContext = {
    formProps : FormProps;
    handleFormProps: ({formProps} : FormProps) => void;

    isFirstStepValid: boolean;

    handleSecondStep: ({secondStep} : SecondStep) => void;
    secondStep: SecondStep;

    handleThirdStep: ({thirdStep} : ThirdStep) => void;
    thirdStep: ThirdStep;

}

const CheckoutContext = createContext({} as CheckoutContext)

export const useCheckout = () => {
    return useContext(CheckoutContext)
}

export const CheckoutContextProvider = ({children} : CheckoutProviderProps) => {
    const [formProps, setFormProps] = useState<FormProps>(
        {
            Imie: '',
            Nazwisko: '',
            Email: '',
            Telefon: '',
            isFaktura: false,
            Nip: '',
            NazwaFirmy: '',
            isDelivery: false,
            Miejscowosc: '',
            KodPocztowy: '',
            Street: '',
            houseNumber: '',
            isPhone: true,
            isCash: true,
            isNewsletter: false,
            moreInformation: '',
        }
    );


    const [isFirstStepValid, setIsFirstStepValid] = useState(false);

    const [isSecondStepValid, setIsSecondStepValid] = useState(false);
    const [isSecondStepClicked, setIsSecondStepClicked] = useState(false);

    const [thirdStep, setThirdStep] = useState({isClicked: false, isValid: false})
    const [secondStep, setSecondStep] = useState({isClicked: false, isValid: false})

    const handleSecondStepClicked = () => {setIsSecondStepClicked(true)}
    const handleSecondStepUnclicked = () => {setIsSecondStepClicked(false)}
    const handleSecondStepValid = () => {setIsSecondStepValid(true);}
    const handleSecondStepInValid = () => {setIsSecondStepValid(false);}


    const [isThirdStepValid, setIsThirdStepValid] = useState(false);

    const handleSecondStep = (secondStep) => {
        setSecondStep(secondStep)
    }

    const handleThirdStep = (thirdStep) => {
        setThirdStep(thirdStep)
    }



    const handleFormProps = (newProps: Partial<FormProps>) => {
        setFormProps((prevFormProps) =>({
            ...prevFormProps,
            ...newProps,
        }))
    }

    return (
        <CheckoutContext.Provider value={{
            isFirstStepValid,
            isSecondStepValid,
            isSecondStepClicked,
            isThirdStepValid,
            thirdStep,
            handleThirdStep,
            handleSecondStepUnclicked,
            handleSecondStepClicked,
            handleSecondStepValid,
            handleSecondStepInValid,
            handleSecondStep,
            secondStep,
            formProps,
            handleFormProps,
        }}>
            {children}
        </CheckoutContext.Provider>
    )
}