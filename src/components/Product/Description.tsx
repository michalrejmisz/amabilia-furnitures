import React from 'react'
import { createStyles, Tabs } from '@mantine/core'

const useStyles = createStyles((theme) => ({
    tabs: {},

    tabsList: {
        color: theme.colors[theme.primaryColor][3],
        borderBottom: `solid 2px ${theme.colors[theme.primaryColor][1]}`,
        marginBottom: '25px',
        '&:empty': {
            border: 'none',
        },
    },

    tab: {
        fontSize: theme.fontSizes.xl,
        color: theme.colors[theme.primaryColor][6],
        ':active': {
            marginBottom: '-2px',
            borderBottom: `solid 2px ${theme.colors[theme.primaryColor][6]}`,
            color: theme.colors[theme.primaryColor][3],
        },

        '&[data-active]': {
            background: theme.colors[theme.primaryColor][6],
            color: theme.white,
        },

        '&[aria-selected=true]': {
            color: theme.white,
        },
    },

    panel: {
        textAlign: 'left',
        color: theme.colors[theme.primaryColor][9],
    },
}))

interface DescriptionProps {
    description?: String
    dimensions?: String
}

export const Description = ({ description, dimensions }: DescriptionProps) => {
    const { classes } = useStyles()

    return (
        <Tabs
            defaultValue={`${description != null ? 'description' : 'dimensions'}`}
            classNames={{ tabsList: classes.tabsList }}
        >
            <Tabs.List>
                {description != null && description.length > 0 ? (
                    <Tabs.Tab value="description" className={classes.tab}>
                        Opis
                    </Tabs.Tab>
                ) : (
                    ''
                )}
                {dimensions != null && dimensions.length > 0 ? (
                    <Tabs.Tab value="dimensions" className={classes.tab}>
                        Wymiary
                    </Tabs.Tab>
                ) : (
                    ''
                )}
            </Tabs.List>

            {description != null && description.length > 0 ? (
                <Tabs.Panel
                    value="description"
                    mb={'50px'}
                    className={classes.panel}
                >
                    <div dangerouslySetInnerHTML={{ __html: description }} />
                </Tabs.Panel>
            ) : (
                ''
            )}

            {dimensions != null && dimensions.length > 0 ? (
                <Tabs.Panel
                    value="dimensions"
                    mb={'50px'}
                    className={classes.panel}
                >
                    <div dangerouslySetInnerHTML={{ __html: dimensions }} />
                </Tabs.Panel>
            ) : (
                ''
            )}
        </Tabs>
    )
}
