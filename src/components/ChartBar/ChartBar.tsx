import React, { FC, useRef } from 'react';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend, InteractionItem, ChartOptions, ChartData, Chart
} from 'chart.js';
import { Bar, getElementAtEvent } from 'react-chartjs-2';

import style from './ChartBar.module.scss';


ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

interface IChartBarProps {
    options: ChartOptions
    data: ChartData<'bar'>
    onClick?: (elem: InteractionItem) => void
}

const ChartBar: FC<IChartBarProps> = ({ options, data, onClick }) => {
    const chartRef = useRef<Chart<'bar'>>();
    const onClickBar = (event: React.MouseEvent<HTMLCanvasElement>) => {
        const elem = getElementAtEvent(chartRef.current as Chart<'bar'>, event);
        if (elem.length && onClick) {
            onClick && onClick(elem[0]);
        }
    };

    return (
        <div className={style.root}>
            <Bar options={options} data={data} ref={chartRef} onClick={onClickBar} />
        </div>
    );
};

export default ChartBar;
