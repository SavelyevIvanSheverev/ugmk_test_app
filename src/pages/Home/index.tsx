import React, { useEffect, useMemo, useState } from 'react';

import { InteractionItem } from 'chart.js';
import { useNavigate } from 'react-router-dom';

import style from './Home.module.scss';
import ChartBar from '../../components/ChartBar/ChartBar';
import Error from '../../components/Error';
import { Select, Option } from '../../components/Select';
import { STORAGE_ACTION_FILTER } from '../../constants';
import { getProductionsVolume } from '../../helpers';
import { useGetProductsQuery } from '../../store/api/productsApi';
import { useAppSelector } from '../../store/hooks';
import { selectProducts } from '../../store/slices/productsSlice';
import { EFactory, EFilterActions, EMonth } from '../../types';

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'bottom' as const
        }
    }
};

const labels = Object.values(EMonth);

const selectOptions = [
    { name: 'Все продукты', value: EFilterActions.All },
    { name: 'Продукт 1', value: EFilterActions.Product_1 },
    { name: 'Продукт 2', value: EFilterActions.Product_2 }
];
const Home = () => {
    const navigate = useNavigate();
    const { isError } = useGetProductsQuery();
    const productsByMonth = useAppSelector(selectProducts);
    const [filter, setFilter] = useState<EFilterActions>(EFilterActions.All);
    const [selectValue, setSelectValue] = useState<string>();

    useEffect(() => {
        if (localStorage.getItem(STORAGE_ACTION_FILTER)) {
            const defaultValue = selectOptions.find(option => {
                if (localStorage.getItem(STORAGE_ACTION_FILTER)) {
                    return option.value === localStorage.getItem(STORAGE_ACTION_FILTER);
                } else {
                    return option.value === EFilterActions.All;
                }
            });
            if (defaultValue) {
                setSelectValue(defaultValue?.value);
                setFilter(defaultValue.value);
            }
        }
    }, []);

    const onChangeSelect = (option: string) => {
        setFilter(option as EFilterActions);
        localStorage.setItem(STORAGE_ACTION_FILTER, option);
    };

    const chartBarData = useMemo(() => {
        return {
            labels,
            datasets: [
                {
                    label: `Фабрика ${EFactory.FactoryA}`,
                    data: productsByMonth ? getProductionsVolume(productsByMonth, filter)?.factory_a : [],
                    backgroundColor: 'rgba(255, 99, 132, 0.5)'
                },
                {
                    label: `Фабрика ${EFactory.FactoryB}`,
                    data: productsByMonth ? getProductionsVolume(productsByMonth, filter)?.factory_b : [],
                    backgroundColor: 'rgba(53, 162, 235, 0.5)'
                }
            ]
        };
    }, [productsByMonth, filter]);


    const onClick = (elem: InteractionItem) => {
        navigate(`${elem.datasetIndex + 1}/${elem.index + 1}`);
    };

    if (isError) {
        return <Error />;
    }

    return (
        <div className={style.root}>
            <div className={style.filter_block}>
                <div className={style.select_wrapper}>
                    <h4 className={style.sub_title}>Фильтр по типу продукции</h4>
                    <Select
                        options={selectOptions}
                        defaultValue={selectValue}
                        onChange={onChangeSelect}
                        className={style.select}
                    >
                        {selectOptions.map((item, index) => <Option key={index}
                            value={item.value}>{item.name}</Option>)}
                    </Select>
                </div>
            </div>

            <ChartBar
                options={options}
                data={chartBarData}
                onClick={onClick}
            />
        </div>
    );
};

export default Home;
