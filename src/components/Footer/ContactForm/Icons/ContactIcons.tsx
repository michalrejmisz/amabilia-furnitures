import {
    createStyles,
    ThemeIcon,
    Text,
    SimpleGrid,
    Box,
    Stack,
} from '@mantine/core'
import { IconSun, IconPhone, IconMapPin, IconAt } from '@tabler/icons'
import { ENTIRE_STATIC_CONTENT } from '../../../../lib/graphql/pagesContent'
import { useQuery } from '@apollo/client'

type ContactIconVariant = 'white' | 'gradient'

interface ContactIconStyles {
    variant: ContactIconVariant
}

const useStyles = createStyles((theme, { variant }: ContactIconStyles) => ({
    wrapper: {
        display: 'flex',
        alignItems: 'center',
        color: theme.white,
    },

    icon: {
        marginRight: theme.spacing.md,
        backgroundImage:
            variant === 'gradient'
                ? `linear-gradient(135deg, ${theme.colors[theme.primaryColor][4]} 0%, ${
                      theme.colors[theme.primaryColor][6]
                  } 100%)`
                : 'none',
        backgroundColor: 'transparent',
    },

    title: {
        color:
            variant === 'gradient'
                ? theme.colors.gray[6]
                : theme.colors[theme.primaryColor][0],
    },

    description: {
        color: variant === 'gradient' ? theme.black : theme.white,
    },
}))

interface ContactIconProps
    extends Omit<React.ComponentPropsWithoutRef<'div'>, 'title'> {
    icon: React.FC<any>
    title: React.ReactNode
    description: React.ReactNode
    variant?: ContactIconVariant
}

function ContactIcon({
    icon: Icon,
    title,
    description,
    variant = 'gradient',
    className,
    ...others
}: ContactIconProps) {
    const { classes, cx } = useStyles({ variant })
    return (
        <div className={cx(classes.wrapper, className)} {...others}>
            {variant === 'gradient' ? (
                <ThemeIcon size={40} radius="md" className={classes.icon}>
                    <Icon size={24} />
                </ThemeIcon>
            ) : (
                <Box mr="md">
                    <Icon size={24} />
                </Box>
            )}

            <div style={{ textAlign: 'start' }}>
                <Text size="xs" className={classes.title}>
                    {title}
                </Text>
                <Text className={classes.description}>{description}</Text>
            </div>
        </div>
    )
}

interface ContactIconsListProps {
    icons?: ContactIconProps[]
    variant?: ContactIconVariant
}
export function ContactIconsList({ variant }: ContactIconsListProps) {
    const { loading, error, data } = useQuery(ENTIRE_STATIC_CONTENT, {
        fetchPolicy: 'network-only',
        nextFetchPolicy: 'cache-first',
    })
    const formInformationList = [
        {
            title: 'Email',
            description:
                data?.formularzKontaktowy?.data?.attributes?.Email ?? '',
            icon: IconAt,
        },
        {
            title: 'Telefon',
            description:
                data?.formularzKontaktowy?.data?.attributes?.Telefon ?? '',
            icon: IconPhone,
        },
        {
            title: 'Adres',
            description:
                data?.formularzKontaktowy?.data?.attributes?.Adres ?? '',
            icon: IconMapPin,
        },
        {
            title: 'Godziny otwarcia',
            description:
                data?.formularzKontaktowy?.data?.attributes?.GodzinyOtwarcia ??
                '',
            icon: IconSun,
        },
    ]

    const items = formInformationList.map((item, index) => (
        <ContactIcon key={index} variant={variant} {...item} />
    ))
    return <Stack>{items}</Stack>
}

export function ContactIcons() {
    return (
        <SimpleGrid cols={2} breakpoints={[{ maxWidth: 755, cols: 1 }]}>
            <Box
                sx={(theme) => ({
                    padding: theme.spacing.xl,
                    borderRadius: theme.radius.md,
                    backgroundColor: theme.white,
                })}
            >
                <ContactIconsList />
            </Box>

            <Box
                sx={(theme) => ({
                    padding: theme.spacing.xl,
                    borderRadius: theme.radius.md,
                    backgroundImage: `linear-gradient(135deg, ${theme.colors[theme.primaryColor][6]} 0%, ${
                        theme.colors[theme.primaryColor][4]
                    } 100%)`,
                })}
            >
                <ContactIconsList variant="white" />
            </Box>
        </SimpleGrid>
    )
}
