import axios from 'axios';

import { endpoint } from '../../constants';
import {
    CosmeticsItem,
    CosmeticsApiLanguageOptions,
    CosmeticsResponse
} from '../../types/cosmetics';
import { Languages } from '../../enums';

export const getAllCosmetics = (params?: CosmeticsApiLanguageOptions) =>
    axios
        .get<CosmeticsResponse<CosmeticsItem[]>>(`${endpoint}/cosmetics/br`, {
            params: { language: Languages.English, ...params }
        })
        .then((response) => response.data.data);
