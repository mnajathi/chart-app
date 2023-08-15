export type Employee = {
	activate_workshift: number;
	department_id: number;
	domain_id: number;
	email: string;
	emp_holidays: Record<string, any>; // This might need a more specific type
	fullname: string;
	id: number;
	is_app_user: number;
	manager: number;
	own_details_visibility: number;
	picture: string;
	role: number;
	scr: {
		l: number;
	};
	status: number;
	strata: number;
	timezone: string;
	join_date?: any;
	manager_details: {
		fullname: string;
		email: string;
		id: number;
		status: number;
	};
};

export type FiEmployee = {
	id?: number;
	fullname: string;
	score: number;
};

export type CategorizedScore = Record<any, Employee[]>;
