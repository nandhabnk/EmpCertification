import { useNavigate } from "react-router-dom";

import { MenuItem, AppBar, Box, Toolbar, Typography } from "@mui/material";

import HomeIcon from "@mui/icons-material/Home";

import * as Styled from "./NavHeader.style";

const NavHeader = () => {
  const navigate = useNavigate();
  const navigateTo = (path: string) => {
    navigate(path);
  };
  return (
    <Styled.NavWrapper>
      <Box>
        <AppBar position="static">
          <Toolbar>
            <MenuItem onClick={() => navigateTo("/home")}>
              <HomeIcon />
            </MenuItem>
            <MenuItem onClick={() => navigateTo("/createRequest")}>
              <Typography variant="h6" component="div">
                Request Certificate
              </Typography>
            </MenuItem>
            <MenuItem onClick={() => navigateTo("/allRequests")}>
              <Typography variant="h6" component="div">
                Requests List
              </Typography>
            </MenuItem>
          </Toolbar>
        </AppBar>
      </Box>
    </Styled.NavWrapper>
  );
};

export default NavHeader;
