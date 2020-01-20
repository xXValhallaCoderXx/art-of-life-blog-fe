import React from "react";
import { useRouter } from "next/router";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import { parseISO, format } from "date-fns";

const useStyles = makeStyles(theme => ({
  cardBg: {
    height: 500,
    backgroundImage: (props: any) => `url(${props.image})`,
    backgroundSize: "cover",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  cardWrapper: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
  },
  categoryTitle: {
    fontWeight: 600,
    textTransform: "uppercase",
    "&:hover": {
      cursor: "pointer"
    }
  },
  postTitle: {
    textTransform: "uppercase",
    marginTop: 20,
    marginBottom: 20
  },
  text: {
    paddingLeft: 40,
    paddingRight: 40,
    paddingTop: 15,
    paddingBottom: 15,
    textTransform: "uppercase",
    marginTop: 10,
    fontSize: 19,
    fontWeight: 600,
    "&:hover": {
      cursor: "pointer"
    }
  }
}));

interface Props {
  category: string;
  title: string;
  image: string;
  id: string;
  publishedAt: string;
}

const FeaturePostHome = (props: Props) => {
  const router = useRouter();
  const classes = useStyles(props);
  const parsedDate = parseISO(props.publishedAt);
  return (
    <Box boxShadow={10}>
      <Card>
        <CardContent className={classes.cardBg}>
       
            <Grid item xs={4}>
              <Card className={classes.cardWrapper}>
                <Typography
                  className={classes.categoryTitle}
                  color="primary"
                  variant="subtitle2"
                  align="center"
                >
                  {props.category}
                </Typography>
                <Typography
                  className={classes.postTitle}
                  color="textPrimary"
                  variant="h4"
                >
                  {props.title}
                </Typography>
                <Typography
                  style={{ marginBottom: 20 }}
                  color="textSecondary"
                  variant="body1"
                >
                 {format(parsedDate, "MMM do yyyy")}
                </Typography>
                <Button
                  onClick={() => router.push(`/article/${props.id}`)}
                  className={classes.text}
                  variant="contained"
                  color="primary"
                  disableElevation
                >
                  READ MORE
                </Button>
              </Card>
            </Grid>
      
        </CardContent>
      </Card>
    </Box>
  );
};

export default FeaturePostHome;
