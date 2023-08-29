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
import React, {useEffect, useRef, useState} from 'react';
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
	bgRange: {
		min: number;
		max: number;
	};
	setBgRange: (bgRange: {min: number; max: number}) => void;
	dataLength: number;
};

const BarChart: React.FC<ChartProps> = ({
	initialData,
	bgRange,
	setBgRange,
	dataLength,
}) => {
	const initialOptions: any = {
		layout: {
			padding: {
				right: 18,
			},
		},
		responsive: true,
		scales: {
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
						value: 5,
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
	const [options, setOptions] = useState({
		...initialOptions,
		scales: {
			...initialOptions.scales,
			x: {
				min: bgRange.min,
				max: bgRange.max,
			},
		},
	});

	useEffect(() => {
		setOptions((prevOptions: any) => ({
			...prevOptions,
			scales: {
				...prevOptions.scales,
				x: {
					min: bgRange.min,
					max: bgRange.max,
				},
			},
		}));
	}, [bgRange]);

	const drawHandler = (
		ctx: any,
		x1: number,
		y1: number,
		pixel: number,
		height: number,
		top: number,
	) => {
		const angle = Math.PI / 180;
		// middle circle
		ctx.beginPath();
		ctx.lineWidth = 2;
		ctx.strokeStyle = 'rgba(102, 102, 102, 0.5)';
		ctx.fillStyle = 'white';
		ctx.arc(x1, height / 2 + top, 15, angle * 0, angle * 360, false);
		ctx.stroke();
		ctx.fill();
		ctx.closePath();

		// Arrow (Left/Right)
		ctx.beginPath();
		ctx.lineWidth = 2;
		ctx.strokeStyle = 'rgba(255, 26, 104, 1)';
		ctx.moveTo(x1 + pixel, height / 2 + top - 7.5);
		ctx.lineTo(x1 - pixel, height / 2 + top);
		ctx.lineTo(x1 + pixel, height / 2 + top + 7.5);
		ctx.stroke();
		ctx.closePath();
	};

	return (
		<div className="h-full">
			<Bar
				ref={chartRef}
				height={320}
				data={data}
				options={options}
				plugins={[
					{
						id: 'moveChart',
						afterEvent: (chart: any, args: any) => {
							const {
								ctx,
								canvas,
								chartArea: {top, bottom, left, right, width, height},
							} = chart;

							canvas.addEventListener('mousemove', (e: any) => {
								const x = args.event.x;
								const y = args.event.y;

								if (
									x >= left - 15 &&
									x <= left + 15 &&
									y >= height / 2 + top - 15 &&
									y <= height / 2 + top + 15
								) {
									canvas.style.cursor = 'pointer';
								} else if (
									x >= right - 15 &&
									x <= right + 15 &&
									y >= height / 2 + top - 15 &&
									y <= height / 2 + top + 15
								) {
									canvas.style.cursor = 'pointer';
								} else {
									canvas.style.cursor = 'default';
								}
							});
						},
						afterDraw: (chart: any, args: any, pluginOptions: any) => {
							const {
								ctx,
								chartArea: {top, bottom, left, right, width, height},
							} = chart;
							drawHandler(ctx, left, 1, 8, height, top); // left arrow
							drawHandler(ctx, right, 1, -8, height, top); // right arrow
						},
					},
				]}
				onClick={(event: React.MouseEvent<HTMLCanvasElement>) => {
					const {
						ctx,
						canvas,
						chartArea: {top, bottom, left, right, width, height},
					} = chartRef.current;
					const rect = canvas.getBoundingClientRect();
					const x = event.clientX - rect.left;
					const y = event.clientY - rect.top;

					if (
						x >= left - 15 &&
						x <= left + 15 &&
						y >= height / 2 + top - 15 &&
						y <= height / 2 + top + 15
					) {
						const clonedOptions: any = structuredClone(options);
						clonedOptions.scales.x.min -= dataLength;
						clonedOptions.scales.x.max -= dataLength;
						if (clonedOptions.scales.x.min <= 0) {
							clonedOptions.scales.x.min = 0;
							clonedOptions.scales.x.max = dataLength - 1;
						}
						setOptions(clonedOptions);
						setBgRange({
							min: clonedOptions.scales.x.min,
							max: clonedOptions.scales.x.max,
						});
					}

					if (
						x >= right - 15 &&
						x <= right + 15 &&
						y >= height / 2 + top - 15 &&
						y <= height / 2 + top + 15
					) {
						const clonedOptions: any = structuredClone(options);
						clonedOptions.scales.x.min += dataLength;
						clonedOptions.scales.x.max += dataLength;
						if (clonedOptions.scales.x.max >= data.datasets[0].data.length) {
							clonedOptions.scales.x.min =
								data.datasets[0].data.length - (dataLength - 1);
							clonedOptions.scales.x.max = data.datasets[0].data.length;
						}
						setOptions(clonedOptions);
						setBgRange({
							min: clonedOptions.scales.x.min,
							max: clonedOptions.scales.x.max,
						});
					}
				}}
			/>
		</div>
	);
};

export default BarChart;
