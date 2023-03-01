import { useState, useRef } from 'react';
import { NumberInput, Group, ActionIcon, NumberInputHandlers, createStyles } from '@mantine/core';
import {IconChevronRight, IconChevronLeft} from "@tabler/icons"

const useStyles = createStyles((theme) => ({
    wrapper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: theme.spacing.xs,
        margin: theme.spacing.xs,
        borderRadius: theme.radius.md,
        marginLeft: 0,
        // backgroundColor: theme.colors.gray[3],
        border: `2px solid ${theme.colors[theme.primaryColor][6]}`,

        '&:focus-within': {
            // borderColor: theme.colors[theme.primaryColor][3],
            // backgroundColor: theme.colors[theme.primaryColor][3],
        },

        [theme.fn.smallerThan('sm')]: {
            padding: "0px",
            margin: "0px",
        },
    },

    input: {
        fontSize: theme.fontSizes.lg,
        fontWeight: "500",
        textAlign: 'center',
        border: "none",
        paddingRight: `${theme.spacing.xs} !important`,
        paddingLeft: `${theme.spacing.xs} !important`,
        height: "5px",
        flex: 1,
        width: "45px",
        // backgroundColor: theme.colors[theme.primaryColor][6],
        color: theme.colors[theme.primaryColor][6],
        [theme.fn.smallerThan('sm')]: {
            // width: "20px",
        },
    },

    actionIcon: {
        border: "none",
        // backgroundColor: theme.colors[theme.primaryColor][2],
        color: theme.colors[theme.primaryColor][6],
        borderRadius: theme.radius.xl,
        '&:focus-within': {
            // borderColor: theme.colors[theme.primaryColor][3],
            // backgroundColor: theme.colors[theme.primaryColor][2],
        },

        '&:hover': {
            backgroundColor: "none",
        }
    }
}));

// type CartCounterProps {
//     counts: number;
//     onChange: (value) => void;
// }

export const CartCounterButton = (props) => {
    const { counter, onChange } = props;
    const [value, setValue] = useState(1);
    const handlers = useRef<NumberInputHandlers>();
    const {classes} = useStyles();

    const handleChangeValue = (val) => {
        onChange(val)
        setValue(val)
    };

    return (
        <Group spacing={5} className={classes.wrapper}>
            <ActionIcon
                size={30}
                variant="default"

                onClick={() => handlers.current.decrement()}
                className={classes.actionIcon}

            >
                <IconChevronLeft/>
            </ActionIcon>

            <NumberInput
                hideControls
                value={value}
                onChange={(val) => handleChangeValue(val)}
                handlersRef={handlers}
                max={99}
                min={0}
                step={1}
                classNames={{ input: classes.input }}
            />

            <ActionIcon
                size={30}
                variant="default"
                className={classes.actionIcon}
                onClick={() => handlers.current.increment()}
            >
                <IconChevronRight/>
            </ActionIcon>
        </Group>
    );
}