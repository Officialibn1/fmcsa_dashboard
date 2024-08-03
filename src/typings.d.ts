export interface Data {
	_id: string;
	created_dt: string;
	data_source_modified_dt: string;
	operating_status: string;
	legal_name: string;
	dba_name: string;
	physical_address: string;
	phone: string;
	usdot_number: number;
	mc_mx_ff_number: string;
	power_units: number;
	out_of_service_date: string;
}

export interface Response {
	data: Data[];
	totalCount: number;
}
