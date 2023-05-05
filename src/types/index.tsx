import { ProductType } from '../store/types/product';

export enum EMonth {
    January = 'Янв',
    February = 'Фев',
    March = 'Мар',
    April = 'Апр',
    May = 'Май',
    June = 'Июн',
    July = 'Июл',
    August = 'Авг',
    September = 'Сен',
    October = 'Окт',
    November = 'Ноя',
    December = 'Дек'
}

export enum EFactory {
    FactoryA = 'А',
    FactoryB = 'Б',

}


export type TransformProductsData = {
    [key: string]: {
        [k: string]: ProductType[]
    }
}

export enum EFilterActions {
    All = 'All',
    Product_1 = 'Product_1',
    Product_2 = 'Product_2',
}
