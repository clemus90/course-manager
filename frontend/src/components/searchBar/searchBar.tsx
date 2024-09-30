import { Box, Button, InputAdornment, TextField } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import React, { useState } from 'react'

export interface SearchBarProps {
    onSearch: (term: string) => void
}
const SearchBar = ({ onSearch }: SearchBarProps) => {
    const [term, setTerm] = useState('')
    const clickHandler = () => {
        onSearch(term)
    }
    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTerm(event.target.value)
    }
    return (
        <Box>
            <TextField
                value={term}
                onChange={changeHandler}
                slotProps={{
                    input: {
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    },
                }}
                helperText="this should be contained in the course description"
                placeholder="by description..."
            />
            <Button
                variant="contained"
                sx={{ marginLeft: '8px' }}
                onClick={clickHandler}
            >
                Search
            </Button>
        </Box>
    )
}

export default SearchBar
