import startCase from "lodash/startCase";
import { useRouter } from "next/router";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  categoryTitle: {
    borderBottom: `2px solid ${theme.palette.primary.light}`
  },
  category: {
    color: theme.palette.primary.light,
    borderBottom: `2px solid ${theme.palette.primary.light}`,
    padding: 10,
    "&:hover": {
      color: theme.palette.primary.dark,
      cursor: "pointer"
    }
  },
}));


const CategoryList = ({categories}) => {
  // @ts-ignore
  const classes = useStyles();
  const router = useRouter();
  return (
    <div>
      <Typography
        className={classes.categoryTitle}
        color="textPrimary"
        variant="h6"
      >
        CATEGORIES
      </Typography>
      {renderCategories()}
    </div>
  );

  function renderCategories() {
    if (categories.length === 0) {
      return (
        <Typography align="left" color="textSecondary" variant="h6">
          No Categories
        </Typography>
      );
    }
    return categories.map((category, index) => {
      return (
        <Typography
          onClick={() => router.push(`/category/${category.id}`)}
          className={classes.category}
          key={index}
          color="textSecondary"
          variant="h6"
        >
          {startCase(category.title)}
        </Typography>
      );
    });
  }
};

export default CategoryList;
