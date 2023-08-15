'use client';

import {Fragment} from 'react';
import {useQuery} from '@tanstack/react-query';

import {categorizedScores} from '@/apis/employee';
import {type Employee, type CategorizedScore} from '@/shared/types/employee';
import Table from '@/components/table';
import Grid from '@/components/container/Grid';

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
					<Grid>
						{Object.keys(CategorizedScoreData).map((key: string, idx: number) => (
							<Fragment key={idx}>
								{CategorizedScoreData[key] && CategorizedScoreData[key].length > 0 && (
									<Table
										key={idx}
										title={key}
										data={CategorizedScoreData[key].map((emp: Employee) => ({
											id: emp.id,
											fullname: emp.fullname,
											score: emp.scr.l,
										}))}
									/>
								)}
							</Fragment>
						))}
					</Grid>
				)
			)}
		</>
	);
};

export default CategorizedScoreTables;
