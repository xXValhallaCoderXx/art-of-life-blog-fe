import startCase from "lodash/startCase";
import { useRouter } from "next/router";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  categoryTitle: {
    paddingBottom: 20,
    borderBottom: `2px solid ${theme.palette.secondary.main}`
  },
  category: {
    color: theme.palette.secondary.dark,
    borderBottom: `2px solid ${theme.palette.secondary.main}`,
    padding: 10,
    "&:hover": {
      color: theme.palette.primary.main,
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
     <div>
        {renderCategories()}
     </div>
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
