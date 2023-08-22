'use client';

import DynamicContextMenu from '@/components/ContextMenu/DynamicContextMenu';
import {
	BarElement,
	CategoryScale,
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
	const [contextMenuPos, setContextMenuPos] = useState<
		| {
				x: number;
				y: number;
		  }
		| undefined
	>(undefined);
	const chartRef = useRef<any>();
	const options: any = {
		responsive: true,
		scales: {
			y: {
				beginAtZero: true,
			},
		},
		plugins: {
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
					box1: {
						type: 'box',
						xMin: 5.5,
						xMax: 4.5,
						yMin: 0,
						yMax: 86.9,
						backgroundColor: 'rgba(0, 0, 0, 0.5)',
					},
				},
			},
		},
	};

	const labels = yAxis;

	const data = {
		labels,
		datasets: [
			{
				label: 'Prodoscore',
				data: xAxis,
				backgroundColor: 'rgba(255, 99, 132, 0.5)',
				hoverBorderWidth: 3,
				hoverBorderColor: 'rgba(0, 0, 0, 0.5)',
				fill: false,
			},
		],
		events: ['mousemove', 'mouseout', 'click', 'touchstart', 'touchmove'],
		plugins: {
			tooltip: {
				// Tooltip will only receive click events
				events: ['mousemove'],
			},
		},
	};

	return (
		<>
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

						const offsetX = 200;
						const offsetY = 50;
						setContextMenuPos({
							x: eventElement.element.x + offsetX,
							y: eventElement.element.y + offsetY,
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
		</>
	);
};

export default VerticalBarChart;
