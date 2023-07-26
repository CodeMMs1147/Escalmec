import { useAuth } from "../../context/authContext";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { Message } from "components/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Container, TextField, Grid } from "@mui/material";
import { loginSchema } from "../../schemas/auth";
import { styled } from '@mui/system';

export function LoginPage() {

  const StyledH1 = styled('h1')({
    textAlign: 'center',
    marginLeft: '10%',
    marginRight: '10%',
    color: '#ffd166'
  });
  
  const { signin, errors: loginErrors, isAuthenticated } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });
  
  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log(data);
    signin(data);
  }

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/panel principal");
    }
  }, [isAuthenticated]);

  return (

    <section className="bg-red-500 flex justify-center items-center">
    <header className="bg-zinc-800 p-10">
      <StyledH1>BIENVENID@S A ESCALMEC</StyledH1>
    <Container maxWidth="sm" sx={{ border: 1, borderRadius: 5, padding: 3, alignItems: 'center', justifyContent: 'center', height: '50vh', marginTop: 10 }}>
        {loginErrors.map((error, i) => (
          <Message message={error} key={i} />
        ))}
        <h1 background="red">Iniciar Sesion</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
        <Grid
            alignItems="center"
            justifyContent="center"
            container spacing={1}
          >
          <TextField 
            label="Correo electronico" 
            fullWidth
            name="email"
            placeholder="youremail@domain.tld"
            inputProps={register("email", { required: true })}
            sx={{ width: '100%', backgroundColor: '#141937', borderRadius: 1, borderColor: '#ffe3a3', marginTop: 2 }}
          />
          {errors.email?.message && (
            <p style={{ color: "#EF4444" }}>{errors.email?.message}</p>
          )}
          <TextField 
            label="Contraseña" 
            fullWidth
            name="password"
            placeholder="********"
            inputProps={register("password", { required: true, minLength: 6 })}
            sx={{ width: '100%', backgroundColor: '#141937', borderRadius: 1, borderColor: '#ffe3a3', marginTop: 2 }}
          />
          {errors.password?.message && (
            <p style={{ color: "#EF4444" }}>{errors.password?.message}</p>
          )}

          <Button
            style={{
              background: "#6366F1",
              padding: "1",
              borderRadius: "md",
              margin: "2",
              color: "white",
              marginTop: "14px"
            }}
            type="submit"
          >Ingresar</Button>
          </Grid>
        </form>

        <p className="flex gap-x-2 justify-between">
          No tienes una cuenta ? <Link style={{ color: "#60A5FA", fontSize: "small", marginLeft: "1" }} to="/register" className="text-sky-500">Registrarme</Link>
        </p>
    </Container>
    </header>
  </section>
  );
}