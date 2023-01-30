import {
    Center,
    Select,
    createStyles,
} from '@mantine/core';

const useStyles = createStyles((theme) => ({
    orderBy: {
        margin: '10px',
        alignSelf: 'flex-start',
    }
}))


export const OrderByField = () => {
    const { classes } = useStyles()
    return(
        <div className={classes.orderBy}>
            <Center>
                <Select
                    size={'md'}
                    placeholder="Sortuj"
                    data={[
                        { value: 'price_asc', label: 'Cena rosnąco' },
                        { value: 'price_desc', label: 'Cena malejąco' },
                        { value: 'name_asc', label: 'Nazwa, A do Z' },
                        { value: 'name_desc', label: 'Nazwa, Z do A' },
                    ]}
                />
            </Center>
        </div>
    )
}

