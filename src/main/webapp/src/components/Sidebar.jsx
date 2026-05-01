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
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import AppsIcon from '@mui/icons-material/Apps';
import DashboardIcon from '@mui/icons-material/Dashboard';

import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/slices/authSlice';
import { fetchModules } from '../store/slices/modulesSlice';
import APPLICATION_ROUTES from '../util/APPLICATION_ROUTES';
import useCustomNavigate from '../hooks/useCustomNavigate';
import logo from '../assets/logo.svg';

const drawerWidth = 300;
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
  const { breadcrumbs } = useSelector((state) => state.ui);
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
          boxShadow: 1,
          transition: 'all 0.3s',
        }}
      >
        <Toolbar sx={{ flexDirection: 'column', alignItems: 'flex-start', py: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
            <IconButton
              color="inherit"
              edge="start"
              onClick={toggleDrawer}
              sx={{ mr: 2 }}
            >
              {open ? <ChevronLeftIcon /> : <MenuIcon />}
            </IconButton>

            <Typography variant="h6" noWrap sx={{ fontWeight: 700 }}>
              Saving Lives with Data-Driven Insights - CormaFlo Dashboard
            </Typography>
          </Box>

          <Box sx={{ ml: 7, mt: -0.5 }}>
            <Breadcrumbs
              separator={<NavigateNextIcon fontSize="small" />}
              aria-label="breadcrumb"
              sx={{ '& .MuiBreadcrumbs-separator': { mx: 0.5, color: 'white' } }}
            >
              {breadcrumbs.map((crumb, index) => {
                const isLast = index === breadcrumbs.length - 1;
                return isLast ? (
                  <Typography
                    key={index}
                    variant="caption"
                    color="white"
                    sx={{ fontWeight: 500, fontSize: '0.85rem' }}
                  >
                    {crumb.label}
                  </Typography>
                ) : (
                  <Link
                    key={index}
                    underline="hover"
                    color="white"
                    onClick={() => crumb.path && navigate(crumb.path)}
                    sx={{
                      cursor: 'pointer',
                      fontSize: '0.85rem',
                      '&:hover': { color: 'text.primary' }
                    }}
                  >
                    {crumb.label}
                  </Link>
                );
              })}
            </Breadcrumbs>
          </Box>
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
            cursor: 'pointer'
          }}
          onClick={() => navigate(APPLICATION_ROUTES.DASHBOARD)}
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
          {/* Dashboard */}
          <ListItem disablePadding>
            <Tooltip title={!open ? 'Dashboard' : ''} placement="right">
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
                  <DashboardIcon />
                </ListItemIcon>
                {open && <ListItemText primary="Dashboard" />}
              </ListItemButton>
            </Tooltip>
          </ListItem>

          {/* Modules */}
          {modules.filter(m => m.active).map((module, index) => (
            <ListItem key={module.id} disablePadding>
              <Tooltip
                title={!open ? module.name : ''}
                placement="right"
              >
                <ListItemButton
                  onClick={() =>
                    navigate(`${APPLICATION_ROUTES.MODULE_DETAIL}`, {
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

          {/* Administration */}
          <ListItem disablePadding>
            <Tooltip title={!open ? 'Administration' : ''} placement="right">
              <ListItemButton
                onClick={() =>
                  navigate(APPLICATION_ROUTES.ADMINISTRATION)
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
                  <AdminPanelSettingsIcon />
                </ListItemIcon>
                {open && <ListItemText primary="Administration" />}
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