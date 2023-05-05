import React, { FC } from 'react';

import { ArcElement, Chart as ChartJS, ChartData, Legend, Tooltip } from 'chart.js';
import { Pie } from 'react-chartjs-2';

import style from './ChartPie.module.scss';


ChartJS.register(ArcElement, Tooltip, Legend);

interface IChartPieProps {
    data: ChartData<'pie'>
}

const ChartPie: FC<IChartPieProps> = ({ data }) => {
    return (
        <Pie data={data} className={style.root} />
    );
};

export default ChartPie;
