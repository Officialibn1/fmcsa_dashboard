import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import DataTable from "./components/DataTable";

const theme = createTheme();

const FMSCAUsersTable = () => {
	return (
		<ThemeProvider theme={theme}>
			<DataTable />
		</ThemeProvider>
	);
};

export default FMSCAUsersTable;
