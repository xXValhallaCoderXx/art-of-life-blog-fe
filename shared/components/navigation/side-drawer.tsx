import React from "react";
import { useRouter } from "next/router";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";

const sideDrawer = makeStyles({
  list: {
    width: 250,
  },
});

const Links = [
  { text: "Home", path: "/" },
  { text: "Travel", path: "/article/category/1" },
  { text: "Fitness", path: "/article/category/2" },
  { text: "Lifestyle", path: "/article/category/3" },
];

interface Props {
  isOpen: boolean;
  toggleDrawer: (event: any) => void;
}

const SideDrawer = ({ isOpen, toggleDrawer }: Props) => {
  // @ts-ignore
  const sideDrawerClass = sideDrawer();
  const router = useRouter();
  return (
    <Drawer open={isOpen} onClose={toggleDrawer}>
      <div className={sideDrawerClass.list}>
        <List>
          {Links.map((link, index) => (
            <ListItem key={index}>
              <Button color="inherit">
                <span onClick={() => router.push(link.path)}>{link.text}</span>
              </Button>
            </ListItem>
          ))}
        </List>
      </div>
    </Drawer>
  );
};

export default SideDrawer;
