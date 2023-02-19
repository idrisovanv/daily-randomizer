import React, { useState, MouseEvent } from 'react';
import { Outlet, Link, useLocation } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import HomeIcon from '@mui/icons-material/Home';
import WorkspacesIcon from '@mui/icons-material/Workspaces';
import GroupsIcon from '@mui/icons-material/Groups';

const Layout = (): JSX.Element => {
  const location = useLocation();
  const curRoutes = location.pathname.split('/');
  const curLocation = curRoutes[curRoutes.length - 1] || 'Dashboard';
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (): void => {
    setAnchorEl(null);
  };
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              id="basic-button"
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <MenuItem onClick={handleClose} component={Link} to="/">
                <ListItemIcon>
                  <HomeIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText> Dashboard</ListItemText>
              </MenuItem>
              <MenuItem onClick={handleClose} component={Link} to="/developers">
                <ListItemIcon>
                  <GroupsIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Developers</ListItemText>
              </MenuItem>
              <MenuItem onClick={handleClose} component={Link} to="/teams">
                <ListItemIcon>
                  <WorkspacesIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Teams</ListItemText>
              </MenuItem>
            </Menu>
            <Typography variant="h6" component="div" sx={{ textTransform: 'capitalize' }}>
              {curLocation}
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
      <Box sx={{m: 4}}>
        <Outlet />
      </Box>
    </>
  )
};

export default Layout;