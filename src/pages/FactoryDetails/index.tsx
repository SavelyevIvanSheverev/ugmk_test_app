import React, { useEffect, useMemo } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import style from './FactoryDetails.module.scss';
import ChartPie from '../../components/ChartPie';
import Error from '../../components/Error';
import { useGetProductsQuery } from '../../store/api/productsApi';
import { useAppSelector } from '../../store/hooks';
import { selectProducts } from '../../store/slices/productsSlice';
import { EFactory, EMonth } from '../../types';

const FactoryDetails = () => {
    const navigate = useNavigate();
    const { isError } = useGetProductsQuery();
    const productsByMonth = useAppSelector(selectProducts);

    const { factoryId, monthNumber } = useParams();

    useEffect(() => {
        if(productsByMonth && monthNumber && factoryId) {
            if (!productsByMonth[monthNumber] || !productsByMonth[factoryId]) {
                navigate('/404');
            }
        }
    }, [productsByMonth]);

    const productsVolume = useMemo(() => {
        if (productsByMonth && monthNumber && factoryId && productsByMonth[monthNumber] && productsByMonth[factoryId]) {
            return productsByMonth[monthNumber][factoryId].reduce((volume: { product1: number, product2: number }, product) => {
                if (product.product1) volume.product1 += product.product1;
                if (product.product2) volume.product2 += product.product2;
                return volume;
            }, { product1: 0, product2: 0 });
        }
    }, [productsByMonth]);


    const chartData = useMemo(() => {
        if (productsVolume) {
            return {
                labels: ['Продукт 1', 'Продукт 2'],
                datasets: [
                    {
                        label: 'Кг',
                        data: Object.values(productsVolume),
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)'
                        ],
                        borderWidth: 1
                    }
                ]
            };
        }
    }, [productsVolume]);

    if (isError) {
        return <Error />;
    }

    return (
        <div className={style.root}>
            <h1 className={style.title}>
                {(monthNumber && factoryId) && (
                    `Статистика по продукции фибрики ${Object.values(EFactory)[Number(factoryId) - 1]} за ${Object.values(EMonth)[Number(monthNumber) - 1]}`
                )}
            </h1>
            {chartData && <ChartPie data={chartData} />}
        </div>
    );
};

export default FactoryDetails;
