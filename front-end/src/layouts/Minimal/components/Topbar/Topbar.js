import React from "react";
import { Link as RouterLink } from "react-router-dom";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { AppBar, Toolbar } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  root: {
    boxShadow: "none"
  },
  teste: {
    width: 210,
    marginLeft: -10
  }
}));

const Topbar = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  return (
    <AppBar {...rest} className={clsx(classes.root, className)} color="primary" position="fixed">
      <Toolbar>
        <RouterLink to="/">
          <img className={classes.teste} alt="Logo" src="/images/logos/webcontas-logo.svg" />
        </RouterLink>
      </Toolbar>
    </AppBar>
  );
};

Topbar.propTypes = {
  className: PropTypes.string
};

export default Topbar;
