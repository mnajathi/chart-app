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
	registerables,
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
	...registerables,
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
		animations: false,
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
				data: [...xAxis, 5],
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
				if (chartRef.current) {
					const svgString = chartRef.current.toBase64Image('image/svg+xml', 1);
					const blob = new Blob([svgString], {type: 'image/svg+xml'});
					const link = document.createElement('a');
					link.download = 'chart.svg';
					link.href = URL.createObjectURL(blob);
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
					link.download = 'Employee Prodoscore.png';
					link.href = chartRef.current.toBase64Image('image/png', 1);
					link.click();
				}
			},
		},
	];

	const [items, setItems] = useState(initialItems);
	const [options, setOptions] = useState(initialOptions);
	const [data, setData] = useState<any>(initialData);
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
					const isPto = Object.keys(annotations).some(
						(key) =>
							Number(key) === eventElement?.index &&
							annotations[key].borderColor === ANNOTATION_COLOR_2,
					);

					setItems(initialItems);
					if (eventElement) {
						if (!existingAnnotation && !isPto) {
							setItems((prevItems) => [
								{
									id: 1,
									title: 'Mark day as PTO',
									onClick: () => onPtoAddHandler(eventElement.index, ANNOTATION_COLOR_1),
								},
								...prevItems,
							]);
						} else if (existingAnnotation && !isPto) {
							setItems((prevItems) => [
								{
									id: 1,
									title: 'Remove PTO',
									onClick: () => onRemovePtoHandler(eventElement.index),
								},
								...prevItems,
							]);
						}
					} else {
						const bars = chartRef.current.getElementsAtEventForMode(
							event,
							'nearest',
							{intersect: false},
							true,
						);
						const index = bars[0].index;
						if (index) {
							setItems((prevItems) => [
								{
									id: 1,
									title: 'Remove PTO',
									onClick: () => onRemovePtoHandler(index),
								},
								...prevItems,
							]);
						}
					}

					setContextMenuPos({
						x: event.clientX,
						y: event.clientY,
					});
				}}
			/>
			<DynamicContextMenu
				items={items}
				contextMenuPos={contextMenuPos}
				setContextMenuPos={setContextMenuPos}
			/>

			<Button
				text="Accept the PTO!"
				onClick={() => {
					const annotations = options.plugins.annotation.annotations;
					const existingAnnotation = Object.keys(annotations).filter(
						(key) => key !== 'line1',
					);
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

			<div className="my-4" />

			<Button
				className="mr-4"
				text="Add Node"
				onClick={() => {
					const clonedData: any = structuredClone(data);
					clonedData.datasets[0].data.push(Number(Math.random() * 100));
					clonedData.labels.push(Math.random().toString(36).substring(7));
					setData(clonedData);
				}}
			/>

			<Button
				className="mr-4"
				text="Remove Node"
				onClick={() => {
					const clonedData: any = structuredClone(data);
					clonedData.datasets[0].data.splice(-1);
					clonedData.labels.splice(-1);
					setData(clonedData);
				}}
			/>
		</>
	);
};

export default VerticalBarChart;
