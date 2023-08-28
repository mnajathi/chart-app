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
import {useRef, useEffect} from 'react';
import {Line} from 'react-chartjs-2';
import annotationPlugin from 'chartjs-plugin-annotation';

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
	data: ChartData<'line'>;
	height?: number;
	width?: number;
	onScroll?: any;
};

const LineChart: React.FC<ChartProps> = ({
	data,
	height = 400,
	width = 600,
	onScroll,
}) => {
	const chartRef = useRef<any>();

	useEffect(() => {
		if (chartRef.current && chartRef.current.chartInstance) {
			chartRef.current.chartInstance.options.plugins.annotation.annotations = [
				{
					type: 'line',
					mode: 'horizontal',
					scaleID: 'y',
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

	return (
		<div className="w-full h-auto min-h-60">
			<Line
				ref={chartRef}
				data={data}
				height={height}
				width={width}
				options={{
					responsive: true,
					plugins: {
						legend: {
							position: 'top' as const,
						},
						title: {
							display: true,
							text: 'Performance throughout the day (Los Angeles)',
						},
					},
					scales: {
						x: {
							ticks: {
								autoSkip: true,
								maxTicksLimit: 2,
							},
						},
						y: {
							beginAtZero: true,
						},
					},
				}}
			/>
			<div
				className="absolute top-0 bottom-0 left-0 right-0"
				onScroll={onScroll}
			></div>
		</div>
	);
};

export default LineChart;
