'use client';

import useAppStore from '@/store';
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
import annotationPlugin from 'chartjs-plugin-annotation';
import React, {useEffect, useState} from 'react';
import {Bar, getElementsAtEvent} from 'react-chartjs-2';

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
	chartRef: any;
	initialData: ChartData<'bar'>;
	dataLength: number;
	hoverMarkerRef: any;
	lineChartRef: any;
};

const BarChart: React.FC<ChartProps> = ({
	chartRef,
	initialData,
	dataLength,
	hoverMarkerRef,
	lineChartRef,
}) => {
	const {bgRange, setBgRange} = useAppStore();
	const initialOptions: any = {
		layout: {
			padding: {
				right: 18,
				bottom: 30,
			},
		},
		responsive: true,
		scales: {
			x: {
				min: bgRange.min,
				max: bgRange.max,
			},
			y: {
				beginAtZero: true,
			},
		},
		maintainAspectRatio: false,
		plugins: {
			crosshair: {
				sync: {
					enabled: true,
				},
			},
		},
	};

	const [data] = useState(initialData);
	const [options, setOptions] = useState(initialOptions);

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

	const scrollWheelHandler = (
		wheel: React.WheelEvent<HTMLCanvasElement>,
		chart: any,
	) => {
		// scroll up
		if (wheel.deltaY < 0) {
			const clonedOptions: any = structuredClone(options);
			clonedOptions.scales.x.min -= dataLength;
			clonedOptions.scales.x.max -= dataLength;
			if (clonedOptions.scales.x.min <= 0) {
				clonedOptions.scales.x.min = 0;
				clonedOptions.scales.x.max = dataLength - 1;
			}
			setBgRange({
				min: clonedOptions.scales.x.min,
				max: clonedOptions.scales.x.max,
			});
		}

		// scroll down
		if (wheel.deltaY > 0) {
			const clonedOptions: any = structuredClone(options);
			clonedOptions.scales.x.min += dataLength;
			clonedOptions.scales.x.max += dataLength;
			if (clonedOptions.scales.x.max >= data.datasets[0].data.length) {
				clonedOptions.scales.x.min =
					data.datasets[0].data.length - (dataLength - 1);
				clonedOptions.scales.x.max = data.datasets[0].data.length;
			}
			setBgRange({
				min: clonedOptions.scales.x.min,
				max: clonedOptions.scales.x.max,
			});
		}
	};

	const scrollBarHandler = (width: number, x: number, left: number) => {
		const clonedOptions: any = structuredClone(options);
		const barWidth =
			((width - 30) / data.datasets[0].data.length) * (dataLength + 1);
		const totalWidth = x + barWidth;
		if (totalWidth > width) {
			clonedOptions.scales.x.min = data.datasets[0].data.length - (dataLength - 1);
			clonedOptions.scales.x.max = data.datasets[0].data.length;
		} else {
			clonedOptions.scales.x.min =
				((x - left - 15) / (width - 30)) * data.datasets[0].data.length;
			clonedOptions.scales.x.max = clonedOptions.scales.x.min + dataLength - 1;
		}
		setBgRange({
			min: clonedOptions.scales.x.min,
			max: clonedOptions.scales.x.max,
		});
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

								// data should be show on dragging the scrollbar
								if (y >= bottom + 30 && y <= bottom + 45) {
									canvas.style.cursor = 'pointer';
								}
							});
						},
						afterDraw: (chart: any, args: any, pluginOptions: any) => {
							const {
								ctx,
								chartArea: {top, bottom, left, right, width, height},
							} = chart;
							drawHandler(ctx, left, 8, height, top); // left arrow
							drawHandler(ctx, right, -8, height, top); // right arrow

							// scrollbar
							ctx.beginPath();
							ctx.fillStyle = 'lightgrey';
							ctx.rect(left + 15, bottom + 30, width - 30, 15);
							ctx.fill();
							ctx.closePath();

							// scrollbar thumb
							ctx.beginPath();
							ctx.fillStyle = 'black';
							ctx.rect(left, bottom + 30, 15, 15);
							ctx.rect(right - 15, bottom + 30, 15, 15);
							ctx.fill();
							ctx.closePath();

							// movable scrollbar thumb
							let startingPoint =
								left +
								15 +
								((width - 30) / data.datasets[0].data.length) *
									chartRef.current.scales.x.min;
							const barWidth =
								((width - 30) / data.datasets[0].data.length) * (dataLength + 1);
							const totalWidth = startingPoint + barWidth;
							if (totalWidth > width) {
								startingPoint = right - 15 - barWidth;
							}

							ctx.beginPath();
							ctx.fillStyle = 'grey';
							ctx.rect(startingPoint, bottom + 30, barWidth, 15);
							ctx.fill();
							ctx.closePath();
						},
					},
					{
						id: 'hoverMarkerBackground',
						afterDatasetsDraw: (chart: any, args: any, plugins: any) => {
							const {
								ctx,
								chartArea: {top, bottom, _, right},
							} = lineChartRef.current;
							if (hoverMarkerRef.current === undefined) return;

							// hover marker should be shown only bgRange of lineChartRef
							if (
								hoverMarkerRef.current < lineChartRef.current.scales.x.min ||
								hoverMarkerRef.current > lineChartRef.current.scales.x.max
							)
								return;

							ctx.save();
							ctx.beginPath();
							ctx.strokeStyle = 'rgba(0, 0, 0, 1)';
							ctx.fillStyle = 'rgba(0, 0, 0, .1)';
							ctx.lineWidth = 2;
							ctx.moveTo(hoverMarkerRef.current, top);
							ctx.lineTo(hoverMarkerRef.current, bottom);
							ctx.stroke();
							ctx.lineTo(right, bottom);
							ctx.lineTo(right, top);
							ctx.closePath();
							ctx.restore();
						},
						afterEvent: (chart: any, args: any, pluginOptions: any) => {
							const xCoor = args.event.x;
							if (args.inChartArea) {
								hoverMarkerRef.current = xCoor;
							} else {
								hoverMarkerRef.current = undefined;
							}
							args.changed = true;
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
						setBgRange({
							min: clonedOptions.scales.x.min,
							max: clonedOptions.scales.x.max,
						});
					}

					// data should be show on dragging the scrollbar
					if (y >= bottom + 30 && y <= bottom + 45) {
						scrollBarHandler(width, x, left);
					}
				}}
				onWheel={(event: React.WheelEvent<HTMLCanvasElement>) => {
					scrollWheelHandler(event, chartRef.current);
				}}
				onMouseDown={(event: React.MouseEvent<HTMLCanvasElement>) => {
					const {
						ctx,
						canvas,
						chartArea: {top, bottom, left, right, width, height},
					} = chartRef.current;
					const rect = canvas.getBoundingClientRect();
					const x = event.clientX - rect.left;
					const y = event.clientY - rect.top;

					if (y >= bottom + 30 && y <= bottom + 45) {
						scrollBarHandler(width, x, left);
					}
				}}
				onMouseUp={(event: React.MouseEvent<HTMLCanvasElement>) => {
					const {
						ctx,
						canvas,
						chartArea: {top, bottom, left, right, width, height},
					} = chartRef.current;
					const rect = canvas.getBoundingClientRect();
					const x = event.clientX - rect.left;
					const y = event.clientY - rect.top;

					if (y >= bottom + 30 && y <= bottom + 45) {
						scrollBarHandler(width, x, left);
					}
				}}
				// this tooltip update function is not working...
				onMouseMove={(event: React.MouseEvent<HTMLCanvasElement>) => {
					if (!lineChartRef.current) return;
					const points = getElementsAtEvent(lineChartRef.current, event);
					if (points[0]) {
						const dataset = points[0].datasetIndex;
						const index = points[0].index;

						chartRef.current.tooltip.setActiveElements([
							{
								datasetIndex: dataset,
								index: index,
							},
						]);
						chartRef.current.setActiveElements([
							{
								datasetIndex: dataset,
								index: index,
							},
						]);
						chartRef.current.update();
					} else {
						chartRef.current.tooltip.setActiveElements([], {x: 0, y: 0});
						chartRef.current.setActiveElements([], {x: 0, y: 0});
						chartRef.current.update();
					}
				}}
			/>
		</div>
	);
};

export default BarChart;
