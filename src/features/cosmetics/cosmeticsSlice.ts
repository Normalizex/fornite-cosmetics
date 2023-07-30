import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllCosmetics } from './cosmeticsAPI';
import {
    CosmeticsItem,
    CosmeticsApiLanguageOptions
} from '../../types/cosmetics';
import { RootState } from '../../app/store';

type statuses = 'idle' | 'loading' | 'succeeded' | 'failed';

interface CosmeticsState {
    items: CosmeticsItem[];
    status: statuses;
    error: string | null;
}

const sliceName = 'cosmetics';
export const fetchAllCosmetics = createAsyncThunk(
    `${sliceName}/fetchAllCosmetics`,
    async (params?: CosmeticsApiLanguageOptions) => getAllCosmetics(params)
);

const initialState: CosmeticsState = {
    items: [],
    status: 'idle',
    error: null
};

const cosmeticsSlice = createSlice({
    name: sliceName,
    initialState,
    reducers: {
        setItems(
            state,
            action: PayloadAction<{ status: statuses; items: CosmeticsItem[] }>
        ) {
            const { status, items } = action.payload;

            state.status = status;
            state.items = items;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAllCosmetics.pending, (state) => {
            state.status = 'loading';
        });
        builder.addCase(fetchAllCosmetics.rejected, (state) => {
            state.status = 'failed';
        });
        builder.addCase(fetchAllCosmetics.fulfilled, (state, action) => {
            const items = action.payload;

            state.items = items;
            state.status = 'succeeded';
        });
    }
});

export default cosmeticsSlice.reducer;
export const { setItems } = cosmeticsSlice.actions;
export const selectCosmetics = (state: RootState) => state.cosmetics;
