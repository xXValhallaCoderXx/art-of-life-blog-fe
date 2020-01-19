import React from "react";
import Router from "next/router";

import { makeStyles } from "@material-ui/core/styles";
import startCase from "lodash/startCase";

import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles(theme => ({
  categoryTitle: {
    textTransform: "uppercase",
    color: theme.palette.primary.dark,
    "&:hover": {
      cursor: "pointer",
      color: theme.palette.primary.light
    }
  },
  buttonWrapper: {
    marginTop: 10
  },
  image: {
    objectFit: "cover",
    objectPosition: "50% 0%",
    width: "100%",
    height: 250,
    marginBottom: 20
  }
}));

interface Props {
  title: string;
  category: string;
  image: string;
  id: string;
}

const LatestPostCard = ({ title, category, image, id }: Props) => {
  // @ts-ignore
  const classes = useStyles();
  return (
    <Box boxShadow={10}>
      <Card>
        <CardContent>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
          >
            <img className={classes.image} src={image} />
            <Typography color="primary" variant="subtitle1" className={classes.categoryTitle}>
              {startCase(category)}
            </Typography>
            <Typography color="primary" variant="h6">
              {title}
            </Typography>
            <Button
              className={classes.buttonWrapper}
              variant="contained"
              color="primary"
              disableElevation
              onClick={() => Router.push(`/article/${id}`)}
            >
              READ MORE
            </Button>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default LatestPostCard;
