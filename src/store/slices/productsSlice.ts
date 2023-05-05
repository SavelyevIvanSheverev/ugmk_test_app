import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { transformProductsData } from '../../helpers';
import { TransformProductsData } from '../../types';
import { RootState } from '../store';
import { ProductType } from '../types/product';


interface IProductsSlice {
    productsByMonth: TransformProductsData | null;
}

const initialState: IProductsSlice = {
    productsByMonth: null
};

export const productsSlice = createSlice({
    initialState,
    name: 'productsSlice',
    reducers: {
        setProductsData: (state, action: PayloadAction<ProductType[]>) => {
            state.productsByMonth = transformProductsData(action.payload);
        }
    }
});

export default productsSlice.reducer;

export const {
    setProductsData
} = productsSlice.actions;

export const selectProducts = (state: RootState) => state.productsSlice.productsByMonth;
