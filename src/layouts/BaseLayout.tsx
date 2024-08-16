import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Outlet } from 'react-router-dom';
import PublicIcon from '@mui/icons-material/Public';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import GradeIcon from '@mui/icons-material/Grade';
import BuildIcon from '@mui/icons-material/Build';
import PrivacyTipIcon from '@mui/icons-material/PrivacyTip';
import HelpIcon from '@mui/icons-material/Help';
import MenuLink from '../components/MenuLink';
import { UserContext } from '../utils/UserContext';
import { useContext } from 'react';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import React from 'react';
import Button from '@mui/material/Button';


const drawerWidth = 240;

export default function BaseLayout() {

  const user = useContext(UserContext);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setAuth(event.target.checked);
  // };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    window.open('http://127.0.0.1:8001/empiar');
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography variant="h5" noWrap component="div">
            Sample Preparation Widget
          </Typography>
          <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Name: {user.name}</MenuItem>
                <MenuItem onClick={handleClose}>Email: {user.email}</MenuItem>
                <MenuItem onClick={handleClose}>Role: {user.role}</MenuItem>
                <MenuItem>
                  <Button variant="contained" onClick={handleLogout}>
                    Log Out
                  </Button>
                </MenuItem>
              </Menu>
            </div>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
        { user.role == 'annotator' ? 
          <List>
            {[
                { 'text': 'Published Entries', 'link': 'published', 'icon': <PublicIcon /> },
                { 'text': 'Annotation Entries', 'link': 'annotation', 'icon': <GradeIcon /> },
                { 'text': 'Entries For Release', 'link': 'annotate/release', 'icon': <GradeIcon /> },
                    ].map((item, index) => (
                      <ListItem disablePadding key={item.text}>
                        <MenuLink href={item.link}>
                          <ListItemButton>
                            <ListItemIcon>
                              {item.icon}
                            </ListItemIcon>
                            <ListItemText primary={item.text} />
                          </ListItemButton>
                        </MenuLink>
                      </ListItem>
                    ))}
          </List>:
          <List>
          {[
                { 'text': 'Published Entries', 'link': 'published', 'icon': <PublicIcon /> },
                { 'text': 'Template Entries', 'link': 'template', 'icon': <DriveFolderUploadIcon /> },
                { 'text': 'Build A Workflow', 'link': 'build/metadata/new', 'icon': <BuildIcon /> },
                { 'text': 'Saved Entries', 'link': 'saved', 'icon': <GradeIcon /> },
                { 'text': 'Approval Entries', 'link': 'approved', 'icon': <GradeIcon /> },
              ].map((item, index) => (
                <ListItem disablePadding key={item.text}>
                  <MenuLink href={item.link}>
                    <ListItemButton>
                      <ListItemIcon>
                        {item.icon}
                      </ListItemIcon>
                      <ListItemText primary={item.text} />
                    </ListItemButton>
                  </MenuLink>
                </ListItem>
              ))}
        </List>
                }
          <Divider />
          <List>
            {[
              // { 'text': 'Help', 'link': 'help', 'icon': <PrivacyTipIcon /> },
              { 'text': 'FAQ', 'link': 'faq', 'icon': <HelpIcon /> },
            ].map((item, index) => (
              <ListItem key={item.text} disablePadding>
                <MenuLink href={item.link}>
                  <ListItemButton>
                    <ListItemIcon>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText primary={item.text} />
                  </ListItemButton>
                </MenuLink>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }} style={{padding: '100px 10px'}}>
        <Outlet></Outlet>
      </Box>
    </Box>
  );
}