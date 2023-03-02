import { createStyles, Center } from '@mantine/core'
import { forwardRef, Ref } from 'react'
import { ContactUsForm } from './ContactForm/ContactUsForm'

const useStyles = createStyles((theme) => ({
    footer: {
        backgroundColor: theme.colors[theme.primaryColor][7],
        textAlign: 'center',
        maxWidth: '100vw',
        boxSizing: 'border-box',
        backgroundImage: `linear-gradient(-60deg, ${theme.colors[theme.primaryColor][4]} 0%, ${
            theme.colors[theme.primaryColor][7]
        } 100%)`,

        [theme.fn.smallerThan('sm')]: {
            // minHeight: '20vh',
        },
    },

    column: {
        // borderRight: `solid 2px ${theme.colors[theme.primaryColor][9]}`,
        // "&:last-child" : {
        //   border: "none",
        // }
    },
}))

type FooterProps = {
    mapRef: Ref<HTMLDivElement>
}

const Map = () => {
    return (
        <Center>
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d32770.63905829209!2d16.956597266372697!3d52.375998797888705!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47045b04ba2168c3%3A0x7ec12c62185106fc!2sAmabilia%20-%20Meble%20biurowe!5e0!3m2!1spl!2spl!4v1679498421395!5m2!1spl!2spl"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                title="Mapa dojazdu"
                referrerPolicy="no-referrer-when-downgrade"
                name="Mapa dojazdu"
            />
        </Center>
    )
}

const Footer = forwardRef<HTMLDivElement, FooterProps>((props, ref) => {
    const { mapRef } = props
    const { classes } = useStyles()

    return (
        <footer className={classes.footer} ref={ref}>
            <ContactUsForm />
            <div ref={mapRef}>
                <Map />
            </div>
        </footer>
    )
})

Footer.displayName = 'Footer'

export default Footer
