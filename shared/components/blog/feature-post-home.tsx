import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(() => ({
  text: {
    textTransform: "uppercase",
    marginTop: 10
  }
}));

interface Props {
  category: string;
  title: string;
}

const FeaturePostHome = (props: Props) => {
  const classes = useStyles(props);
  return (
    <Card>
      <CardContent>
        <Grid container direction="column" justify="center" alignItems="center">
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
  );
};

export default FeaturePostHome;
