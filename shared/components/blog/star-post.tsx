import { useRouter } from "next/router";
import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { parseISO, format } from "date-fns";
import theme from "shared/styles/theme";

const useStyles = makeStyles(() => ({
  text: {
    textTransform: "uppercase",
    fontWeight: 800,
    marginTop: -5,
    "&:hover": {
      color: theme.palette.primary.light,
      cursor: "pointer"
    }
  },
  titleText: {
    fontWeight: 600,
    "&:hover": {
      color: theme.palette.primary.light,
      cursor: "pointer"
    }
  },
  image: {
    objectFit: "cover",
    width: "100%",
    height: 80,
    objectPosition: "50% 0%",
    "&:hover": {
      cursor: "pointer"
    }
  }
}));

interface Props {
  img: string;
  title: string;
  category: string;
  categoryID: string;
  publishedAt: string;
  id: string;
}

const StarPosts = (props: Props) => {
  // @ts-ignore
  const classes = useStyles();
  const router = useRouter();
  const { title, img, category, categoryID, publishedAt, id } = props;
  const parseDate = parseISO(publishedAt);
  return (
    <>
      <Grid item lg={3}>
        <img
          className={classes.image}
          src={img}
          onClick={() => router.push(`/article/${id}`)}
        />
      </Grid>
      <Grid item lg={8}>
        <Typography
          onClick={() => router.push(`/category/${categoryID}`)}
          className={classes.text}
          variant="subtitle1"
          color="primary"
        >
          {category}
        </Typography>
        <Typography
          className={classes.titleText}
          variant="body1"
          color="textSecondary"
          onClick={() => router.push(`/article/${id}`)}
        >
          {title}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          {format(parseDate, "MMM do yyyy")}
        </Typography>
      </Grid>
    </>
  );
};

export default StarPosts;
