import { LinkProps, Link as MuiLink } from "@mui/material";
import { Link as ReactRouterLink } from "react-router-dom";

import React, { FC } from "react";

const MenuLink: FC<LinkProps> = props => {
  return (
    <MuiLink {...props} component={ReactRouterLink} to={props.href ?? "#"} underline="none" />
  );
};

export default MenuLink;