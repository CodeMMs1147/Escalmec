import SendIcon from '@mui/icons-material/Send';
import { Box, Button, Container, Grid, TextField, Select, MenuItem, InputLabel, useTheme, FormControl } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import DataGridCustomToolbar from "components/DataGridCustomToolbar";
import Header from "components/Header";
import React, { useEffect, useState } from "react";
import { useGetFacturasQuery } from "state/api";
import { useSelector } from 'react-redux';
import { productOption } from 'constants/general';
import TransactionPDF from 'components/TransactionPDF';
import { PDFViewer } from '@react-pdf/renderer';

const Transactions = () => {

  const [facturaData, setFacturaData] = useState(null);
  const userId = useSelector((state) => state.global.userId);
  const theme = useTheme();
  const [clientName, setClientName] = useState('');
  const [route, setRoute] = useState('');
  const [commerceName, setCommerceName] = useState('');
  const [city, setCity] = useState('');
  const [billNumber, setBillNumber] = useState('');
  const [cellphoneNumber, setCellphoneNumber] = useState('');
  const [vendorName, setVendorName] = useState('');
  const [customerAdress, setCustomerAdress] = useState('');
  const [products, setProducts] = useState([]);
  const [totalValue, setTotalValue] = useState(0);
  const [estado, setEstado] = useState('');
  const [datosEnviados, setDatosEnviados] = useState(false);

  // PDF
  const [verPdf, setVerPdf] = useState(false);
  
  // DATA GRID
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [sort, setSort] = useState({});
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const { data, isLoading } = useGetFacturasQuery({
    page,
    pageSize,
    sort: JSON.stringify(sort),
    search,
  });

  const handleProductChange = (productId, field, value) => {
    const updatedProducts = products.map((product) => {
      if (product.id === productId) {
      const selectedProduct = productOption.find((item) => item && item.value === product.description);

      const updatedProduct = {
        ...product,
        [field]: value,
      };

      if (selectedProduct) {
          console.log(selectedProduct.price);
          updatedProduct.unitValue = selectedProduct.price;
          updatedProduct.totalValue = selectedProduct.price * updatedProduct.units;
        } else if (field === 'units') {
          updatedProduct.totalValue = selectedProduct.price * value;
        }
        return updatedProduct;
      }

      return product;
    });
  
    const newTotalValue = updatedProducts.reduce((total, product) => total + product.totalValue, 0);
    setProducts(updatedProducts);
    setTotalValue(newTotalValue);
  };

  const handleAddProduct = () => {
    const newProduct = { id: Date.now() ,description: '', units: 1, unitValue: 0 , totalValue: 0};
    setProducts([...products, newProduct]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const facturaData = {
      userId,
      clientName,
      route,
      commerceName,
      city,
      billNumber,
      cellphoneNumber,
      vendorName,
      customerAdress,
      products: products.map((product) => ({
        ...product,
        unitValue: product.unitValue
      })),
      totalValue,
      estado,
    };

    try {
      await axios.post(`${process.env.REACT_APP_BASE_URL}/sales/sales`, facturaData);
      setFacturaData(facturaData);
      setDatosEnviados(true);
      // Realiza alguna acción después de guardar exitosamente los datos
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    handleSubmit();
  }, [products]);

  const columns = [
    {
      field: "clientName",
      headerName: "Cliente",
      flex: 1,
    },
    // {
    //   field: "products.description",
    //   headerName: "# de Productos",
    //   flex: 0.5,
    //   sortable: false,
    //   renderCell: (params) => params.value.length,
    // },
    // {
    //   field: "totalValue",
    //   headerName: "Total",
    //   flex: 1,
    // },
    {
      field: "city",
      headerName: "Ciudad",
      flex: 0.5,
    },
    {
      field: "billNumber",
      headerName: "# Factura",
      flex: 0.5,
    },
    {
      field: "cellphoneNumber",
      headerName: "Celular",
      flex: 1,
    },
    {
      field: "vendorName",
      headerName: "Vendedor",
      flex: 1,
      // sortable: false,
      // renderCell: (params) => params.value.length, PONE EL LENGTH
    },
    {
      field: "customerAdress",
      headerName: "Direccion",
      flex: 1,
      // renderCell: (params) => `$${Number(params.value).toFixed(2)}`,
    },
    {
      field: "products",
      headerName: "# of Products",
      flex: 0.5,
      sortable: false,
      renderCell: (params) => params.value.length,
    },
    {
      field: "totalValue",
      headerName: "Cost",
      flex: 1,
      renderCell: (params) => `$${Number(params.value).toFixed(2)}`,
    },
    {
      field: "estado",
      headerName: "estado",
      flex: 1,
    },
  ];

  return (
    <>
      <Box m="1.5rem 2.5rem">
        <Header title="LISTA DE FACTURAS" subtitle="Estas facturas fueron generadas y algunas fueron pagadas y otras no" />
        <Box
          height="120vh"
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
            rows={(data && data.transactions) || []}
            columns={columns}
            rowCount={(data && data.total) || 0}
            rowsPerPageOptions={[20, 50, 100]}
            pagination
            page={page}
            pageSize={pageSize}
            paginationMode="server"
            sortingMode="server"
            onPageChange={(newPage) => setPage(newPage)}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            onSortModelChange={(newSortModel) => setSort(...newSortModel)}
            components={{ Toolbar: DataGridCustomToolbar }}
            componentsProps={{
              toolbar: { searchInput, setSearchInput, setSearch },
            }}
          />
        </Box>
      </Box>
    </>
  );
};

export default Transactions;
