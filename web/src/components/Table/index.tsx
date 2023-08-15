import {type FiEmployee} from '@/shared/types/employee';

type TableProps = {
	title: string;
	data: FiEmployee[];
};

const Table: React.FC<TableProps> = ({title, data}) => (
	<div>
		<h5>{title}</h5>
		<table>
			<thead>
				<tr>
					{Object.keys(data[0]).map((key) => (
						<th key={key}>{key}</th>
					))}
				</tr>
			</thead>
			<tbody>
				{data.map((row, index) => (
					<tr key={index}>
						{Object.values(row).map((value, index) => (
							<td key={index}>{value}</td>
						))}
					</tr>
				))}
			</tbody>
		</table>
	</div>
);

export default Table;
