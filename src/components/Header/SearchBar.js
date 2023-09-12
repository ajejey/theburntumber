'use client'
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material'
import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import styles from './Header.module.css'

function SearchBar() {
    return (
        <FormControl
            className={styles.searchBar}
            variant="outlined"
        >
            <OutlinedInput
                id="search"
                type='text'
                size='small'
                style={{ borderRadius: '30px' }}
                placeholder='Search something...'
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="search"
                            edge="end"
                        >
                            <SearchIcon />
                        </IconButton>
                    </InputAdornment>
                }

            />
        </FormControl>
    )
}

export default SearchBar
