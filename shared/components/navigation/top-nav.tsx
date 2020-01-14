import React from "react";
import { SideDrawer } from "shared/components/navigation";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import InstagramIcon from "@material-ui/icons/Instagram";
import FacebookIcon from "@material-ui/icons/Facebook";
import GitHubIcon from "@material-ui/icons/GitHub";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import {colors} from "shared/styles/_colors";
import "shared/styles/index.scss";

const navStyles = makeStyles(theme => ({
  topNav: {
    backgroundColor: colors.darkAccent
  },
  socialIcon: {
    "&:hover": {
      color: "grey",
      cursor: "pointer"
    }
  },
  linkContainer: {
    display: "flex",
    flex: 1,
    justifyContent: "center"
  },
  menuButton: {
    marginRight: theme.spacing(2)
  }
}));

const TopNav = () => {
  const [sideOpen, setSideOpen] = React.useState(false);
  // @ts-ignore
  const classes = navStyles();
  function toggleSidedrawer() {
    setSideOpen(!sideOpen);
  }
  function toggleDrawer(event: any) {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setSideOpen(!sideOpen);
  }

  const onIconClick = (type: string) => () => {
    switch (type) {
      case "instagram":
        window.open("https://www.instagram.com/xxwanderingmonkxx/");
        break;
      case "facebook":
        window.open("https://www.facebook.com/Wandering.Monk/");
        break;
      case "github":
        window.open("https://github.com/xXValhallaCoderXx");
        break;
      case "linkedin":
        window.open("https://www.linkedin.com/in/xxvalhallaxx/");
        break;
      default:
        console.error("Invalid Social Media Link");
    }
  };
  return (
    <AppBar className={classes.topNav}>
      <Toolbar>
        <Grid item xs={4}>
          <IconButton
            onClick={toggleSidedrawer}
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
        </Grid>
        <Grid item xs={4}></Grid>
        <Grid
          item
          component="div"
          spacing={1}
          container
          alignItems="flex-start"
          justify="flex-end"
          xs={4}
        >
          <Grid item>
            <GitHubIcon
              onClick={onIconClick("github")}
              className={classes.socialIcon}
            />
          </Grid>
          <Grid item>
            <InstagramIcon
              onClick={onIconClick("instagram")}
              className={classes.socialIcon}
            />
          </Grid>
          <Grid item>
            <FacebookIcon
              onClick={onIconClick("facebook")}
              className={classes.socialIcon}
            />
          </Grid>
          <Grid item>
            <LinkedInIcon
              onClick={onIconClick("linkedin")}
              className={classes.socialIcon}
            />
          </Grid>
        </Grid>
        <SideDrawer isOpen={sideOpen} toggleDrawer={toggleDrawer} />
      </Toolbar>
    </AppBar>
  );
};

export default TopNav;
