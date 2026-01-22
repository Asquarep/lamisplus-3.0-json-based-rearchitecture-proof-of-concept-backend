import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
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
import { Close, Home } from '@mui/icons-material';
import { replace, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.svg';
import { logout } from '../store/slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { fetchModules } from '../store/slices/modulesSlice';
import APPLICATION_ROUTES from '../util/APPLICATION_ROUTES';

const drawerWidth = 280;

export default function Sidebar() {
  const { list: modules, loading } = useSelector(state => state.modules);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutUser = () => {
    dispatch(logout());
    navigate(APPLICATION_ROUTES.LOGIN, { replace: true });
  };

  React.useEffect(() => {
    dispatch(fetchModules());
  }, [dispatch]);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: `calc(100% - ${drawerWidth}px)`,
          ml: `${drawerWidth}px`,
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Deda Hospital
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        {/* ✅ Logo and Title Section */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            p: 2,
            height: 64,
            borderBottom: '1px solid #e0e0e0',
          }}
        >
          <img
            src={logo}
            alt="LAMISPlus Logo"
            style={{
              width: 36,
              height: 36,
              borderRadius: 8,
              objectFit: 'contain',
            }}
          />
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            CormaFlo
          </Typography>
        </Box>

        <Divider />

        <List>
          <ListItem key={'home'} disablePadding onClick={() => navigate(`/dashboard`)}>
            <ListItemButton>
              <ListItemIcon>
                <Home />
              </ListItemIcon>
              <ListItemText primary={'Home'} />
            </ListItemButton>
          </ListItem>

          {modules.map((eachModule, index) => (
            <ListItem
              key={eachModule.id}
              disablePadding
              onClick={() => navigate(`/module`, { state: eachModule })}
            >
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={eachModule.name} />
              </ListItemButton>
            </ListItem>
          ))}

          <ListItem key={'logout'} disablePadding onClick={() => logoutUser()}>
            <ListItemButton>
              <ListItemIcon>
                <Close />
              </ListItemIcon>
              <ListItemText primary={'Logout'} />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
}
