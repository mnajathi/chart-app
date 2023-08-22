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
import {Bar, getElementAtEvent} from 'react-chartjs-2';

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
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
	const options = {
		responsive: true,
		plugins: {
			legend: {
				position: 'bottom' as const,
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
			},
			{
				label: 'Employee',
				data: yAxis,
				backgroundColor: 'rgba(0, 0, 0, 0.5)',
			},
		],
		events: ['mousemove', 'mouseout', 'click', 'touchstart', 'touchmove'],
		plugins: {
			tooltip: {
				// Tooltip will only receive click events
				events: ['click'],
			},
		},
	};

	return (
		<>
			<Bar
				ref={chartRef}
				options={options}
				data={data}
				onClick={(event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
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
						const datasetIndex = eventElement.datasetIndex;
						const index = eventElement.index;
						console.log('prodoscore', data.datasets[datasetIndex].data[index]);
					}
				}}
			/>
			<DynamicContextMenu
				items={[
					{
						title: 'Mark day as PTO',
						onClick: () => {
							console.log('Clicked on PTO');
							console.log(chartRef.current);
						},
					},
					{
						title: 'Download as SVG',
						onClick: () => {
							console.log('Clicked on SVG');
							console.log(chartRef.current);
						},
					},
					{
						title: 'Download as PNG',
						onClick: () => {
							console.log('Clicked on PNG');
							console.log(chartRef.current);
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
