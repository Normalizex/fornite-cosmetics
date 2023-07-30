import React, { useState } from 'react';
import { Card, CardMedia } from '@mui/material';

import ItemDetails from './ItemDetails';

import { CosmeticsItem } from '../types/cosmetics';

const ItemCard: React.FC<{ item: CosmeticsItem }> = ({ item }) => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <Card onClick={() => setOpen(true)}>
                <CardMedia
                    component="img"
                    image={item.images.icon || item.images.smallIcon}
                    alt={item.name}
                    sx={{
                        height: '100%',
                        objectFit: 'cover',
                        transition:
                            'transform 0.3s ease-in-out, filter 0.3s ease-in-out',
                        transform: 'scale(1)',
                        '&:hover': {
                            transform: 'scale(1.2)',
                            filter: 'brightness(1.2)'
                        },
                        cursor: 'pointer'
                    }}
                />
            </Card>
            {open && <ItemDetails item={item} onClose={() => setOpen(false)} />}
        </>
    );
};

export default ItemCard;
