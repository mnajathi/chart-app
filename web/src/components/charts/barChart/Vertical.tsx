'use client';

import DynamicContextMenu from '@/components/ContextMenu/DynamicContextMenu';
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
import {useRef, useState} from 'react';
import annotationPlugin from 'chartjs-plugin-annotation';
import {Bar, getElementAtEvent} from 'react-chartjs-2';

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
	annotationPlugin,
);

type VerticalBarChartProps = {
	xAxis: any[];
	yAxis: any[];
};

const VerticalBarChart: React.FC<VerticalBarChartProps> = ({xAxis, yAxis}) => {
	const chartRef = useRef<any>();
	const [contextMenuPos, setContextMenuPos] = useState<
		| {
				x: number;
				y: number;
		  }
		| undefined
	>(undefined);
	const options: any = {
		responsive: true,
		scales: {
			y: {
				beginAtZero: true,
			},
		},
		plugins: {
			events: ['mousemove', 'mouseout', 'click', 'touchstart', 'touchmove'],
			plugins: {
				tooltip: {
					// Tooltip will only receive click events
					events: ['mousemove'],
				},
			},
			legend: {
				position: 'bottom' as const,
			},
			annotation: {
				animations: {
					numbers: {
						properties: ['x', 'y', 'x2', 'y2', 'width', 'height', 'radius'],
						type: 'number',
					},
				},
				annotations: {
					line1: {
						adjustScaleRange: true,
						type: 'line',
						yMin: 40,
						yMax: 40,
						borderColor: 'rgba(255, 99, 132, 0.5)',
						borderWidth: 3,
						value: 1,
						label: {
							display: false,
							backgroundColor: 'black',
							drawTime: 'afterDatasetsDraw',
						},
					},
					line2: {
						adjustScaleRange: true,
						type: 'line',
						borderColor: 'rgba(0, 0, 0, 0.6)',
						borderWidth: 180,
						scaleID: 'x',
						value: 1,
						label: {
							display: false,
							backgroundColor: 'black',
							drawTime: 'afterDatasetsDraw',
						},
					},
				},
			},
		},
	};

	const data: ChartData<'bar', any[], any> = {
		labels: yAxis,
		datasets: [
			{
				label: 'Prodoscore',
				data: xAxis,
				backgroundColor: 'rgba(255, 99, 132, 0.5)',
				hoverBorderWidth: 3,
				hoverBorderColor: 'rgba(0, 0, 0, 0.5)',
			},
		],
	};

	return (
		<div className="relative">
			<Bar
				ref={chartRef}
				options={options}
				data={data}
				onContextMenu={(event: React.MouseEvent<HTMLCanvasElement>) => {
					event.preventDefault();
					const eventElement = getElementAtEvent(chartRef.current, event)[0];
					if (eventElement) {
						console.log(
							eventElement.element.x,
							eventElement.element.y,
							eventElement.index,
						);

						const rect = chartRef.current.chartArea;
						const offsetX = 0;
						const offsetY = 0;
						// show context menu
						setContextMenuPos({
							x: rect.left + eventElement.element.x + offsetX,
							y: rect.top + eventElement.element.y + offsetY,
						});
						const {datasetIndex} = eventElement;
						const {index} = eventElement;
						console.log('prodoscore', data.datasets[datasetIndex].data[index]);
					}
				}}
			/>
			<DynamicContextMenu
				items={[
					{
						title: 'Mark day as PTO',
						onClick() {
							alert('Clicked on PTO');
						},
					},
					{
						title: 'Download as SVG',
						onClick() {
							alert('Clicked on SVG');
						},
					},
					{
						title: 'Download as PNG',
						onClick() {
							alert('Clicked on PNG');
						},
					},
				]}
				contextMenuPos={contextMenuPos}
				setContextMenuPos={setContextMenuPos}
			/>
		</div>
	);
};

export default VerticalBarChart;
