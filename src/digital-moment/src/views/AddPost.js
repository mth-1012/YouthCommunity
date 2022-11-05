import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import {
  Avatar,
  Box,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Typography,
} from "@mui/material";
import { Formik } from "formik";
const names = ["Sports", "Technology", "Environment", "Politics", "Physics"];

export default function AddPost(props) {
  const [open, setOpen] = React.useState(props.openPopup);

  const onChange = (e) => {
    console.log("FUNCTIONCALLED");
    SetFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const [formData, SetFormData] = React.useState({
    title: "",
    description: "",
    type: "Solution",
    interest: "",
    tags: "",
  });

  const { title, description, type, tags, interest } = formData;
  const uploadPost = async (event) => {
    event.preventDefault();

    console.log("Submitting ", formData);
    const config = {
      method: "GET",
      header: {
        "Content-Type": "application/json",
      },
      validateStatus: () => true,
    };
    const res = await axios.get(
      `http://localhost:5000/user/get/${localStorage.getItem("email")}`,
      config
    );

    var data = {
      post: {
        ...formData,
        ...res.data.user,
        tags: formData.tags.split(","),
        challenge: true,
      },
    };
    const config1 = {
      method: "POST",
      header: {
        "Content-Type": "application/json",
      },
      validateStatus: () => true,
    };
    const postRes = await axios.post(
      `http://localhost:5000/post/createPost`,
      data,
      config1
    );
  };
  return (
    <div>
      <Dialog open={props.openPopup} onClose={props.closeOpenPopup}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText>
          <Formik
            initialValues={formData}
            onSubmit={uploadPost}
            validate={() => {
              const errors = {};
              if (!description.trim()) {
                errors.description = "Description is required !";
              }
              if (!title.trim()) {
                errors.title = "Title is Required !";
              }

              return errors;
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
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
                <Typography component="h1" variant="h5">
                  Sign up
                </Typography>
                <Box
                  component="form"
                  noValidate
                  sx={{ mt: 3 }}
                  onSubmit={uploadPost}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        id="title"
                        label="Post Title"
                        name="title"
                        autoComplete="family-name"
                        onChange={(e) => onChange(e)}
                      />
                      <p className="FormError">
                        {touched.title && errors.title}
                      </p>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        name="interest"
                        label="Interest"
                        type="interest"
                        id="interest"
                        autoComplete="new-interest"
                        onChange={(e) => onChange(e)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        id="description"
                        label="Post Desciption"
                        name="description"
                        autoComplete="description"
                        onChange={(e) => onChange(e)}
                      />
                      <p className="FormError">
                        {touched.description && errors.description}
                      </p>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        name="tags"
                        label="Hashtags"
                        id="tags"
                        autoComplete="new-tags"
                        onChange={(e) => onChange(e)}
                      />
                    </Grid>
                  </Grid>
                  <DialogActions>
                    <Button type="submit" variant="contained">
                      Upload Post
                    </Button>
                    <Button onClick={props.closeOpenPopup} variant="contained">
                      Cancel
                    </Button>
                  </DialogActions>
                </Box>
              </Box>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    </div>
  );
}
