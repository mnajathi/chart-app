import useDateStore from '@/store';
import VerticalBarChart from '../charts/barChart/Vertical';
import {useQuery} from '@tanstack/react-query';
import {list} from '@/apis/employee';
import {type Employee} from '@/shared/types/employee';

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
					<VerticalBarChart
						title="Employees Prodoscore"
						xAxis={employeesData.map((e: Employee) => e.scr.l)}
						yAxis={employeesData.map((e: Employee) => e.fullname)}
					/>
				)
			)}
		</>
	);
};

export default BarChart;
