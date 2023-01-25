import {createStyles, ThemeIcon, SimpleGrid} from '@mantine/core'
import {IconPhone, IconShoppingCart, IconMail, IconBuildingStore} from '@tabler/icons';
import {Fragment} from 'react';

const useStyles = createStyles((theme) => ({
    mobileFooter: {
        display: 'none',
        position: "sticky",
        right: 0,
        bottom: 0,
        left: 0,
        overflow: 'hidden',
        textAlign: 'center',
        borderTop: `solid 1px ${theme.colors[theme.primaryColor][3]}`,
        paddingTop: '5px',

        [theme.fn.smallerThan('sm')]: {

            display: 'block',
            height: '60px',
            width: '100%',
            backgroundColor: theme.colors[theme.primaryColor][9],
        },
    },

    grid: {
        // position: 'absolute',
        display: 'flex',
        top: '50%',
        margin: 0,
    },

    icon: {
        display: 'flex',
        flexDirection: 'column',
        backgroundImage: 'none',
        width: '100%',
        height: '100%',
        margin: '8px',
        marginTop: '0px',
            // variant === 'gradient'
            //     ? `linear-gradient(135deg, ${theme.colors[theme.primaryColor][4]} 0%, ${
            //         theme.colors[theme.primaryColor][6]
            //     } 100%)`
            //     : 'none',
        backgroundColor: 'transparent',

        svg: {
            strokeWidth: "1",
        }
    },

    svg: {
        strokeWidth: "1",
    }

}));

const MOCKDATA = [
    { title: 'Zadzwoń', icon: IconPhone },
    // { title: 'Telefon', icon: IconMail },
    { title: 'Sklep', icon: IconBuildingStore },
    { title: 'Koszyk', icon: IconShoppingCart },
];

interface ContactIconProps extends Omit<React.ComponentPropsWithoutRef<'div'>, 'title'> {
    icon: React.FC<any>;
    title: React.ReactNode;
}

interface ContactIconsListProps {
    data?: ContactIconProps[];
}

const FooterIcons = ({ icon: Icon, title} : ContactIconProps) => {
    const { classes } = useStyles();
    return (
        <Fragment>
            <ThemeIcon className={classes.icon}>
                <Icon size={35} className={classes.svg}/>
                {title}
            </ThemeIcon>
        </Fragment>
    );
}

export const MobileFooter = ({ data = MOCKDATA }: ContactIconsListProps) => {
    const { classes } = useStyles();
    const items = data.map((item) => <FooterIcons {...item} />);

    return(

        <div className={classes.mobileFooter}>
            <SimpleGrid cols={4} className={classes.grid}>
                    {items}
            </SimpleGrid>
        </div>
    )
};