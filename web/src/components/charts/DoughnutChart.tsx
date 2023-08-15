import {Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js';
import {Doughnut} from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

type DoughnutChartProps = {
	score: number;
};

const DoughnutChart: React.FC<DoughnutChartProps> = ({score}) => {
	const data = {
		labels: ['Score', 'Un-scored'],
		datasets: [
			{
				label: '# of Score',
				data: [score, 100 - score],
				backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(255, 255, 255, 0.2)'],
				borderColor: ['rgba(255, 99, 132, 1)', 'rgba(255, 99, 132, 1)'],
				borderWidth: 1,
			},
		],
	};

	return <Doughnut data={data} />;
};

export default DoughnutChart;
