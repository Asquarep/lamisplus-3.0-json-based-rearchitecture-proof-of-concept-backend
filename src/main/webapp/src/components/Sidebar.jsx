import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Tooltip from '@mui/material/Tooltip';

import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';

import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/slices/authSlice';
import { fetchModules } from '../store/slices/modulesSlice';
import APPLICATION_ROUTES from '../util/APPLICATION_ROUTES';
import useCustomNavigate from '../hooks/useCustomNavigate';
import logo from '../assets/logo.svg';

const drawerWidth = 260;
const collapsedWidth = 70;

/* ---------------- Drawer Styling ---------------- */

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  width: collapsedWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
});

const StyledDrawer = styled(Drawer)(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

/* ---------------- Component ---------------- */

export default function Sidebar() {
  const [open, setOpen] = React.useState(true);
  const { list: modules = [] } = useSelector((state) => state.modules);
  const dispatch = useDispatch();
  const navigate = useCustomNavigate();

  React.useEffect(() => {
    dispatch(fetchModules());
  }, [dispatch]);

  const logoutUser = () => {
    dispatch(logout());
    navigate(APPLICATION_ROUTES.LOGIN, { replace: true });
  };

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      {/* ---------------- AppBar ---------------- */}
      <AppBar
        position="fixed"
        sx={{
          width: `calc(100% - ${open ? drawerWidth : collapsedWidth}px)`,
          ml: `${open ? drawerWidth : collapsedWidth}px`,
          transition: 'all 0.3s',
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={toggleDrawer}
            sx={{ mr: 2 }}
          >
            {open ? <ChevronLeftIcon /> : <MenuIcon />}
          </IconButton>

          <Typography variant="h6" noWrap>
            Deda Hospital
          </Typography>
        </Toolbar>
      </AppBar>

      {/* ---------------- Drawer ---------------- */}
      <StyledDrawer variant="permanent" open={open}>
        {/* Logo Section */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: open ? 'flex-start' : 'center',
            gap: 1,
            p: 2,
            height: 64,
          }}
        >
          <img
            src={logo}
            alt="Logo"
            style={{ width: 36, height: 36 }}
          />
          {open && (
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              CormaFlo
            </Typography>
          )}
        </Box>

        <Divider />

        <List>
          {/* Home */}
          <ListItem disablePadding>
            <Tooltip title={!open ? 'Home' : ''} placement="right">
              <ListItemButton
                onClick={() =>
                  navigate(APPLICATION_ROUTES.DASHBOARD)
                }
                sx={{
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 2 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <HomeIcon />
                </ListItemIcon>
                {open && <ListItemText primary="Home" />}
              </ListItemButton>
            </Tooltip>
          </ListItem>

          {/* Modules */}
          {modules.map((module, index) => (
            <ListItem key={module.id} disablePadding>
              <Tooltip
                title={!open ? module.name : ''}
                placement="right"
              >
                <ListItemButton
                  onClick={() =>
                    navigate(APPLICATION_ROUTES.MODULE_DETAIL, {
                      state: module,
                    })
                  }
                  sx={{
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 2 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    {index % 2 === 0 ? (
                      <InboxIcon />
                    ) : (
                      <MailIcon />
                    )}
                  </ListItemIcon>
                  {open && (
                    <ListItemText primary={module.name} />
                  )}
                </ListItemButton>
              </Tooltip>
            </ListItem>
          ))}

          {/* Settings */}
          <ListItem disablePadding>
            <Tooltip title={!open ? 'Settings' : ''} placement="right">
              <ListItemButton
                onClick={() =>
                  navigate(APPLICATION_ROUTES.SETTINGS)
                }
                sx={{
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 2 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <SettingsIcon />
                </ListItemIcon>
                {open && <ListItemText primary="Settings" />}
              </ListItemButton>
            </Tooltip>
          </ListItem>

          {/* Logout */}
          <ListItem disablePadding>
            <Tooltip title={!open ? 'Logout' : ''} placement="right">
              <ListItemButton
                onClick={logoutUser}
                sx={{
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 2 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <LogoutIcon />
                </ListItemIcon>
                {open && <ListItemText primary="Logout" />}
              </ListItemButton>
            </Tooltip>
          </ListItem>
        </List>
      </StyledDrawer>
    </Box>
  );
}