'use client';

import {
	CategoryScale,
	ChartData,
	Chart as ChartJS,
	Legend,
	LineElement,
	LinearScale,
	PointElement,
	Title,
	Tooltip,
} from 'chart.js';
import annotationPlugin from 'chartjs-plugin-annotation';
import {useEffect, useRef, useState} from 'react';
import {Line} from 'react-chartjs-2';

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
	annotationPlugin,
);

type ChartProps = {
	initialData: ChartData<'line'>;
	bgRange: {
		min: number;
		max: number;
	};
	setBgRange: (bgRange: {min: number; max: number}) => void;
	dataLength: number;
};

const LineChart: React.FC<ChartProps> = ({
	initialData,
	bgRange,
	setBgRange,
	dataLength,
}) => {
	const initialOptions: any = {
		animation: false,
		responsive: true,
		plugins: {
			backgroundColorRange: {
				backgroundColor: 'rgba(255, 99, 132, 0.2)',
			},
			legend: {
				position: 'bottom' as const,
				align: 'start' as const,
			},
			title: {
				display: true,
				text: 'Performance throughout the day (Los Angeles)',
			},
		},
		scales: {
			y: {
				beginAtZero: true,
			},
		},
		maintainAspectRatio: false,
	};

	const chartRef = useRef<any>();
	const [data] = useState(initialData);
	const [options, setOptions] = useState<any>({
		...initialOptions,
		plugins: {
			...initialOptions.plugins,
			backgroundColorRange: {
				...initialOptions.plugins.backgroundColorRange,
				min: bgRange.min,
				max: bgRange.max,
			},
		},
	});

	useEffect(() => {
		setOptions((prevOptions: any) => ({
			...prevOptions,
			plugins: {
				...prevOptions.plugins,
				backgroundColorRange: {
					...prevOptions.plugins.backgroundColorRange,
					min: bgRange.min,
					max: bgRange.max,
				},
			},
		}));
	}, [bgRange]);

	return (
		<div className="h-full">
			<Line
				ref={chartRef}
				data={data}
				options={options}
				plugins={[
					{
						id: 'backgroundColorRange',
						beforeDatasetsDraw: (chart: any, args: any, pluginOptions: any) => {
							const {
								ctx,
								chartArea: {top, bottom, left, right, width, height},
								scales: {x, y},
							} = chart;
							ctx.save();
							ctx.fillStyle = pluginOptions.backgroundColor;
							ctx.fillRect(
								x.getPixelForValue(pluginOptions.min),
								top,
								x.getPixelForValue(pluginOptions.max) -
									x.getPixelForValue(pluginOptions.min),
								height,
							);
						},
					},
				]}
				height={320}
			/>
		</div>
	);
};

export default LineChart;
