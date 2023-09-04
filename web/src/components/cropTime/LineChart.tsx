'use client';

import useAppStore from '@/store';
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
import {useEffect, useState} from 'react';
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
	chartRef: any;
	initialData: ChartData<'line'>;
	hoverMarkerRef: any;
	barChartRef: any;
};

const LineChart: React.FC<ChartProps> = ({
	chartRef,
	initialData,
	hoverMarkerRef,
	barChartRef,
}) => {
	const {bgRange} = useAppStore();
	const initialOptions: any = {
		animation: false,
		responsive: true,
		plugins: {
			backgroundColorRange: {
				backgroundColor: 'rgba(255, 99, 132, 0.2)',
				min: bgRange.min,
				max: bgRange.max,
			},
			legend: {
				position: 'bottom' as const,
				align: 'start' as const,
			},
			title: {
				display: true,
				text: 'Performance throughout the day (Los Angeles)',
			},
			crosshair: {
				sync: {
					enabled: true,
				},
			},
		},
		scales: {
			y: {
				beginAtZero: true,
			},
		},
		maintainAspectRatio: false,
		pointHoverRadius: 6,
	};

	const [data] = useState(initialData);
	const [options, setOptions] = useState<any>(initialOptions);

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
					// {
					// 	id: 'hoverMarkerBackground',
					// 	afterDatasetsDraw: (chart: any, args: any, plugins: any) => {
					// 		const {
					// 			ctx,
					// 			chartArea: {top, bottom, _, right},
					// 		} = chart;
					// 		if (hoverMarkerRef.current === undefined) return;

					// 		ctx.save();
					// 		ctx.beginPath();
					// 		ctx.strokeStyle = 'rgba(0, 0, 0, 1)';
					// 		ctx.fillStyle = 'rgba(0, 0, 0, .1)';
					// 		ctx.lineWidth = 2;
					// 		ctx.moveTo(hoverMarkerRef.current, top);
					// 		ctx.lineTo(hoverMarkerRef.current, bottom);
					// 		ctx.stroke();
					// 		ctx.lineTo(right, bottom);
					// 		ctx.lineTo(right, top);
					// 		ctx.closePath();
					// 	},
					// 	afterEvent: (chart: any, args: any, pluginOptions: any) => {
					// 		const xCoor = args.event.x;
					// 		if (args.inChartArea) {
					// 			hoverMarkerRef.current = xCoor;
					// 		} else {
					// 			hoverMarkerRef.current = undefined;
					// 		}
					// 		args.changed = true;
					// 	},
					// },
				]}
				height={320}
			/>
		</div>
	);
};

export default LineChart;
