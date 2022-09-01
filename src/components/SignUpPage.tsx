import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
//import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { auth } from "../firebase/clientApp";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useState } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import { useNavigate } from "react-router-dom";
import { UserData } from "../atoms/AuthAtom";

function SignUpPage() {
  const navigator = useNavigate();
  const [createUserWithEmailAndPassword, userCred, loading, userError] =
    useCreateUserWithEmailAndPassword(auth);
  const [formError, setFormError] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError("");
    const data = new FormData(event.currentTarget);
    const email = data.get("email")?.toString();
    const password = data.get("password")?.toString();
    const confirmPassword = data.get("confirmPassword")?.toString();

    if (email == undefined || password == undefined) return;

    if (password !== confirmPassword) {
      setFormError("Passwords do not match.");
      return;
    } else if (password.length > 20 || password.length < 5) {
      setFormError("Password must be between 5 and 20 characters long.");
      return;
    }
    console.log("sign up credentials", email + " " + password);

    await createUserWithEmailAndPassword(email, password)
      .then(() => {
        navigator("/tasks");
      })
      .catch((error) => {
        console.log("signup error", error);
      });
  };

  const createUserDocument = async (user: UserData) => {};

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={() => setFormError("")}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            onChange={() => setFormError("")}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            id="confirmPassword"
            onChange={() => setFormError("")}
          />
          <Typography
            component="p"
            variant="body1"
            color="red"
            textAlign={"center"}
          >
            {formError || userError?.message}
          </Typography>
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <LoadingButton
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            loading={loading}
          >
            Sign up
          </LoadingButton>
          <Grid container>
            <Grid item>
              <Link href="login" variant="body2">
                {"Already have an account? Log in!"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export default SignUpPage;
