import React, { useState, useEffect } from 'react';

import { TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

interface ItemSearchProps {
    onSearch: (text: string) => any;
}

const ItemSearch: React.FC<ItemSearchProps> = ({ onSearch }) => {
    const [value, setValue] = useState('');

    useEffect(() => {
        const delay = 200;
        const timeout = setTimeout(() => {
            onSearch(value);
        }, delay);

        return () => {
            clearTimeout(timeout);
        };
    }, [value]);

    return (
        <TextField
            fullWidth
            value={value}
            onChange={(event) => setValue(event.target.value)}
            InputProps={{
                startAdornment: <SearchIcon color="action" />
            }}
            sx={{
                borderRadius: '16px'
            }}
        />
    );
};

export default ItemSearch;
