import {
    Center,
    TextInput,
    TextInputProps,
    ActionIcon,
    useMantineTheme,
    createStyles,
} from '@mantine/core';
import {
    IconSearch,
    IconArrowRight,
    IconArrowLeft }
from '@tabler/icons';
import React from 'react';


const useStyles = createStyles((theme) => ({
    textInput: {
        margin: '10px',
        alignSelf: 'flex-end',
        [theme.fn.smallerThan(576)]: {
            width: "100%",
            paddingRight: "10px",
            paddingLeft: "10px",
        }
    }
}));

interface InputWithButtonProps{
    searchInputFunction: (arg: string) => void;
}

export const InputWithButton = ({searchInputFunction} : InputWithButtonProps) => {
    const theme = useMantineTheme();
    const {classes} = useStyles();

    const handleChange = (event) => {
        searchInputFunction(event.target.value)
    }

    return (
            <TextInput
                onChange={handleChange}
                className={classes.textInput}
                icon={<IconSearch size={18} stroke={1.5} />}
                // radius="xl"
                size="md"
                rightSection={
                    <ActionIcon size={32}  color={theme.primaryColor} variant="filled" title="Szukaj">
                        {theme.dir === 'ltr' ? (
                            <IconArrowRight size={18} stroke={1.5} />
                        ) : (
                            <IconArrowLeft size={18} stroke={1.5} />
                        )}
                    </ActionIcon>
                }
                placeholder="Szukaj..."
                rightSectionWidth={42}
            />
    );
}