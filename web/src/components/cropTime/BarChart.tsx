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
import {throttle} from 'lodash';
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

interface BarChartProps {
	[key: string]: any;
}

type ChartProps = {
	data: ChartData<'bar'>;
	height?: number;
	width?: number;
	onScroll?: any;
};

const BarChart: React.FC<ChartProps> = ({
	data,
	height = 200,
	width = 600,
	onScroll,
}) => {
	const chartRef = useRef<any>();
	const [scrollPosition, setScrollPosition] = useState(0);

	const handleScroll = throttle((event: React.UIEvent<HTMLCanvasElement>) => {
		setScrollPosition(event.currentTarget.scrollLeft);
	}, 100);

	useEffect(() => {
		if (chartRef.current && chartRef.current.chartInstance) {
			chartRef.current.chartInstance.options.plugins.annotation.annotations = [
				{
					type: 'line',
					mode: 'vertical',
					scaleID: 'x',
					value: 0,
					borderColor: 'red',
					borderWidth: 2,
					label: {
						backgroundColor: 'red',
						content: 'Focus',
						enabled: true,
					},
				},
			];
			chartRef.current.chartInstance.update();
		}
	}, []);

	useEffect(() => {
		if (chartRef.current && chartRef.current.chartInstance) {
			chartRef.current.chartInstance.options.plugins.annotation.annotations[0].value =
				scrollPosition;
			chartRef.current.chartInstance.update();
		}
	}, [scrollPosition]);

	return (
		<div className="relative my-8">
			<Bar
				ref={chartRef}
				data={data}
				height={height}
				width={width}
				options={{
					responsive: true,
					scales: {
						x: {
							ticks: {
								autoSkip: true,
								maxTicksLimit: 5,
							},
						},
						y: {
							beginAtZero: true,
						},
					},
				}}
				onScroll={handleScroll}
			/>
			<div
				className="absolute top-0 bottom-0 left-0 right-0"
				onScroll={onScroll}
			></div>
		</div>
	);
};

export default BarChart;
