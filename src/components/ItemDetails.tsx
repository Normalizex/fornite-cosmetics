import React, { useState } from 'react';
import { CardMedia, Box, Typography, Grid } from '@mui/material';

import { CosmeticsItem } from '../types/cosmetics';

interface ItemDetailsProps {
    item: CosmeticsItem;
    onClose: () => any;
}

const ItemDetails: React.FC<ItemDetailsProps> = ({ item, onClose }) => {
    const [variantName, setVariantName] = useState('');
    const [variantImage, setVariantImage] = useState('');

    const detailsFontSize = {
        xs: 'calc(12px + 2vw)',
        sm: 'calc(16px + 1.5vw)',
        md: 'calc(18px + 1vw)',
        lg: 'calc(22px + 0.5vw)'
    };

    const rarityColors: { [rarity: string]: string } = {
        common: '#b1b1b1',
        uncommon: '#87e339',
        rare: '#37d1ff',
        epic: '#e95eff',
        legendary: '#e98d4b'
    };

    const handleClose = () => {
        setVariantName('');
        setVariantImage('');
        onClose();
    };

    return (
        <Box
            sx={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                zIndex: 1300,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'auto'
            }}
            onClick={handleClose}
        >
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
                <Grid
                    container
                    justifyContent="center"
                    alignItems="center"
                    spacing={2}
                    style={{ height: '100%' }}
                >
                    <Grid
                        item
                        xs={12}
                        sm={6}
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <CardMedia
                            component="img"
                            image={
                                variantImage ||
                                item.images.icon ||
                                item.images.smallIcon
                            }
                            alt={item.name}
                            sx={{
                                width: '100%',
                                height: 'auto',
                                objectFit: 'contain'
                            }}
                        />
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        sm={6}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                        onClick={(event) => {
                            event.stopPropagation();
                        }}
                    >
                        <Typography
                            variant="h2"
                            sx={{
                                fontFamily: 'Burbank',
                                minWidth: '12px',
                                textAlign: 'center',
                                whiteSpace: 'normal'
                            }}
                        >
                            {variantName || item.name}
                        </Typography>
                        <Typography
                            variant="h4"
                            mb={3}
                            sx={{
                                color: '#8e9297',
                                fontFamily: 'Burbank',
                                fontStyle: 'italic',
                                fontSize: detailsFontSize
                            }}
                        >
                            {item.description}
                        </Typography>
                        {item.series ? (
                            <Typography
                                variant="body1"
                                sx={{
                                    fontFamily: 'Burbank',
                                    fontSize: detailsFontSize
                                }}
                            >
                                <span>Series: </span>
                                <span
                                    style={{
                                        color: `#${
                                            item.series?.colors[0] || '#fff'
                                        }`
                                    }}
                                >
                                    {item.series.value}
                                </span>
                            </Typography>
                        ) : (
                            <Typography
                                variant="body1"
                                sx={{
                                    fontFamily: 'Burbank',
                                    fontSize: detailsFontSize
                                }}
                            >
                                <span>Rarity: </span>
                                <span
                                    style={{
                                        color:
                                            rarityColors[item.rarity.value] ||
                                            '#fff'
                                    }}
                                >
                                    {item.rarity.value.toUpperCase()}
                                </span>
                            </Typography>
                        )}
                        <Typography
                            variant="body1"
                            sx={{
                                fontFamily: 'Burbank',
                                fontSize: detailsFontSize
                            }}
                        >
                            Type: {item.type.value.toUpperCase()}
                        </Typography>
                        {item.variants && item.variants.length >= 0 && (
                            <Typography
                                variant="body1"
                                sx={{
                                    fontFamily: 'Burbank',
                                    fontSize: detailsFontSize
                                }}
                            >
                                <details style={{ cursor: 'pointer' }}>
                                    <summary>Variants</summary>
                                    <Typography
                                        variant="body1"
                                        sx={{
                                            fontFamily: 'Burbank',
                                            fontSize: detailsFontSize
                                        }}
                                    >
                                        {item.variants.map((variant) => {
                                            return variant.options.map(
                                                (option, optionsIndex) => {
                                                    return (
                                                        <Typography
                                                            key={optionsIndex}
                                                            variant="body2"
                                                            sx={{
                                                                fontFamily:
                                                                    'Burbank',
                                                                color: 'gray',
                                                                fontSize:
                                                                    detailsFontSize,
                                                                textAlign:
                                                                    'right',
                                                                '&:hover': {
                                                                    textDecoration:
                                                                        'underline'
                                                                }
                                                            }}
                                                            onClick={() => {
                                                                setVariantName(
                                                                    option.name !==
                                                                        item.name
                                                                        ? option.name
                                                                        : ''
                                                                );
                                                                setVariantImage(
                                                                    option.name !==
                                                                        item.name
                                                                        ? option.image
                                                                        : ''
                                                                );
                                                            }}
                                                        >
                                                            {option.name}
                                                        </Typography>
                                                    );
                                                }
                                            );
                                        })}
                                    </Typography>
                                </details>
                            </Typography>
                        )}
                        {item.set && (
                            <Typography
                                variant="body1"
                                sx={{
                                    fontFamily: 'Burbank',
                                    fontSize: detailsFontSize
                                }}
                            >
                                Part of: {item.set.value}
                            </Typography>
                        )}
                        {item.introduction && (
                            <Typography
                                variant="body1"
                                sx={{
                                    fontFamily: 'Burbank',
                                    fontSize: detailsFontSize
                                }}
                            >
                                Introduced in: Chapter{' '}
                                {item.introduction?.chapter}, Season{' '}
                                {item.introduction?.season}
                            </Typography>
                        )}
                        <Typography
                            variant="body1"
                            sx={{
                                fontFamily: 'Burbank',
                                fontSize: detailsFontSize
                            }}
                        >
                            Release Date:{' '}
                            {new Date(item.added).toLocaleDateString()}
                        </Typography>
                        {item.shopHistory && item.shopHistory.length >= 0 && (
                            <Typography
                                variant="body1"
                                sx={{
                                    fontFamily: 'Burbank',
                                    fontSize: detailsFontSize
                                }}
                            >
                                <details style={{ cursor: 'pointer' }}>
                                    <summary>Shop History</summary>
                                    <Typography
                                        variant="body1"
                                        sx={{
                                            fontFamily: 'Burbank',
                                            fontSize: detailsFontSize,
                                            maxHeight: '256px',
                                            overflowY: 'scroll',
                                            scrollbarWidth: 'thin',
                                            scrollbarColor:
                                                'rgba(155, 155, 155, 0.5) transparent',
                                            '&::-webkit-scrollbar': {
                                                width: '8px'
                                            },
                                            '&::-webkit-scrollbar-track': {
                                                background: 'transparent'
                                            },
                                            '&::-webkit-scrollbar-thumb': {
                                                backgroundColor:
                                                    'rgba(155, 155, 155, 0.5)',
                                                borderRadius: '20px',
                                                border: 'transparent'
                                            }
                                        }}
                                    >
                                        {[...item.shopHistory]
                                            .reverse()
                                            .map((date, dateIndex) => {
                                                return (
                                                    <Typography
                                                        key={dateIndex}
                                                        variant="body2"
                                                        sx={{
                                                            fontFamily:
                                                                'Burbank',
                                                            fontSize:
                                                                detailsFontSize,
                                                            textAlign: 'right'
                                                        }}
                                                    >
                                                        {new Date(
                                                            date
                                                        ).toLocaleDateString()}
                                                    </Typography>
                                                );
                                            })}
                                    </Typography>
                                </details>
                            </Typography>
                        )}
                        <Typography
                            variant="body1"
                            sx={{
                                fontFamily: 'Burbank',
                                fontSize: detailsFontSize
                            }}
                        >
                            ID: {item.id}
                        </Typography>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

export default ItemDetails;
