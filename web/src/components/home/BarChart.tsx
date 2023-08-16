'use client';

import {useQuery} from '@tanstack/react-query';

import {list} from '@/apis/employee';
import {type Employee} from '@/shared/types/employee';
import Card from '../card';
import VerticalBarChart from '../charts/barChart/Vertical';
import useAppStore from '@/store';

type BarChartProps = Record<string, any>;

const BarChart: React.FC<BarChartProps> = () => {
	const {fromValue, toValue} = useAppStore();

	const {
		data: employeesData,
		isLoading,
		isError,
		error,
		isFetched,
	} = useQuery<Employee[]>({
		queryKey: ['employee', fromValue, toValue],
		queryFn: async () => list(fromValue, toValue),
	});

	return (
		<>
			{isLoading ? (
				<p>Loading...</p>
			) : isError && error ? (
				<p>Error occurred while fetching data.</p>
			) : (
				isFetched &&
				employeesData && (
					<Card
						className="w-full max-w-5xl mx-auto mb-4"
						title="Managers Prodoscore"
					>
						<VerticalBarChart
							xAxis={employeesData.map((e: Employee) => e.scr.l)}
							yAxis={employeesData.map((e: Employee) => e.fullname)}
						/>
					</Card>
				)
			)}
		</>
	);
};

export default BarChart;
