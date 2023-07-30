import SendIcon from '@mui/icons-material/Send';
import { Button, Container, Grid, TextField, Select, useTheme, FormControl, Table, TableHead, TableBody, TableRow, TableCell, TableContainer, Paper, Accordion, AccordionSummary, AccordionDetails, Box,
  Card,
  CardActions,
  CardContent,
  Collapse,
  CardMedia,
  Typography,
  Rating,
  useMediaQuery, } from "@mui/material";
  import { ReceiptLongOutlined } from "@mui/icons-material";
import Header from "components/Header";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import InputLabel from "@mui/material/InputLabel";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { productOption, vendorOption, fixService } from 'constants/general';
import { styled } from '@mui/system';

const Product = ({
  _id,
  name,
  description,
  price,
  rating,
  category,
  supply,
  image,
  stat,
}) => {
  const theme = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card
      sx={{
        backgroundImage: "none",
        backgroundColor: theme.palette.background.alt,
        borderRadius: "0.55rem",
      }}
    >
      <CardMedia component="img" height="300" src={`${process.env.REACT_APP_BASE_URL}/client/uploads/${image}`} alt="barberBoss.png" />
      <CardContent>
      <Typography
          sx={{ fontSize: 14 }}
          color={theme.palette.secondary[700]}
          gutterBottom
        >
          {category}
        </Typography>
        <Typography variant="h5" component="div">
          {name}
        </Typography>
        <Typography sx={{ mb: "1.5rem" }} color={theme.palette.secondary[400]}>
          ${Number(price).toFixed(2)}
        </Typography>
        <Rating value={rating} readOnly />

        <Typography variant="body2">{description}</Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="primary"
          size="small"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          Ver más
        </Button>
      </CardActions>
      <Collapse
        in={isExpanded}
        timeout="auto"
        unmountOnExit
        sx={{
          color: theme.palette.neutral[300],
        }}
      >
        <CardContent>
          <Typography>id: {_id}</Typography>
          <Typography>Unidades disponibles: {supply}</Typography>
          <Typography>
            Unidades vendidas este año: {stat}
          </Typography>
          <Typography>
            Unidades vendidas  este año: {stat}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

function HomePage() {
  const [facturaData, setFacturaData] = useState(null);
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
  const [data, setData] = useState([]); // Utilizamos useState en lugar de Redux Toolkit Query
  const [isLoading, setIsLoading] = useState(true);

  const isNonMobile = useMediaQuery("(min-width: 1000px)");


  const StyledH1 = styled('h1')({
    textAlign: 'center',
    marginLeft: '10%',
    marginRight: '10%',
    color: '#7DF9FF'
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
          updatedProduct.iva = selectedProduct.price * 0.19;
        } else if (field === 'units') {
          updatedProduct.totalValue = selectedProduct.price * value;
        }
        console.log(updatedProduct.iva);
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
    console.log(products);
  };

  const handleAddProduct = () => {
    const newProduct = { id: Date.now() ,description: '', units: 1, unitValue: 0 , iva: 0, totalValue: 0};
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
        unitValue: product.unitValue,
        iva: product.iva,
      })),
      totalValue,
      estado,
    };

    const clientData = {
      name,
      nit,
      phoneNumber,
      email,
      address,
    };

    try {
      await axios.post(`${process.env.REACT_APP_BASE_URL}/sales/sales`, facturaData);
      await axios.post(`${process.env.REACT_APP_BASE_URL}/client/clientes`, clientData);
      // await axios.post(`${process.env.REACT_APP_BASE_URL}/auth/register`, clientData);
      setFacturaData(facturaData);
      setDatosEnviados(true);
      // Realiza alguna acción después de guardar exitosamente los datos
    } catch (error) {
      console.log(error)
    }
  };

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    handleSubmit();
  }, [products]);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/client/productos`) // Hacemos la solicitud GET con Axios
      .then((res) => {
        console.log(res.data);
        setData(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
  }, []);

  return (
  <section className="bg-red-500 flex justify-center items-center">
    <header className="bg-zinc-800 p-10">
      <Accordion sx={{ marginTop: '20px' }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel-content">
          <StyledH1>Cotizar</StyledH1>
        </AccordionSummary>
        <AccordionDetails>
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
        </AccordionDetails>
        <AccordionDetails>
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
        </AccordionDetails>
      </Accordion>
      <Box m="1.5rem 2.5rem">
      <Header title="BIENVENIDO A ESCALMEC" subtitle="A continuacion te presentamos nuestro portafolio de productos que puedes cotizar según tus necesidades."  />
      <>
        <Box
          mt="20px"
          display="grid"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          justifyContent="space-between"
          rowGap="20px"
          columnGap="1.33%"
          sx={{
            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
          }}
        >
          {data.map((singleData) => (
              <Product
                key={singleData._id}
                _id={singleData._id}
                name={singleData.name}
                description={singleData.description}
                price={singleData.price}
                rating={singleData.rating}
                category={singleData.category}
                supply={singleData.supply}
                image={singleData.image}
                stat={singleData.stat}
              />
            )
          )}
        </Box>
      </>
      </Box>
    </header>
  </section>
  );
}

export default HomePage;