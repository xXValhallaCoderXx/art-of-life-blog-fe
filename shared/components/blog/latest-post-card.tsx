import React from "react";
import { useRouter } from "next/router";
import { parseISO, format } from "date-fns";
import { makeStyles } from "@material-ui/core/styles";
import startCase from "lodash/startCase";

import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles(theme => ({
  height: {
    height: "100%"
  },
  publishedAt: {
    marginBottom: 20
  },
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
    fontWeight: 600
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
  id: string;
  shadow?: number;
  categoryID: string;
  publishedAt: string;
}

const LatestPostCard = ({
  title,
  category,
  image,
  id,
  shadow,
  categoryID,
  publishedAt
}: Props) => {
  // @ts-ignore
  const classes = useStyles();
  const router = useRouter();
  const parsedDate = parseISO(publishedAt);
  return (
    <Box boxShadow={shadow} className={classes.height}>
      <Card className={classes.height}>
        <img className={classes.image} src={image} />
        <CardContent>
          <Box
            flexShrink={1}
            display="flex"
            flexDirection="column"
            justifyContent="center"
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
            <Typography
              color="textPrimary"
              align="center"
              variant="h6"
              className={classes.title}
            >
              {title}
            </Typography>
            <Typography
              color="textSecondary"
              variant="body1"
              className={classes.publishedAt}
            >
              {format(parsedDate, "MMM do yyyy")}
            </Typography>
          </Box>
          <Box display="flex" justifyContent="center">
            <Button
              className={classes.buttonWrapper}
              variant="contained"
              color="primary"
              disableElevation
              onClick={() => router.push(`/article/${id}`)}
            >
              READ MORE
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default LatestPostCard;
