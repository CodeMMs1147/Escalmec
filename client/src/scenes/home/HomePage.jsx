import { Link } from "react-router-dom";
import SendIcon from '@mui/icons-material/Send';
import { Button, Container, Grid, TextField, Select, MenuItem, useTheme, FormControl } from "@mui/material";
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
  const [estado, setEstado] = useState('');
  const [datosEnviados, setDatosEnviados] = useState(false);

  // PDF
  const [verPdf, setVerPdf] = useState(false);



  const StyledH1 = styled('h1')({
    textAlign: 'center',
    marginLeft: '10%',
    marginRight: '10%',
    color: '#ffd166'
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
    setProducts(updatedProducts);
    setTotalValue(newTotalValue);
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
      <StyledP>
        <span>NOTA:</span> no recargues ni actualices la pagína cuando esta registrando o creando una venta/factura.
      </StyledP>
      <br />
      <Container maxWidth="md" sx={{ border: 1, borderRadius: 5, padding: 3, }}>
        <form onSubmit={handleSubmit}>
          <Grid
            alignItems="center"
            justifyContent="center"
            container spacing={2}
          >
            <Grid item xs={12}>
              <TextField 
              label="Nombre del cliente" 
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
              InputLabelProps={{ shrink: true, borderRadius: 4 }}
              variant="outlined"
              inputProps={{ style: { color: '#ffe3a3' } }}
              sx={{ width: '100%', backgroundColor: '#141937', borderRadius: 1, borderColor: '#ffe3a3' }}
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
                sx={{ width: '100%', backgroundColor: '#141937', borderRadius: 1 }}
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
                sx={{ width: '100%', backgroundColor: '#141937', borderRadius: 1 }}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="Direccion"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                InputLabelProps={{ shrink: true }}
                variant="outlined"
                inputProps={{ style: { color: '#ffe3a3' } }}
                sx={{ width: '100%', backgroundColor: '#141937', borderRadius: 1 }}
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
                  <Grid item xs={6}>
                    <TextField 
                    label="Unidades" 
                    value={product.units}
                    onChange={(e) => handleProductChange(product.id ,'units', e.target.value)}
                    InputLabelProps={{ shrink: true }}
                    inputProps={{ style: { color: '#ffe3a3' }, type: 'Number', min: 1 }}
                    variant="outlined" 
                    sx={{ width: '100%', backgroundColor: '#141937', borderRadius: 1, color: '#997d3d' }}
                    />
                  </Grid>
                  <div>
                  Valor total: {product.totalValue}
                  </div>
                </Grid>
              ))}
            <Button color="secondary" type="button" onClick={handleAddProduct} sx={{ marginTop: '15px' }}>Añadir un producto</Button>
            <br />
            <Grid item xs={4}>
              <TextField 
                label="Estado de pago" 
                value={estado}
                onChange={(e) => setEstado(e.target.value)}
                InputLabelProps={{ shrink: true }}
                inputProps={{ style: { color: '#ffe3a3' } }}
                variant="outlined" 
                sx={{ width: '100%', backgroundColor: '#141937', borderRadius: 1 }}
              />
            <br />
            </Grid>
          </Grid>
          <br />
          <div>
              TOTAL FACTURA: ${totalValue} PESOS
          </div>
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
        <Container maxWidth="sm" sx={{ padding: 2, alignItems: "center",
            justifyContent: "center", display: 'flex' }}>
        <Button
          variant="contained"
          onClick={() => {
            setVerPdf(!verPdf)
          }}
          disabled={!datosEnviados}
          alignItems="center"
          justifyContent="center"
          sx={{
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          {verPdf ? (
            <PDFViewer style={{ width: "100%", height: "90vh" }}>
              <TransactionPDF facturaData={facturaData} />
            </PDFViewer>
          ) : 'Ver pdf'}
        </Button>
        </Container>
        {/* <Button
          variant="contained"
        >Descargar PDF</Button> */}
      </nav>
    </header>
  </section>
  );
}

export default HomePage;