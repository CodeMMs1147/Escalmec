import React from "react";
import { Box, useTheme } from "@mui/material";
import { useGetClientsQuery } from "state/api";
import Header from "components/Header";
import { DataGrid } from "@mui/x-data-grid";

const Customers = () => {
  const theme = useTheme();
  const { data, isLoading } = useGetClientsQuery();
  console.log("data", data);

  const columns = [
    {
      field: "name",
      headerName: "Nombre",
      flex: 0.7,
    },
    {
      field: "nit",
      headerName: "NIT",
      flex: 0.5,
    },
    {
      field: "phoneNumber",
      headerName: "Numero de contacto",
      flex: 0.4,
    },
    {
      field: "email",
      headerName: "Correo",
      flex: 0.6,
    },
    {
      field: "address",
      headerName: "Dirección",
      flex: 0.5,
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="CLIENTES" subtitle="Esta la lista de clientes que han cotizado con Escalmec" />
      <Box
        mt="40px"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.primary.light,
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.secondary[200]} !important`,
          },
        }}
      >
        <DataGrid
          loading={isLoading || !data}
          getRowId={(row) => row._id}
          rows={data || []}
          columns={columns}
        />
      </Box>
    </Box>
  );
};

export default Customers;
