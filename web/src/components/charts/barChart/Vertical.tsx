import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js';
import {Bar} from 'react-chartjs-2';

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
);

type VerticalBarChartProps = {
	xAxis: any[]; // Prodoscore
	yAxis: any[]; // Employee
};

const VerticalBarChart: React.FC<VerticalBarChartProps> = ({xAxis, yAxis}) => {
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
			},
			{
				label: 'Employee',
				data: yAxis,
				backgroundColor: 'rgba(0, 0, 0, 0.5)',
			},
		],
	};

	return <Bar options={options} data={data} />;
};

export default VerticalBarChart;
