import { Pagination } from '@mui/material';
import React, { useEffect } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';

import { CosmeticsItem } from '../types/cosmetics';
import { theme, MAXIMUM_PAGE_ITEMS } from '../constants';

interface ItemsPaginationProps {
    items: CosmeticsItem[];
    page: number;
    onPageChanged: (page: number) => any;
}

const ItemsPagination: React.FC<ItemsPaginationProps> = ({
    page,
    items,
    onPageChanged
}) => {
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    useEffect(() => {
        if (page > Math.ceil(items.length / MAXIMUM_PAGE_ITEMS)) {
            onPageChanged(Math.ceil(items.length / MAXIMUM_PAGE_ITEMS) || 1);
        }
    }, [items]);

    return (
        <Pagination
            count={Math.ceil(items.length / MAXIMUM_PAGE_ITEMS)}
            page={page}
            size={isSmallScreen ? 'medium' : 'large'}
            hidePrevButton
            hideNextButton
            sx={{
                '& .MuiPagination-ul': {
                    flexWrap: 'nowrap',
                    overflow: 'auto',
                    scrollbarWidth: 'none',
                    '&::-webkit-scrollbar': {
                        display: 'none'
                    }
                }
            }}
            onChange={(_, selectedPage) => onPageChanged(selectedPage)}
        />
    );
};

export default ItemsPagination;
