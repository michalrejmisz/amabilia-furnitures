import { createStyles, Button } from '@mantine/core'
import { InputWithButton } from './SearchInput'
import { OrderByField } from './OrderByField'

const useStyles = createStyles((theme) => ({
    searchBar: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: theme.colors[theme.primaryColor][6],
        height: '60px',
        width: '100%',
        justifyContent: 'flex-end',
    },
}))

interface SearchBarProps {
    handleSearchInput: (arg: string) => void
}

export const SearchBar = ({ handleSearchInput }: SearchBarProps) => {
    const { classes } = useStyles()
    return (
        <div className={classes.searchBar}>
            <InputWithButton searchInputFunction={handleSearchInput} />
        </div>
    )
}
