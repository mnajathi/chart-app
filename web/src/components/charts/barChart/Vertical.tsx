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
	const chartRef = useRef<any>();
	const initialOptions: any = {
		backgroundColor: 'black',
		responsive: true,
		scales: {
			y: {
				beginAtZero: true,
			},
		},
		plugins: {
			legend: {
				position: 'bottom' as const,
				align: 'start' as const,
			},
			annotation: {
				animations: false,
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

	const initialItems = [
		{
			id: 2,
			title: 'Download as SVG',
			onClick() {
				// generate the download svg image in chart js graph
				

				if (chartRef.current) {
					const link = document.createElement('a');
					link.download = 'chart.png';
					link.href = chartRef.current.toBase64Image();
					link.click();
				}
			},
		},
		{
			id: 3,
			title: 'Download as PNG',
			onClick() {
				if (chartRef.current) {
					const link = document.createElement('a');
					link.download = 'chart.png';
					link.href = chartRef.current.toBase64Image();
					link.click();
				}
			},
		},
	];

	const [items, setItems] = useState(initialItems);
	const [eventElement, setEventElement] = useState<any>(undefined);
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

	const onPtoAddHandler = (index: number, color: string) => {
		const clonedOptions: any = structuredClone(options);
		clonedOptions.plugins.annotation.annotations[index] = {
			...clonedOptions.plugins.annotation.annotations.line1,
			scaleID: 'x',
			borderColor: color,
			borderWidth: 160,
			value: index,
		};
		setOptions(clonedOptions);
	};

	const onRemovePtoHandler = (index: number) => {
		const clonedOptions: any = structuredClone(options);
		delete clonedOptions.plugins.annotation.annotations[index];
		setOptions(clonedOptions);
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
					const annotations = options.plugins.annotation.annotations;
					const existingAnnotation = Object.keys(annotations).some(
						(key) => Number(key) === eventElement?.index,
					);

					setItems(initialItems);
					if (eventElement && !existingAnnotation) {
						setItems((prevItems) => [
							{
								id: 1,
								title: 'Mark day as PTO',
								onClick: () => onPtoAddHandler(eventElement.index, ANNOTATION_COLOR_1),
							},
							...prevItems,
						]);
					} else if (eventElement && existingAnnotation) {
						setItems((prevItems) => [
							{
								id: 1,
								title: 'Remove PTO',
								onClick: () => onRemovePtoHandler(eventElement.index),
							},
							...prevItems,
						]);
					}

					const rect = chartRef.current.chartArea;
					const offsetX = 0;
					const offsetY = 0;
					setContextMenuPos({
						x: (eventElement?.element.x || event.clientX) + rect.left + offsetX,
						y: (eventElement?.element.y || event.clientY) + rect.top + offsetY,
					});
					setEventElement(eventElement);
				}}
			/>
			<DynamicContextMenu
				items={items}
				contextMenuPos={contextMenuPos}
				setContextMenuPos={setContextMenuPos}
			/>

			<Button
				text="Make PTO is Done!"
				onClick={() => {
					const annotations = options.plugins.annotation.annotations;
					const existingAnnotation = Object.keys(annotations).filter(
						(key) => key !== 'line1',
					);
					console.log(annotations);
					console.log(existingAnnotation);
					for (const aKey in annotations) {
						if (
							existingAnnotation.includes(aKey) &&
							annotations[aKey].borderColor !== ANNOTATION_COLOR_2
						) {
							onPtoAddHandler(annotations[aKey].value, ANNOTATION_COLOR_2);
						}
					}
				}}
			/>
		</>
	);
};

export default VerticalBarChart;
