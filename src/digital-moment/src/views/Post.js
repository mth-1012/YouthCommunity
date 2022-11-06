import * as React from "react";
import {useSearchParams} from "react-router-dom";
import NavBar from "./NavBar";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import {red} from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Grid from "@mui/material/Grid";
import {Box} from "@mui/system";
import moment from "moment";
import api from "../api";
import qs from "qs"
import Chip from "@mui/material/Chip";
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import PsychologyAltIcon from '@mui/icons-material/PsychologyAlt';

export default function Post() {
  const [currentPost, setCurrentPost] = React.useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const fetchData = async () => {
    const config = {
      method: "GET",
      header: {
        "Content-Type": "application/json",
      },
      validateStatus: () => true,
    };
    const _id = searchParams.get("_id");
    const res = await api.get(
      `/post/get/${_id}`,
      config
    );
    setCurrentPost(res.data?.post);
    console.log("Fetch Get Response : ", res.data);
  };
  React.useEffect(() => {
    console.log("Called Only Once");
    fetchData();
  }, []);

  const increaseUpvote = async (postId) => {
    const config = {
      method: "POST",
      header: {
        "Content-Type": "application/json",
      },
    };
    const upvoteRes = await api.post(`/post/${postId}/upvote`, config);
    // if (upvoteRes?.data.success) {
    //   const clickedPost = postList.find(({_id}) => _id === postId);
    //   clickedPost.upvote += 1;
    //   setPostList([...postList, clickedPost]);
    // }
  };

  return (
    <Box
      sx={{
        height: 1000,
        overflow: "hidden",
      }}
    >
      <NavBar/>
      <Grid container spacing={0} direction="column" alignItems="center" justify="center">
        <Card sx={{width: 500, m: 2, position: "absolute", align: "center"}}>
          <CardHeader
            avatar={
              <Avatar sx={{bgcolor: red[300]}} aria-label="recipe">
                {"currentPost.username".charAt(0).toUpperCase()}
              </Avatar>
            }
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon/>
              </IconButton>
            }
            title={"currentPost.username" + " | " + "currentPost.location"}
            subheader={moment("createdAt").fromNow()}
          />
          <CardMedia
            component="img"
            height="194"
            image="https://picsum.photos/400/300"
            alt="Sample Image"
          />

          <CardContent>
            {true ?
              <Chip icon={<PsychologyAltIcon/>} label="Challenge" color="error"/>
              : <Chip icon={<TipsAndUpdatesIcon/>} label="Idea" color="success"/>}
            <Typography variant="body2" color="text.secondary">
              <p>
                <strong>{"currentPost.title" + " | " + "currentPost.interest"}</strong>
              </p>
              <br/>
              {"description"}
            </Typography>
            {["tags"].map((tag) => (
              <span style={{color: "#0000ff"}}> #{tag.trim()}</span>
            ))}
          </CardContent>
          <CardActions disableSpacing>
            <IconButton aria-label="add to favorites">
              <FavoriteIcon/>{" "}
              {0}
            </IconButton>
            <IconButton aria-label="share">
              <ShareIcon/>
            </IconButton>
          </CardActions>
        </Card>
      </Grid>
    </Box>
  );
}
