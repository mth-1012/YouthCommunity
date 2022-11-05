import React, { useState, useContext } from "react";
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
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import api from "../../api";
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
const names = [
  "Sports",
  "Technology",
  "Environment",
  "School",
  "Pets",
  "Food",
  "Fashion",
  "Music",
  "Games",
  "Movies",
];
function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}
function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit">Youth Community</Link> {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function SignUp() {
  const navigate = useNavigate();

  // const [interest, setInterest] = React.useState([]);

  // const handleChange = (event) => {
  //   const {
  //     target: { value },
  //   } = event;
  //   setInterest(
  //     // On autofill we get a stringified value.
  //     typeof value === "string" ? value.split(",") : value
  //   );
  // };
  const onChange = (e) => {
    console.log("FUNCTIONCALLED");
    SetFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const [formData, SetFormData] = React.useState({
    password: "",
    username: "",
    location: "",
    email: "",
    interest: [],
  });
  const { password, username, location, email, interest } = formData;
  const sendMail = async (event) => {
    event.preventDefault();
    const userData = new FormData(event.currentTarget);
    console.log("Submitting ", userData);

    var data = {
      user: formData,
    };
    const config = {
      method: "POST",
      header: {
        "Content-Type": "application/json",
      },
      validateStatus: () => true,
    };
    const res = await api.post("/user/createUser", data, config);
    console.log("res from api ", res);
    navigate("/login");
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Formik
          initialValues={formData}
          onSubmit={sendMail}
          validate={() => {
            const errors = {};
            if (!username.trim()) {
              errors.username = "First name is required !";
            }
            if (!email.trim()) {
              errors.email = "Email is Required !";
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)
            ) {
              errors.email = "Invalid email address !";
            }
            // else {
            //   errors.email = "Email is already exists ! !";
            // }
            if (!password.trim()) {
              errors.password = "Password is required !";
            } else if (password.trim().length < 6) {
              errors.password = "Minimim 6 characters are required !";
            }

            return errors;
          }}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            isSubmitting,
            handleSubmit,
          }) => (
            <Box
              sx={{
                marginTop: 5,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign up
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={sendMail}
                sx={{ mt: 3 }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="username"
                      label="User Name"
                      name="username"
                      autoComplete="family-name"
                      onChange={(e) => onChange(e)}
                    />
                    <p className="FormError">
                      {touched.username && errors.username}
                    </p>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="location"
                      label="location"
                      type="location"
                      id="location"
                      autoComplete="new-location"
                      onChange={(e) => onChange(e)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      onChange={(e) => onChange(e)}
                    />
                    <p className="FormError">{touched.email && errors.email}</p>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="new-password"
                      onChange={(e) => onChange(e)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Checkbox value="allowExtraEmails" color="primary" />
                      }
                      label="I want to receive inspiration, marketing promotions and updates via email."
                    />
                  </Grid>
                  <Grid item>
                    <FormControl
                      required
                      sx={{ m: 1, minWidth: 410 }}
                      name="interest"
                    >
                      <InputLabel id="demo-multiple-chip-label">
                        Interest
                      </InputLabel>
                      <Select
                        label="Interest *"
                        id="demo-multiple-chip"
                        multiple
                        required
                        value={interest}
                        onChange={(e) => onChange(e)}
                        name="interest"
                        input={
                          <OutlinedInput
                            id="select-multiple-chip"
                            label="Interest"
                          />
                        }
                        renderValue={(selected) => (
                          <Box
                            sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}
                          >
                            {selected.map((value) => (
                              <Chip key={value} label={value} />
                            ))}
                          </Box>
                        )}
                        MenuProps={MenuProps}
                      >
                        {names.map((name) => (
                          <MenuItem
                            key={name}
                            value={name}
                            style={getStyles(name, interest, theme)}
                          >
                            {name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  // onClick={sendMail}
                >
                  Sign Up
                </Button>
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link href="/login" variant="body2">
                      Already have an account? Sign in
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          )}
        </Formik>
        <Copyright sx={{ mt: 2 }} />
      </Container>
    </ThemeProvider>
  );
}
