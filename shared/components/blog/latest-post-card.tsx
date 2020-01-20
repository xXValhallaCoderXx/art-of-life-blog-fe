import React from "react";
import { useRouter } from "next/router";

import { makeStyles } from "@material-ui/core/styles";
import startCase from "lodash/startCase";

import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles(theme => ({
  contentWrapper: {
    padding: 20
  },
  title: {
    marginTop: 20,
    marginBottom: 20,
    textTransform: "uppercase"
  },
  categoryTitle: {
    textTransform: "uppercase",
    color: theme.palette.primary.main,
    "&:hover": {
      cursor: "pointer"
    }
  },
  buttonWrapper: {
   fontWeight: 600,
   fontSize: 18,
   padding: 15,
   paddingLeft: 40,
   paddingRight: 40
  },
  image: {
    objectFit: "cover",
    objectPosition: "50% 0%",
    width: "100%",
    height: 250,
  }
}));

interface Props {
  title: string;
  category: string;
  image: string;
  id: string;
  shadow?: number;
  categoryID: string;
}

const LatestPostCard = ({
  title,
  category,
  image,
  id,
  shadow,
  categoryID
}: Props) => {
  // @ts-ignore
  const classes = useStyles();
  const router = useRouter();
  return (
    <Box boxShadow={shadow}>
      <Card>
        <CardContent style={{padding: 0}}>
          <img className={classes.image} src={image} />
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            className={classes.contentWrapper}
          >
            
            <Typography
              onClick={() => router.push(`/category/${categoryID}`)}
              color="primary"
              variant="subtitle1"
              className={classes.categoryTitle}
            >
              {startCase(category)}
            </Typography>
            <Typography color="textPrimary" variant="h4" className={classes.title}>
              {title}
            </Typography>
            <Button
              className={classes.buttonWrapper}
              variant="contained"
              color="primary"
              disableElevation
              onClick={() => router.push(`/article/${id}`)}
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
