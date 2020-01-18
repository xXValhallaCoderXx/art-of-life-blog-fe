import { Grid, Box } from "@material-ui/core";

const StarPosts = props => {
  console.log("STAR : ", props);
  const { title } = props.post;
  return (
    <Grid item xs={12}>
      <Grid item xs={4}>
        Img
      </Grid>
      <Grid item>{title}</Grid>
    </Grid>
  );
};

export default StarPosts;
