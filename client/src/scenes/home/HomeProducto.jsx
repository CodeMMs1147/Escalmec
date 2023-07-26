import { Link } from "react-router-dom";
import SendIcon from '@mui/icons-material/Send';
import { Button, Container, Grid, TextField, } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { styled } from '@mui/system';

function HomeProducto() {

  const userId = useSelector((state) => state.global.userId);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [rating, setRating] = useState('');
  const [supply, setSupply] = useState('');

  const [image, setImage] = useState({ image : ""});

  const StyledP = styled('p')({
    marginLeft: '10%',
    marginRight: '10%',
    width: '80%',
    margin: '0 auto',
    textAlign: 'center',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("name", name);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("rating", rating);
    formData.append("supply", supply);
    formData.append("image", image, image.name);

    try {
      await axios.post(`${process.env.REACT_APP_BASE_URL}/client/productos`, formData, {headers: {
        "Content-Type": "multipart/form-data", 
      },});
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    handleSubmit();
  }, []);

  return (
  <section className="bg-red-500 flex justify-center items-center">
    <header className="bg-zinc-800 p-10">
      <StyledP>
        <span>NOTA:</span> no recargues ni actualices la pagína cuando esta registrando un producto.
      </StyledP>
      <br />
      <Container maxWidth="md" sx={{ border: 1, borderRadius: 5, padding: 3, }}>
        <form onSubmit={handleSubmit}>
          <Grid
            alignItems="center"
            justifyContent="center"
            container spacing={2}
          >
            <Grid item xs={6}>
              <TextField
                label="Nombre del producto"
                value={name}
                onChange={(e) => setName(e.target.value)}
                InputLabelProps={{ shrink: true }}
                variant="outlined"
                inputProps={{ style: { color: '#ffe3a3' } }}
                sx={{ width: '100%', backgroundColor: '#141937', borderRadius: 1 }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Precio del producto"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                InputLabelProps={{ shrink: true }}
                inputProps={{ style: { color: '#ffe3a3' }, type: 'Number', min: 1 }}
                variant="outlined"
                sx={{ width: '100%', backgroundColor: '#141937', borderRadius: 1 }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Descripcion para el producto"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                InputLabelProps={{ shrink: true }}
                variant="outlined"
                inputProps={{ style: { color: '#ffe3a3' } }}
                sx={{ width: '100%', backgroundColor: '#141937', borderRadius: 1 }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Categoría para el producto"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                InputLabelProps={{ shrink: true }}
                inputProps={{ style: { color: '#ffe3a3' } }}
                variant="outlined"
                sx={{ width: '100%', backgroundColor: '#141937', borderRadius: 1 }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Calificacion de 1 a 5"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                InputLabelProps={{ shrink: true }}
                variant="outlined"
                inputProps={{ style: { color: '#ffe3a3' }, type: 'Number', min: 1, max: 5 }}
                sx={{ width: '100%', backgroundColor: '#141937', borderRadius: 1 }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Unidades disponibles"
                value={supply}
                onChange={(e) => setSupply(e.target.value)}
                InputLabelProps={{ shrink: true }}
                inputProps={{ style: { color: '#ffe3a3' }, type: 'Number', min: 1 }}
                variant="outlined"
                sx={{ width: '100%', backgroundColor: '#141937', borderRadius: 1 }}
              />
            </Grid>
            <Grid item xs={6}>
              <input
                type="file"
                accept="image/*, .jpeg, .png, .jpg"
                onChange={(e) => setImage(e.target.files[0])}
                name="image" // Agrega el atributo name
              />
            </Grid>
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
            Registrar
          </Button>
          </Grid>
        </form>
      </Container>

    </header>
  </section>
  );
}

export default HomeProducto;