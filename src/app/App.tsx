import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/typedStore';
import {
    selectCosmetics,
    fetchAllCosmetics
} from '../features/cosmetics/cosmeticsSlice';

import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import {
    CircularProgress,
    Box,
    Grid,
    Backdrop,
    Typography
} from '@mui/material';

import ItemCard from '../components/ItemCard';
import ItemSearch from '../components/ItemSearch';
import ItemsPagination from '../components/ItemsPagination';

import { Languages } from '../enums';
import { CosmeticsItem } from '../types/cosmetics';
import { theme, MAXIMUM_PAGE_ITEMS } from '../constants';

const App = () => {
    const dispatch = useAppDispatch();
    const cosmetics = useAppSelector(selectCosmetics);

    const [page, setPage] = useState(1);
    const [searchedItems, setSearchedItems] = useState<CosmeticsItem[]>([]);
    const isLoading =
        cosmetics.status === 'idle' || cosmetics.status === 'loading';
    const pageItems = searchedItems.slice(
        (page - 1) * MAXIMUM_PAGE_ITEMS,
        page * MAXIMUM_PAGE_ITEMS
    );

    const searchItems = (value: string) =>
        setSearchedItems(
            cosmetics.items.filter(
                (item) =>
                    item.name.toLowerCase().includes(value.toLowerCase()) ||
                    item.description.toLowerCase().includes(value.toLowerCase())
            )
        );

    useEffect(() => {
        if (cosmetics.status === 'idle') {
            dispatch(fetchAllCosmetics({ language: Languages.English }));
        } else if (cosmetics.status === 'succeeded') {
            setSearchedItems(cosmetics.items);
        }
    }, [cosmetics.status]);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Backdrop
                sx={{
                    color: '#fff',
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)'
                }}
                open={isLoading}
                transitionDuration={{ exit: 300 }}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <Box
                sx={{
                    maxWidth: '1200px',
                    margin: '0 auto',
                    padding: '0 10px',
                    width: '100%',
                    height: '100vh',
                    overflow: 'auto',
                    '&::-webkit-scrollbar': {
                        display: 'none'
                    },
                    scrollbarWidth: 'none'
                }}
            >
                <Grid container>
                    <Grid item xs={12} sm={12} md={6} lg={6} mt={2} mb={2}>
                        <ItemSearch onSearch={searchItems} />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} mt={2} mb={2}>
                        <Box
                            display={'flex'}
                            justifyContent={'center'}
                            alignItems={'center'}
                        >
                            {!isLoading && (
                                <ItemsPagination
                                    items={searchedItems}
                                    page={page}
                                    onPageChanged={(page) => setPage(page)}
                                />
                            )}
                        </Box>
                    </Grid>
                </Grid>
                {!isLoading &&
                    (searchItems.length === 0 ? (
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: '100vh'
                            }}
                        >
                            <Typography variant="h4">
                                Items not found...
                            </Typography>
                        </Box>
                    ) : (
                        <Grid container spacing={1}>
                            {pageItems.map((item) => (
                                <Grid
                                    item
                                    xs={4}
                                    sm={4}
                                    md={3}
                                    lg={1.5}
                                    key={item.id}
                                >
                                    <ItemCard item={item} />
                                </Grid>
                            ))}
                        </Grid>
                    ))}
            </Box>
        </ThemeProvider>
    );
};

export default App;
