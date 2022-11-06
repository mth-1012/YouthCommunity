import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import {
  Avatar,
  Box,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Radio,
  RadioGroup,
  Select,
  Typography,
} from "@mui/material";
import { Formik } from "formik";
import api from "../api";
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

export default function AddPost(props) {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(props.openPopup);

  const onChange = (e) => {
    SetFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const [formData, SetFormData] = React.useState({
    title: "",
    description: "",
    postType: "challange",
    interest: "",
    tags: "",
  });

  const { title, description, postType, tags, interest } = formData;
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
    const res = await api.get(
      `/user/get/${localStorage.getItem("email")}`,
      config
    );

    var data = {
      post: {
        ...formData,
        ...res.data.user,
        tags: formData.tags.split(","),
        challenge: formData.postType === "challange",
        interest: formData.interest,
      },
    };
    const config1 = {
      method: "POST",
      header: {
        "Content-Type": "application/json",
      },
      validateStatus: () => true,
    };
    const postRes = await api.post(`/post/createPost`, data, config1);
    if (postRes.data.success) {
      props.closeOpenPopup();
    }
  };
  return (
    <div>
      <Dialog open={props.openPopup} onClose={props.closeOpenPopup}>
        <DialogTitle>Create Post</DialogTitle>
        <DialogContent>
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
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Box
                  component="form"
                  sx={{ mt: 3 }}
                  onSubmit={uploadPost}
                  validate
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
                    <Grid item>
                      <FormControl
                        required
                        sx={{ minWidth: 550 }}
                        name="interest"
                      >
                        <InputLabel id="demo-multiple-chip-label">
                          Interest
                        </InputLabel>
                        <Select
                          label="Interest *"
                          id="demo-multiple-chip"
                          required
                          value={formData.interest}
                          // onChange={handleChange}
                          onChange={(e) => onChange(e)}
                          name="interest"
                          input={
                            <OutlinedInput
                              id="select-multiple-chip"
                              label="Interest"
                            />
                          }
                        >
                          {names.map((name) => (
                            <MenuItem key={name} value={name}>
                              {name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item>
                      <FormControl>
                        <RadioGroup
                          aria-labelledby="demo-radio-buttons-group-label"
                          defaultValue={formData.postType}
                          name="radio-buttons-group"
                          onChange={(e) => onChange(e)}
                        >
                          <FormControlLabel
                            value="challange"
                            control={<Radio />}
                            label="Challange"
                          />
                          <FormControlLabel
                            value="idea"
                            control={<Radio />}
                            label="Idea"
                          />
                        </RadioGroup>
                      </FormControl>
                    </Grid>
                  </Grid>
                  <DialogActions>
                    <Button
                      type="submit"
                      variant="contained"
                      // onClick={props.closeOpenPopup}
                    >
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
