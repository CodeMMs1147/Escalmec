import { useEffect } from "react";
import { useAuth } from "../../context/authContext";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Message } from "components/ui";
import { registerSchema } from "../../schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Container, TextField, Grid } from "@mui/material";

function Register() {
  const { signup, errors: registerErrors, isAuthenticated } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });
  const navigate = useNavigate();

  const onSubmit = async (value) => {
    await signup(value);
  };

  useEffect(() => {
    if (isAuthenticated) navigate("/register");
  }, [isAuthenticated]);

  return (
    <Container maxWidth="md" sx={{ border: 1, borderRadius: 5, padding: 3, marginTop: 5 }}>
    {registerErrors.map((error, i) => (
      <Message message={error} key={i} />
    ))}
    <h1 style={{ fontSize: "6xl", fontWeight: "bold" }}>Registro</h1>
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid
        alignItems="center"
        justifyContent="center"
        container spacing={1}
      >
      <TextField 
        label="Nombre de usuario" 
        fullWidth
        name="email"
        placeholder="Escribe tu nombre de usuario"
        inputProps={register("username")}
        sx={{ width: '100%', backgroundColor: '#141937', borderRadius: 1, borderColor: '#ffe3a3', marginTop: 2 }}
      />
      {errors.username?.message && (
        <p style={{ color: "#EF4444" }}>{errors.username?.message}</p>
      )}

      <TextField 
        label="Correo electronico" 
        fullWidth
        name="email"
        placeholder="youremail@domain.tld"
        inputProps={register("email")}
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
        inputProps={register("password")}
        sx={{ width: '100%', backgroundColor: '#141937', borderRadius: 1, borderColor: '#ffe3a3', marginTop: 2 }}
      />
      {errors.password?.message && (
        <p style={{ color: "#EF4444" }}>{errors.password?.message}</p>
      )}

      <TextField 
        label="Confirma tu contraseña" 
        fullWidth
        name="confirmPassword"
        placeholder="********"
        inputProps={register("confirmPassword")}
        sx={{ width: '100%', backgroundColor: '#141937', borderRadius: 1, borderColor: '#ffe3a3', marginTop: 2 }}
      />
      {errors.confirmPassword?.message && (
        <p style={{ color: "#EF4444" }}>{errors.confirmPassword?.message}</p>
      )}

      <Button
        style={{
          background: "#6366F1",
          padding: "1",
          borderRadius: "md",
          margin: "2",
          color: "white",
          marginTop: '20px'
        }}
        type="submit"
      >
        Registrarme
      </Button>
      </Grid>
    </form>
    <p>
      Ya tienes una cuenta?
      <Link
        style={{ color: "#60A5FA", fontSize: "small", marginLeft: "1" }}
        to="/login"
      >
        Inicia sesion
      </Link>
    </p>
  </Container>
  );
}

export default Register;