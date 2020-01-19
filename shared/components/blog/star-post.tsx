import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {parseISO, format} from "date-fns";

const useStyles = makeStyles(() => ({
  text: {
    textTransform: "uppercase",
    fontWeight: 800,
    marginTop: -5
  },
  image: {
    objectFit: "cover",
    width: "100%",
    height: 80,
    objectPosition: "50% 0%"
  }
}));

interface Props {
  img: string;
  title: string;
  category: string;
  categoryID: string;
  publishedAt: string;
}

const StarPosts = (props: Props) => {
  // @ts-ignore
  const classes = useStyles();
  const { title, img, category, categoryID, publishedAt } = props;
  const parseDate = parseISO(publishedAt);
  return (
    <>
      <Grid item lg={3}>
        <img className={classes.image} src={img} />
      </Grid>
      <Grid item lg={8}>
        <Typography
          className={classes.text}
          variant="subtitle1"
          color="textPrimary"
        >
          {category}
        </Typography>
        <Typography variant="subtitle1" color="textPrimary">
          {title}
        </Typography>
        <Typography variant="subtitle1" color="textPrimary">
          {format(parseDate, "MMM do yyyy")}
        </Typography>
      </Grid>
    </>
  );
};

export default StarPosts;
