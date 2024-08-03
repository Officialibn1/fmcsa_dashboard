import { Button, Input } from "@mui/material";
// import { readExcelFile } from "../lib/utils";

import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";
import debounce from "debounce";
import { Close } from "@mui/icons-material";
import { Data, Response } from "../typings";
import PageHeader from "./ui/Header";

const DataTable = () => {
	const [companies, setCompanies] = useState<Data[]>([]);
	const [totalRows, setTotalRows] = useState(0);
	const [loading, setLoading] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");
	const [paginationModel, setPaginationModel] = useState({
		pageSize: 25,
		page: 1,
	});

	const coulumns: GridColDef[] = useMemo(
		() => [
			{ field: "legal_name", headerName: "Legal Name", width: 250 },
			{ field: "dba_name", headerName: "DBA Name", width: 250 },
			{ field: "physical_address", headerName: "Physical address", width: 350 },
			{ field: "phone", headerName: "Phone", width: 120 },
			{ field: "usdot_number", headerName: "DOT", width: 100 },
			{ field: "operating_status", headerName: "Operating status", width: 250 },
			{ field: "entity_type", headerName: "Entity", width: 100 },
			{ field: "mc_mx_ff_number", headerName: "MC/MX/FF", width: 150 },
			{ field: "power_units", headerName: "Power units", width: 100 },
			{
				field: "out_of_service_date",
				headerName: "Out of service date",
				width: 180,
			},
			{ field: "created_dt", headerName: "Created_DT", width: 180 },
			{
				field: "data_source_modified_dt",
				headerName: "Modifed_DT",
				width: 180,
			},
		],
		[],
	);

	const fetchDataFromServer = useCallback(
		async (setSearchTerm: string) => {
			const { page, pageSize } = paginationModel;

			setLoading(true);

			try {
				const res = axios.get(
					`https://fmcsa-server.onrender.com/api/companies?page=${page}&pageSize=${pageSize}&search=${setSearchTerm}`,
				);

				const axiosData: Response = (await res).data;

				const { data, totalCount } = axiosData;

				setCompanies(data);

				setTotalRows(totalCount);

				setLoading(false);
			} catch (error) {
				console.log(JSON.stringify(error, null, 2));

				alert("Error Fetching Data");

				setLoading(false);
			}
		},
		[paginationModel],
	);

	const debouncedFetchData = useCallback(
		debounce((term) => {
			fetchDataFromServer(term);
		}, 500),
		[fetchDataFromServer],
	);

	useEffect(() => {
		debouncedFetchData(searchTerm);
	}, [searchTerm, paginationModel]);

	// THIS FUNCTION LOADS THE EXCEL FILE LOCALLY FROM YOUR COMPUTER INTO THE REACT APPLICATION BUT IS VERY SLOW
	// TO USE THIS UN COMMENT THIS FUNCTION AND THE FILE INPUT FIELD,
	// THEN SELECT YOUR EXCEL FILE (i.e. THE ONE INTENDED TO BE USED IN THIS APP),
	// const [file, setFile] = useState<File | null>(null);
	// async function handleFileInput(e: React.ChangeEvent<HTMLInputElement>) {
	// 	if (e.target.files && e.target.files[0]) {
	// 		const file = e.target.files[0];

	// 		setFile(file);

	// 		// @ts-expect-error I know the file
	// 		const data: any[] = await readExcelFile(file);

	// 		console.log("FUNCTION COMPLETED...");

	// 		console.log(JSON.stringify(data?.slice(0, 50)));
	// 	}
	// }
	return (
		<Box
			component={"section"}
			sx={{
				display: "flex",
				flexDirection: "column",
				gap: "1rem",
			}}>
			<PageHeader />

			<Box
				sx={{
					display: "flex",
					marginLeft: "auto",
					alignItems: "center",
					gap: ".5rem",
					border: "1px solid #fff",
					borderRadius: "5px",
				}}>
				<Input
					type='text'
					sx={{
						width: 300,
						color: "#e2e8f0",
						padding: "0px 10px",
					}}
					value={searchTerm}
					onChange={(e) => {
						setSearchTerm(e.target.value);
						setPaginationModel({
							pageSize: 25,
							page: 1,
						});
					}}
					placeholder='Search by Legal Name'
				/>

				<Button onClick={() => setSearchTerm("")}>
					<Close />
				</Button>
			</Box>

			<Box
				sx={{
					height: "75vh",
				}}>
				{/* INPUT TO SELECT THE EXCEL FILE FROM YOUR LOCAL MACHINE */}
				{/* <Input
						type='file'
						name='data-file'
						id='data-file'
						onChange={(e) =>
							handleFileInput(e as React.ChangeEvent<HTMLInputElement>)
						}
					/> */}

				<DataGrid
					sx={{
						color: "#f1f5f9",
						fontSize: 14,
						fontWeight: 400,
						borderColor: "primary.light",
						"& .MuiDataGrid-columnsContainer:hover, .MuiDataGrid-cell:hover": {
							color: "#e2e8f0",
							backgroundColor: "#0f172a",
						},
						"& .MuiDataGrid-columnHeader, .MuiDataGrid-filler": {
							backgroundColor: "#0f172a",
						},
						"& .MuiButtonBase-root": {
							color: "#e2e8f0",
						},
						"& .MuiDataGrid-columnHeader, .MuiDataGrid-cell": {
							borderRight: `1px solid #64748b`,
							borderBottom: `1px solid #64748b`,
						},
						"& .MuiDataGrid-footerContainer": {
							backgroundColor: "#0f172a",
							color: "#e2e8f0",
						},
						"& .MuiTablePagination-root": {
							backgroundColor: "#0f172a",
							color: "#e2e8f0",
						},
					}}
					columns={coulumns}
					rows={companies}
					paginationMode='server'
					rowCount={totalRows}
					getRowId={(row) => row._id}
					checkboxSelection
					disableRowSelectionOnClick
					initialState={{
						pagination: {
							paginationModel: {
								pageSize: 25,
							},
						},
					}}
					pageSizeOptions={[100, 50, 25]}
					onPaginationModelChange={(model) =>
						setPaginationModel({
							page: model.page + 1,
							pageSize: model.pageSize,
						})
					}
					loading={loading}
				/>
			</Box>
		</Box>
	);
};

export default DataTable;
