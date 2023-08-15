import {useQuery} from '@tanstack/react-query';

import {categorizedScores} from '@/apis/employee';
import {type Employee, type CategorizedScore} from '@/shared/types/employee';
import Table from '@/components/Table';

type CategorizedScoreTablesProps = Record<string, any>;

const CategorizedScoreTables: React.FC<CategorizedScoreTablesProps> = () => {
	const {
		data: CategorizedScoreData,
		isLoading,
		isError,
		error,
		isFetched,
	} = useQuery<CategorizedScore>({
		queryKey: ['CategorizedScore'],
		queryFn: async () => categorizedScores(),
	});

	return (
		<>
			{isLoading ? (
				<p>Loading...</p>
			) : isError && error ? (
				<p>Error occurred while fetching data.</p>
			) : (
				isFetched &&
				CategorizedScoreData && (
					<>
						{Object.keys(CategorizedScoreData).map((key: string, idx: number) => (
							<Table
								key={idx}
								title={key}
								data={CategorizedScoreData[key].map((emp: Employee) => ({
									id: emp.id,
									fullname: emp.fullname,
									score: emp.scr.l,
								}))}
							/>
						))}
					</>
				)
			)}
		</>
	);
};

export default CategorizedScoreTables;
