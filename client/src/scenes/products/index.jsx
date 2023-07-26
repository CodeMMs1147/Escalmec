import React, { useEffect, useState } from "react";
import { Link} from "react-router-dom";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Collapse,
  CardMedia,
  Button,
  Typography,
  Rating,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { ReceiptLongOutlined } from "@mui/icons-material";
import Header from "components/Header";
import axios from "axios"; // Importa Axios

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

const Products = () => {
  const theme = useTheme();
  const [data, setData] = useState([]); // Utilizamos useState en lugar de Redux Toolkit Query
  const [isLoading, setIsLoading] = useState(true);

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

  const isNonMobile = useMediaQuery("(min-width: 1000px)");

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="PRODUCTOS" subtitle="Estos son los productos de Escalmec que pueden ser cotizados."  />
      <>
        <Box>
          <Link to="/registrarproducto" className="text-sky-500">
            <Button
              sx={{
                backgroundColor: theme.palette.secondary.light,
                color: theme.palette.background.alt,
                fontSize: "14px",
                fontWeight: "bold",
                padding: "10px 20px",
              }}
            >
              <ReceiptLongOutlined sx={{ mr: "10px" }} />
              Ingresar Producto
            </Button>
          </Link>
        </Box>
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
  );
};

export default Products;