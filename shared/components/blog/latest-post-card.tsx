import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles(() => ({
  card: {
    width: 345
  },
  image: {
    objectFit: "cover",
    objectPosition: "50% 0%",
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
    <Box boxShadow={10}>
      <Card className={classes.card}>
        <CardContent>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
          >
            <img className={classes.image} src={image} />
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
    </Box>
  );
};

export default LatestPostCard;
