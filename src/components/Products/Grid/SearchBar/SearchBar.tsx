import {
    createStyles,
} from '@mantine/core';
import {InputWithButton} from "./SearchInput";
import {OrderByField} from "./OrderByField";

const useStyles = createStyles((theme) => ({
    searchBar: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: theme.colors[theme.primaryColor][6],
        height: '60px',
        width: '100%',
        // alignItems: 'center',
        justifyContent: 'space-between',
    }
}))

export const SearchBar = () => {
    const { classes } =useStyles()
    return(
        <div className={classes.searchBar}>
            <OrderByField/>
            <InputWithButton/>
        </div>
    )
}