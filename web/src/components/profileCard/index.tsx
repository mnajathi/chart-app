import {type Employee} from '@/shared/types/employee';
import DoughnutChart from '../charts/DoughnutChart';
import Box from '../container/Box';

type ProfileCardProps = {
	empData: Employee;
};

const ProfileCard: React.FC<ProfileCardProps> = ({empData}) => {
	const getInitials = (name: string) => {
		const names = name.split(' ');
		return names.map((n: string) => n[0]).join('');
	};

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
		<Box>
			<div className="bg-white py-8 rounded shadow w-full flex">
				<div className="flex flex-row justify-between w-full">
					<div>
						<div className="flex items-center justify-center mx-auto w-20 h-20 rounded-full bg-blue-500 text-white text-2xl mb-4">
							{getInitials(empData?.fullname)}
						</div>
						<div className="text-center pl-4">
							<h1 className="text-xl font-semibold mb-2">{empData?.fullname}</h1>
							<p className="text-gray-500">{empData?.email}</p>
						</div>
					</div>
					<div className="my-4">
						<p className="text-gray-600">Email: {empData?.email}</p>
						<p className="text-gray-600">Status: {empData?.status}</p>
						<p className="text-gray-600">
							Active Work Shift: {empData?.activate_workshift}
						</p>

						{empData?.manager_details && (
							<>
								<p className="text-gray-900 mt-2 font-semibold">Manager Details:</p>
								<p className="text-gray-600">
									- Role: {empData?.manager_details?.fullname}
								</p>
								<p className="text-gray-600">
									- Email: {empData?.manager_details?.email}
								</p>
							</>
						)}
					</div>
					<div>
						<p className="text-md font-semibold mb-2">
							Prodoscore:{' '}
							<span className={getColorClass(empData.scr.l)}>{empData.scr.l}</span>
						</p>
						<DoughnutChart score={empData.scr.l} />
					</div>
				</div>
			</div>
		</Box>
	);
};

export default ProfileCard;
