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
import {useRef, useState} from 'react';
import {Line} from 'react-chartjs-2';
import annotationPlugin from 'chartjs-plugin-annotation';
import InputField from '../fields/InputField';
import Button from '../fields/Button';

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
};

const LineChart: React.FC<ChartProps> = ({initialData}) => {
	const chartRef = useRef<any>();
	const [bgRange, setBgRange] = useState<any>({
		min: 0,
		max: 14,
	});
	const [data] = useState(initialData);
	const [options, setOptions] = useState<any>({
		animation: false,
		responsive: true,
		plugins: {
			backgroundColorRange: {
				min: bgRange.min,
				max: bgRange.max,
				backgroundColor: 'rgba(255, 99, 132, 0.4)',
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
	});

	const onChange = (e: any) => {
		const {id, value} = e.target;
		console.log(id, value);
		setBgRange({
			...bgRange,
			[id]: Number(value),
		});
	};

	return (
		<>
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

			<div className=" my-4">
				BG Range: <div className="mb-3" />
				Min:{' '}
				<InputField
					className="mr-4"
					type="number"
					id="min"
					onChange={onChange}
					defaultValue={0}
				/>
				Max{' '}
				<InputField
					className="mr-4"
					type="number"
					id="max"
					onChange={onChange}
					defaultValue={14}
				/>
				<Button
					text="submit"
					onClick={() => {
						setOptions({
							...options,
							plugins: {
								...options.plugins,
								backgroundColorRange: {
									...options.plugins.backgroundColorRange,
									min: bgRange.min,
									max: bgRange.max,
								},
							},
						});
					}}
				/>
				<br />
				<br />
				<Button
					text="onScrollUp"
					onClick={() => {
						setOptions({
							...options,
							plugins: {
								...options.plugins,
								backgroundColorRange: {
									...options.plugins.backgroundColorRange,
									min: (bgRange.min += 14),
									max: (bgRange.max += 14),
								},
							},
						});
					}}
				/>
				<Button
					text="onScrollDown"
					onClick={() => {
						setOptions({
							...options,
							plugins: {
								...options.plugins,
								backgroundColorRange: {
									...options.plugins.backgroundColorRange,
									min: (bgRange.min -= 14),
									max: (bgRange.max -= 14),
								},
							},
						});
					}}
				/>
			</div>
		</>
	);
};

export default LineChart;
