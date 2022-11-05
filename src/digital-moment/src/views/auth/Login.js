import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import API from "../../api";
import api from "../../api";
import { Alert, Snackbar } from "@mui/material";
function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit">TEAM 5 CODE TO GIVE</Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function Login() {
  var vertical = "top";
  var horizontal = "center";
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = React.useState();
  const [snackBarOpen, setSnackBarOpen] = React.useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
    var credentials = {
      email: data.get("email"),
      password: data.get("password"),
    };

    const config = {
      method: "GET",
      header: {
        "Content-Type": "application/json",
      },
      validateStatus: () => true,
    };
    const res = await api.get(
      `/user/get/${credentials.email}/checkPassword/${credentials.password}`,
      config
    );
    console.log("RES ", res);
    if (res.data.match) {
      localStorage.setItem("email", credentials.email);
      localStorage.setItem("userInfo", JSON.stringify(res.data.userInfo));
      setIsLogin(true);
      setSnackBarOpen(true);
      navigate("/home");
    } else {
      setIsLogin(false);
      navigate("/login");
      setSnackBarOpen(true);
    }
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackBarOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
              <Grid>
                <Snackbar
                  anchorOrigin={{ vertical, horizontal }}
                  open={snackBarOpen}
                  autoHideDuration={2000}
                  onClose={handleClose}
                >
                  {isLogin ? (
                    <Alert severity="success" onClose={handleClose}>
                      Login Successful !
                    </Alert>
                  ) : (
                    <Alert severity="error" onClose={handleClose}>
                      Invalild credentials try again !
                    </Alert>
                  )}
                </Snackbar>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
