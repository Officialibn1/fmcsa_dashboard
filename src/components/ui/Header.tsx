import { Box, Typography } from "@mui/material";

const PageHeader = () => {
	return (
		<Box
			component={"header"}
			marginBottom={5}>
			<Typography
				variant='h4'
				component={"h4"}>
				FMCSA Truck Companies
			</Typography>

			<Typography
				variant='body1'
				fontWeight={300}
				component={"p"}>
				View and manage information about the trucking industry in the United
				States,
			</Typography>
		</Box>
	);
};

export default PageHeader;
