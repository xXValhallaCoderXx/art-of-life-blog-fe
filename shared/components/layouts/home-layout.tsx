import { makeStyles } from "@material-ui/core/styles";
import { TopNav } from "../navigation";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles(theme => ({
  innerContainer: {
    paddingTop: 100,
  }
}));

export default ({ children }: any) => {
  // @ts-ignore
  const classes = useStyles();
  return (
    <div>
      <div className={classes.innerContainer}>
      <TopNav />
      <Container maxWidth="xl">{children}</Container>
      </div>
    </div>
  );
};