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

const useStyles = createStyles((theme) => ({
    textInput: {
        margin: '10px',
        alignSelf: 'flex-end',
    }
}));

export function InputWithButton(props: TextInputProps) {
    const theme = useMantineTheme();
    const {classes} = useStyles();


    return (
            <TextInput
                className={classes.textInput}
                icon={<IconSearch size={18} stroke={1.5} />}
                // radius="xl"
                size="md"
                rightSection={
                    <ActionIcon size={32}  color={theme.primaryColor} variant="filled">
                        {theme.dir === 'ltr' ? (
                            <IconArrowRight size={18} stroke={1.5} />
                        ) : (
                            <IconArrowLeft size={18} stroke={1.5} />
                        )}
                    </ActionIcon>
                }
                placeholder="Szukaj..."
                rightSectionWidth={42}
                {...props}
            />
    );
}