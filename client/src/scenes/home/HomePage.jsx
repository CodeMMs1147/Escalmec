import { Link } from "react-router-dom";
import SendIcon from '@mui/icons-material/Send';
import { Button, Container, Grid, TextField, Select, MenuItem, useTheme, FormControl, Table, TableHead, TableBody, TableRow, TableCell, TableFooter, TableContainer, Paper } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { productOption, vendorOption, fixService } from 'constants/general';
import { styled } from '@mui/system';
import TransactionPDF from 'components/TransactionPDF';
import { PDFViewer } from '@react-pdf/renderer';

function HomePage() {

  const [facturaData, setFacturaData] = useState(null);
  const userId = useSelector((state) => state.global.userId);
  const theme = useTheme();
  const [name, setName] = useState('');
  const [nit, setNit] = useState('');
  const [phoneNumber, setPhoneNumer] = useState('');
  const [billNumber, setBillNumber] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [products, setProducts] = useState([]);
  const [totalValue, setTotalValue] = useState(0);
  const [iva, setIva] = useState(0);
  const [totalIva, setTotalIva] = useState(0);
  const [estado, setEstado] = useState('');
  const [datosEnviados, setDatosEnviados] = useState(false);

  // PDF
  const [verPdf, setVerPdf] = useState(false);



  const StyledH1 = styled('h1')({
    textAlign: 'center',
    marginLeft: '10%',
    marginRight: '10%',
    color: '#7DF9FF'
  });
  const StyledP = styled('p')({
    marginLeft: '10%',
    marginRight: '10%',
    width: '80%',
    margin: '0 auto',
    textAlign: 'center',
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
    const ivaTotalValue = newTotalValue * 0.19;
    const finalValue = newTotalValue + ivaTotalValue;
    setProducts(updatedProducts);
    setTotalValue(newTotalValue);
    setIva(ivaTotalValue);
    setTotalIva(finalValue);
  };

  const handleAddProduct = () => {
    const newProduct = { id: Date.now() ,description: '', units: 1, unitValue: 0 , docePaTrece: 0, totalValue: 0};
    setProducts([...products, newProduct]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const facturaData = {
      name,
      nit,
      phoneNumber,
      email,
      billNumber,
      address,
      products: products.map((product) => ({
        ...product,
        unitValue: product.unitValue
      })),
      totalValue,
      estado,
    };

    // const clientData = {
    //   userId,
    //   clientName,
    //   commerceName,
    //   city,
    //   cellphoneNumber,
    //   customerAdress,
    // };

    try {
      await axios.post(`${process.env.REACT_APP_BASE_URL}/sales/sales`, facturaData);
      // await axios.post(`${process.env.REACT_APP_BASE_URL}/auth/register`, clientData);
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

  return (
  <section className="bg-red-500 flex justify-center items-center">
    <header className="bg-zinc-800 p-10">
      <Container maxWidth="md" sx={{ border: 1, borderRadius: 5, padding: 3, borderColor: '#7DF9FF' }}>
        <form onSubmit={handleSubmit}>
          <Grid
            alignItems="center"
            justifyContent="center"
            container spacing={2}
          >
            <Grid item xs={7}>
              <TextField 
              label="Nombre del cliente" 
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
              InputLabelProps={{ shrink: true, borderRadius: 4 }}
              variant="outlined"
              inputProps={{ style: { color: '#ffe3a3' } }}
              sx={{ width: '100%', backgroundColor: '#141414', borderRadius: 1, borderColor: '#ffe3a3' }}
              />
            </Grid>
            <Grid item xs={5}>
              <TextField 
              label="NIT" 
              fullWidth
              value={nit}
              onChange={(e) => setNit(e.target.value)}
              InputLabelProps={{ shrink: true, borderRadius: 4 }}
              variant="outlined"
              inputProps={{ style: { color: '#ffe3a3' }, type: 'Number' }}
              sx={{ width: '100%', backgroundColor: '#141414', borderRadius: 1, borderColor: '#ffe3a3' }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Telefono de contacto"
                value={phoneNumber}
                onChange={(e) => setPhoneNumer(e.target.value)}
                InputLabelProps={{ shrink: true }}
                variant="outlined"
                inputProps={{ style: { color: '#ffe3a3' } }}
                sx={{ width: '100%', backgroundColor: '#141414', borderRadius: 1 }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Correo electronico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                InputLabelProps={{ shrink: true }}
                inputProps={{ style: { color: '#ffe3a3' } }}
                variant="outlined"
                sx={{ width: '100%', backgroundColor: '#141414', borderRadius: 1 }}
              />
            </Grid>
            <Grid item xs={10}>
              <TextField
                label="Direccion"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                InputLabelProps={{ shrink: true }}
                variant="outlined"
                inputProps={{ style: { color: '#ffe3a3' } }}
                sx={{ width: '100%', backgroundColor: '#141414', borderRadius: 1 }}
              />
            </Grid>
            {products.map((product, index) => (
              <Grid
                key={index} 
                item xs={12}
                alignItems="center"
                justifyContent="center"
                container spacing={2}
              >
                <FormControl
                variant="filled"
                sx={{ m: 1, minWidth: 250, marginTop: 2.6 }}
                >
                  <InputLabel htmlFor="grouped-native-select">Producto/s</InputLabel>
                  <Select
                    native 
                    defaultValue=""
                    label="Productos"
                    id="grouped-native-select"
                    value={product.description}
                    onChange={(e) => handleProductChange(product.id, 'description', e.target.value)}
                  >
                  <option aria-label="None" value="" />
                  <optgroup label="Alquiler">
                    {productOption.map((item) => (
                      <option key={item.value} value={item.name}>
                        {item.name}
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="Reparacion">
                    {fixService.map((item) => (
                      <option key={item.value} value={item.name}>
                        {item.name}
                      </option>
                    ))}
                  </optgroup>
                  </Select>
                </FormControl>
                <br />
                <Grid item xs={3}>
                  <TextField 
                  label="Cantidad" 
                  value={product.units}
                  onChange={(e) => handleProductChange(product.id ,'units', e.target.value)}
                  InputLabelProps={{ shrink: true }}
                  inputProps={{ style: { color: '#ffe3a3' }, type: 'Number', min: 0 }}
                  variant="outlined" 
                  sx={{ width: '100%', backgroundColor: '#141414', borderRadius: 1, color: '#997d3d' }}
                  />
                </Grid>
              </Grid>
            ))}
            <Button color="secondary" type="button" onClick={handleAddProduct} sx={{ marginTop: '15px' }}>
              Añadir un producto
            </Button>
          </Grid>
          <br />
          <Grid 
            item xs={12}
            alignItems="center"
            justifyContent="center"
            container spacing={2}
            sx={{ marginTop: '5px'}}
          >
          <Button type="submit" variant="contained" endIcon={<SendIcon />}>
            Confirmar compra
          </Button>
          </Grid>
        </form>
      </Container>

      <nav>
        <StyledH1>Así va tu cotizacion</StyledH1>
        <TableContainer component={Paper} sx={{ margin: 'auto', width: '90%', marginTop: '20px' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Producto</TableCell>
                <TableCell align="right">Cantidad</TableCell>
                <TableCell align="right">Valor Unitario</TableCell>
                <TableCell align="right">Impuesto</TableCell>
                <TableCell align="right">Subtotal</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product, index) => (
                <TableRow key={index}>
                  <TableCell>{product.description}</TableCell>
                  <TableCell align="right">{product.units}</TableCell>
                  <TableCell align="right">${product.unitValue}</TableCell>
                  <TableCell align="right">19%</TableCell>
                  <TableCell align="right">${product.totalValue}</TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell colSpan={4} align="right">
                  Subtotal
                </TableCell>
                <TableCell align="right">${totalValue}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={4} align="right">
                  IVA
                </TableCell>
                <TableCell align="right">${iva}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={4} align="right">
                  Total
                </TableCell>
                <TableCell align="right">${totalIva}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </nav>
    </header>
  </section>
  );
}

export default HomePage;