import * as React from 'react';
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
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Builder from '../components/Builder';
import { Link, NavLink, Outlet, Route, RouterProvider, Routes, createBrowserRouter, createRoutesFromElements, useNavigate } from 'react-router-dom';
import PublishedWorkFlow from '../pages/PublishedWorkFlows';
import Saved from '../pages/SavedWorkFlows';
import Template from '../pages/TemplateWorkFlows';
import LoadBuilder from '../pages/LoadBuilder';
import BuildWorkFlow from '../pages/BuildWorkFlow';
import Home from '../pages/Home';
import ViewWorkFlow from '../pages/ViewWorkFlow';
import PublicIcon from '@mui/icons-material/Public';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import GradeIcon from '@mui/icons-material/Grade';
import BuildIcon from '@mui/icons-material/Build';
import PrivacyTipIcon from '@mui/icons-material/PrivacyTip';
import HelpIcon from '@mui/icons-material/Help';
import MenuLink from '../components/MenuLink';
import Container from '@mui/material/Container';

export default function BuildLayout() {

    return (
        <>
            <Container fixed style={{padding: '100px 10px'}}>
                <Box component="main" >
                    <Outlet />
                </Box>
            </Container>
        </>

    );
}