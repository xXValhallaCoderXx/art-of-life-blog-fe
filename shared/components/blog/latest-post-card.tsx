import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(() => ({
  card: {
    width: 345
  },
  image: {
    objectFit: "cover",
    width: "100%",
    height: 250
  }
}));

interface Props {
  title: string;
  category: string;
  image: string;
}

const LatestPostCard = ({ title, category, image }: Props) => {
  // @ts-ignore
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardContent>
        <Grid container direction="column" justify="center" alignItems="center">
          <img className={classes.image} src={`https://art-of-life-blog-be.herokuapp.com${image}`} />
          <Typography color="primary" variant="subtitle2">
            {category}
          </Typography>
          <Typography color="primary" variant="h6">
            {title}
          </Typography>
          <Button variant="contained" color="primary" disableElevation>
            READ MORE
          </Button>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default LatestPostCard;
