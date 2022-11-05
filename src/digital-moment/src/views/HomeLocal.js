import * as React from "react";
import NavBar from "./NavBar";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import {red} from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Chip from "@mui/material/Chip";
import {Box} from "@mui/system";
import moment from "moment";
import api from "../api";
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import PsychologyAltIcon from '@mui/icons-material/PsychologyAlt';

export default function HomeLocal() {
  const [filteredPosts, setFilteredPosts] = React.useState([]);
  const [postList, setPostList] = React.useState([]);

  const fetchData = async () => {
    const config = {
      method: "POST",
      header: {
        "Content-Type": "application/json",
      },
      validateStatus: () => true,
    };
    const currentUserData = JSON.parse(localStorage.getItem("userInfo"));
    const res = await api.post(
      "/post/getList/local",
      {
        location: currentUserData.location,
        chronological: true,
      },
      config
    );
    setFilteredPosts(res.data.postList);
    setPostList(res.data.postList);
    console.log("Fetch Post Response : ", res);
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
    if (upvoteRes?.data.success) {
      const clickedPost = postList.find(({_id}) => _id === postId);
      clickedPost.upvote += 1;
      setPostList([...postList, clickedPost]);
    }
  };

  return (
    <Box
      sx={{
        height: 1000,
        // position: "absolute",
        overflow: "hidden",
      }}
    >
      <NavBar/>
      <Box
        sx={{
          width: "100%",
          height: "100%",
          overflowY: "scroll",
          // position: "relative",
        }}
      >
        {filteredPosts.length > 0 &&
        filteredPosts.map(
          ({
             post,
             username,
             description,
             createdAt,
             title,
             tags,
             challenge,
             interest,
             upvote,
             location,
             _id,
           }) => (
            <Box
              sx={{
                display: "inline-flex",
                // flexDirection: "row",
                m: 1
              }}
            >
              <Card sx={{width: 400}}>
                <CardHeader
                  avatar={
                    <Avatar sx={{bgcolor: red[300]}} aria-label="recipe">
                      {username.charAt(0).toUpperCase()}
                    </Avatar>
                  }
                  action={
                    <IconButton aria-label="settings">
                      <MoreVertIcon/>
                    </IconButton>
                  }
                  title={username + " | " + location}
                  subheader={moment(createdAt).fromNow()}
                />
                {/*{Math.random() > 0.5 && <CardMedia*/}
                {/*  component="img"*/}
                {/*  height="194"*/}
                {/*  image="https://picsum.photos/400/300"*/}
                {/*  alt="Sample Image"*/}
                {/*/>}*/}
                <CardContent>
                  {challenge ?
                    <Chip icon={<PsychologyAltIcon/>} label="Challenge" color="error"/>
                    : <Chip icon={<TipsAndUpdatesIcon/>} label="Idea" color="success"/>}
                  <Typography variant="body2" color="text.secondary">
                    <p>
                      <strong>{title + " | " + interest}</strong>
                    </p>
                    <br/>
                    {description}
                  </Typography>
                  {tags.map((tag) => (
                    <span style={{color: "#0000ff"}}> #{tag.trim()}</span>
                  ))}
                </CardContent>
                <CardActions disableSpacing>
                  <IconButton aria-label="add to favorites">
                    <FavoriteIcon onClick={() => increaseUpvote(_id)}/>{" "}
                    {upvote}
                  </IconButton>
                  <IconButton aria-label="share">
                    <ShareIcon/>
                  </IconButton>
                </CardActions>
              </Card>
            </Box>
          )
        )}
      </Box>
    </Box>
  );
}
