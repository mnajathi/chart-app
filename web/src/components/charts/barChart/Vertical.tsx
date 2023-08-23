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
import {useRef, useState} from 'react';
import annotationPlugin from 'chartjs-plugin-annotation';
import {Bar, getElementAtEvent} from 'react-chartjs-2';

import Button from '@/components/fields/Button';
import DynamicContextMenu from '@/components/ContextMenu/DynamicContextMenu';

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
	xAxis: number[];
	yAxis: string[];
};

const ANNOTATION_COLOR_1 = 'rgba(0, 0, 0, 0.6)';
const ANNOTATION_COLOR_2 = 'darkGray';

const VerticalBarChart: React.FC<VerticalBarChartProps> = ({xAxis, yAxis}) => {
	const initialOptions: any = {
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
						borderColor: ANNOTATION_COLOR_1,
						borderWidth: 160,
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

	const initialData: ChartData<'bar', number[], string> = {
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

	const chartRef = useRef<any>();
	const [options, setOptions] = useState(initialOptions);
	const [data] = useState<any>(initialData);
	const [contextMenuPos, setContextMenuPos] = useState<
		| {
				x: number;
				y: number;
				index?: number;
				dataIndex?: number;
		  }
		| undefined
	>(undefined);
	const [eventElement, setEventElement] = useState<any>(undefined);

	const onPtoAddedBeforeHandler = (index: number) => {
		const clonedOptions: any = structuredClone(options);
		clonedOptions.plugins.annotation.annotations.line2.borderColor =
			ANNOTATION_COLOR_1; // keep default annotation color
		clonedOptions.plugins.annotation.annotations.line2.value = index;
		setOptions(clonedOptions);
	};

	const onPtoAddedAfterHandler = () => {
		const clonedOptions: any = structuredClone(options);
		clonedOptions.plugins.annotation.annotations.line2.borderColor =
			ANNOTATION_COLOR_2;
		setOptions(clonedOptions);
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
						const {datasetIndex, index} = eventElement;
						console.log('prodoscore', data.datasets[datasetIndex].data[index]);
						setEventElement(eventElement);
					}
				}}
			/>
			<DynamicContextMenu
				items={[
					{
						title: 'Mark day as PTO',
						onClick: () => {
							if (eventElement) {
								const {index} = eventElement;
								onPtoAddedBeforeHandler(index); //update the options
							}
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

			<Button
				text="Make PTO is Done!"
				onClick={() => {
					onPtoAddedAfterHandler();
				}}
			/>
		</div>
	);
};

export default VerticalBarChart;
