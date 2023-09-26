'use client'
import { Button, IconButton, Input, InputUnstyled, styled } from '@mui/joy';
import { Search } from '@mui/icons-material';
import styles from './Header.module.css';

const SearchButton = styled(Button)({
    borderRadius: '50%',
});

function SearchBar() {
    const handleSubmit = (event) => {
        event.preventDefault();
    }
    return (
        <form onSubmit={handleSubmit}>
            <Input
                className={styles.search}
                sx={{ '--Input-radius': `21px` }}
                placeholder="Search something…"
                endDecorator={
                    <IconButton sx={{ '--IconButton-radius': `21px` }}>
                        <Search variant="soft" />
                    </IconButton>

                }
            />
        </form>

    );
}

export default SearchBar;


{/* <InputUnstyled
            component={Input}
            placeholder="Search something..."
            endAdornment={
                <SearchButton>
                    <Search />
                </SearchButton>
            }
        /> */}