import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(() => ({
  text: {
    textTransform: "uppercase",
    marginTop: 10
  },
  image: {
    objectFit: "cover",
    width: "100%",
    height: 450,
    objectPosition: "50% 0%"
  }
}));

interface Props {
  category: string;
  title: string;
  image: string;
}

const FeaturePostHome = (props: Props) => {
  const classes = useStyles(props);
  return (
    <Box boxShadow={10}>
      <Card>
        <CardContent>
          <Grid container justify="center">
            <img src={props.image} className={classes.image} />
          </Grid>

          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
          >
            <Typography
              className={classes.text}
              color="primary"
              variant="subtitle2"
            >
              {props.category}
            </Typography>
            <Typography className={classes.text} color="primary" variant="h6">
              {props.title}
            </Typography>
            <Button
              className={classes.text}
              variant="contained"
              color="primary"
              disableElevation
            >
              READ MORE
            </Button>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default FeaturePostHome;