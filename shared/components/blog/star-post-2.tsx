import { useRouter } from "next/router";
import { Grid, Typography, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { parseISO, format } from "date-fns";
import theme from "shared/styles/theme";

const useStyles = makeStyles(() => ({
  text: {
    textTransform: "uppercase",
    fontWeight: 800,
    marginTop: 5,
    marginLeft: -5,
    "&:hover": {
      cursor: "pointer",
    },
  },
  titleText: {
    color: theme.palette.secondary.dark,
    marginTop: -5,
    marginBottom: "1vh",
    "&:hover": {
      color: theme.palette.primary.main,
      cursor: "pointer",
    },
  },
  image: {
    objectFit: "cover",
    width: "100%",
    height: 200,
    objectPosition: "50% 0%",
    "&:hover": {
      cursor: "pointer",
    },
  },
  postWrapper: {
    borderTop: `2px solid ${theme.palette.secondary.light}`,
  },
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
    <div className={classes.postWrapper}>
      <Typography
        component="div"
        onClick={() => router.push(`/category/${categoryID}`)}
        className={classes.text}
        variant="subtitle1"
        color="primary"
      >
        <Box letterSpacing={4} m={1}>
          {category}
        </Box>
      </Typography>

      <Typography
        className={classes.titleText}
        variant="h5"
        color="textSecondary"
        onClick={() => router.push(`/article/${id}`)}
      >
        {title}
      </Typography>
      <Typography
        variant="subtitle1"
        color="textSecondary"
        style={{ marginTop: -5, marginBottom: 10 }}
      >
        {format(parseDate, "MMM do yyyy")}
      </Typography>
      <img
        className={classes.image}
        src={img}
        onClick={() => router.push(`/article/${id}`)}
      />
    </div>
  );
};

export default StarPosts;
