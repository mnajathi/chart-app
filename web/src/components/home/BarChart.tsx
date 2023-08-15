import {useQuery} from '@tanstack/react-query';

import useDateStore from '@/store';
import VerticalBarChart from '../charts/barChart/Vertical';
import {list} from '@/apis/employee';
import {type Employee} from '@/shared/types/employee';
import Card from '../card';

type BarChartProps = Record<string, any>;

const BarChart: React.FC<BarChartProps> = () => {
	const {fromValue, toValue} = useDateStore();

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
					<Card className="w-full mb-4" title="Managers Prodoscore">
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
