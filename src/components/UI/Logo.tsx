import { Fragment } from 'react'
import { createStyles } from '@mantine/core'

const useStyles = createStyles((theme) => ({
    logo: {
        minHeight: '50px',
        minWidth: '50px',
        marginRight: '15px',
    },
}))

const Logo = () => {
    const { classes } = useStyles()

    return (
        <Fragment>
            <img
                src="/newLogo.webp"
                className={classes.logo}
                style={{ width: '55px' }}
                alt="Logo firmy"
            />
        </Fragment>
    )
}

export default Logo
