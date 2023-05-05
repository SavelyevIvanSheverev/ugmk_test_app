import { DateTime } from 'ts-luxon';

import { ProductType } from '../store/types/product';
import { EFilterActions, TransformProductsData } from '../types';

/**
 * Получаем номер месяца из даты
 */
export const getMonth = (date: string) => {
    return DateTime.fromFormatExplain(date, 'd/L/yyyy').result?.month || 0;
};

/**
 * Раскладываем продукцию по фабрикам, фабрики по месяцам
 */
export const transformProductsData = (productsData: ProductType[]) => {
    return productsData?.reduce((result: TransformProductsData, product: ProductType) => {
        if (product.date) {
            const month = getMonth(product.date);
            if (!result[month]) {
                result[month] = {};
                if (!result[month][product.factory_id]) {
                    result[month][product.factory_id] = [product];
                }
            } else {
                result[month] = {
                    ...result[month]
                };
                if (!result[month][product.factory_id]) {
                    result[month][product.factory_id] = [product];
                }
                if (result[month][product.factory_id]) {
                    result[month][product.factory_id].push(product);
                }
            }
        }
        return result;
    }, {});
};
/**
 * Фильтруем объём продукции по продуктам.
 */
export const getProductionsVolume = (productsByMonth: TransformProductsData, action: EFilterActions) => {
    const factoryIds = ['factory_a', 'factory_b'];

    return Object.entries(productsByMonth).reduce((result: any, [key, factories]) => {
        const productionVolume = Object.values(factories).map(products => {
            return products.reduce((volume, product) => {
                switch (action) {
                    case EFilterActions.All:
                        if (product.product1) volume += product.product1;
                        if (product.product2) volume += product.product2;
                        return volume;
                    case EFilterActions.Product_1:
                        if (product.product1) volume += product.product1;
                        return volume;
                    case EFilterActions.Product_2:
                        if (product.product2) volume += product.product2;
                        return volume;
                    default:
                        if (product.product1) volume += product.product1;
                        if (product.product2) volume += product.product2;
                }
                return volume;
            }, 0);
        });
        factoryIds.forEach((id, index) => {
            if (!result[id]) {
                result[id] = [productionVolume[index]];
            } else {
                result[id].push(productionVolume[index]);
            }
        });
        return result;
    }, {});
};
