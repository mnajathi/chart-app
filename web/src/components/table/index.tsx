import {type FiEmployee} from '@/shared/types/employee';
import Card from '../card';

type TableProps = {
	title: string;
	data: FiEmployee[];
};

const Table: React.FC<TableProps> = ({title, data}) => {
	function pascalToCapitalWithSpace(inputString: string) {
		const convertedText = inputString
			.replace(/([a-z])([A-Z])/g, '$1 $2')
			.replace(/([A-Z])([A-Z][a-z])/g, '$1 $2');
		return convertedText[0].toUpperCase() + convertedText.slice(1);
	}

	const getColorClass = (score: number) => {
		if (score > 75) {
			return 'text-blue-500';
		}

		if (score >= 40) {
			return 'text-black';
		}

		return 'text-red-500';
	};

	return (
		<Card
			className="bg-white shadow-lg rounded-lg p-4"
			title={pascalToCapitalWithSpace(title)}
		>
			{data && data?.length > 0 && (
				<>
					<table className="table-auto w-full">
						<thead>
							<tr>
								{Object.keys(data[0]).map((key: string, idx: number) => (
									<th
										key={key}
										className={`px-4 py-2 ${idx === 0 ? 'text-left' : 'text-right'}`}
									>
										{pascalToCapitalWithSpace(key)}
									</th>
								))}
							</tr>
						</thead>
						<tbody>
							{data.map((row, index) => (
								<tr key={index}>
									{Object.values(row).map((value, idx) => (
										<td
											key={idx}
											className={`border px-4 py-2 ${
												idx === 1 && 'text-right ' + getColorClass(Number(value))
											}`}
										>
											{value}
										</td>
									))}
								</tr>
							))}
						</tbody>
					</table>
				</>
			)}
		</Card>
	);
};

export default Table;
