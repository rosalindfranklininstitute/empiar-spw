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



const drawerWidth = 240;

export default function BaseLayout() {

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h5" noWrap component="div">
            Sample Preparation Widget
          </Typography>
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
          <List>
            {[
              { 'text': 'Published Entries', 'link': 'published', 'icon': <PublicIcon /> },
              { 'text': 'Template Entries', 'link': 'template', 'icon': <DriveFolderUploadIcon /> },
              { 'text': 'Saved Entries', 'link': 'saved', 'icon': <GradeIcon /> },
              { 'text': 'Build A Workflow', 'link': 'build/new', 'icon': <BuildIcon /> },
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
          <Divider />
          <List>
            {[
              { 'text': 'Help', 'link': 'help', 'icon': <PrivacyTipIcon /> },
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