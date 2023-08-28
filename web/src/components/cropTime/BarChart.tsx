'use client';

import {
	BarElement,
	CategoryScale,
	ChartData,
	Chart as ChartJS,
	Legend,
	LinearScale,
	Title,
	Tooltip,
} from 'chart.js';
import React, {useRef, useState} from 'react';
import {Bar} from 'react-chartjs-2';
import annotationPlugin from 'chartjs-plugin-annotation';

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
	annotationPlugin,
);

type ChartProps = {
	initialData: ChartData<'bar'>;
};

const BarChart: React.FC<ChartProps> = ({initialData}) => {
	const initialOptions: any = {
		responsive: true,
		scales: {
			x: {
				stacked: true,
				min: 0,
				max: 8,
			},
			y: {
				beginAtZero: true,
			},
		},
		maintainAspectRatio: false,
		plugins: {
			annotation: {
				annotations: [
					{
						type: 'line',
						scaleID: 'x',
						value: 0,
						borderColor: 'red',
						borderWidth: 2,
						label: {
							backgroundColor: 'red',
							content: 'Focus',
						},
					},
				],
			},
		},
	};

	const chartRef = useRef<any>();
	const [data] = useState(initialData);
	const [options] = useState(initialOptions);

	return (
		<div className="h-full">
			<Bar
				ref={chartRef}
				data={data}
				options={options}
				// plugins={[
				// 	{
				// 		id: 'moveChart',
				// 		afterDraw: (chart: any, args: any, pluginOptions: any) => {

				// 		}
				// 	}
				// ]}
				height={320}
			/>
		</div>
	);
};

export default BarChart;
