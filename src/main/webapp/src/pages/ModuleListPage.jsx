import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Divider,
} from "@mui/material";
import {
  MoreVert as MoreVertIcon,
  Update as UpdateIcon,
  Delete as DeleteIcon,
  PowerSettingsNew as PowerIcon,
  CloudUpload as UploadIcon,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchModules,
  activateModule,
  deactivateModule,
  uninstallModule,
  checkModuleUpdates,
} from "../store/slices/modulesSlice";

import ModuleUploadModal from "../components/ModuleUploadModal";

const ModuleListPage = () => {
  // const [modules, setModules] = useState([]);
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedModule, setSelectedModule] = useState(null);

  const dispatch = useDispatch();
  const { list: modules, loading } = useSelector(state => state.modules);

  useEffect(() => {
  // dispatch(fetchModules());
}, [dispatch]);

  const handleMenuOpen = (event, module) => {
    setAnchorEl(event.currentTarget);
    setSelectedModule(module);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedModule(null);
  };

  // const handleAction = async (action) => {
  //   if (!selectedModule) return;
  //   try {
  //     switch (action) {
  //       case "activate":
  //         await api.post(`/api/modules/${selectedModule.id}/activate`);
  //         break;
  //       case "deactivate":
  //         await api.post(`/api/modules/${selectedModule.id}/deactivate`);
  //         break;
  //       case "uninstall":
  //         await api.delete(`/api/modules/${selectedModule.id}`);
  //         break;
  //       case "update":
  //         await api.post(`/api/modules/${selectedModule.id}/check-updates`);
  //         break;
  //       default:
  //         break;
  //     }
  //     fetchModules();
  //   } catch (err) {
  //     console.error(err);
  //   } finally {
  //     handleMenuClose();
  //   }
  // };

  const handleAction = async (action) => {
  if (!selectedModule) return;

  switch (action) {
    case "activate":
      dispatch(activateModule(selectedModule.id));
      break;
    case "deactivate":
      dispatch(deactivateModule(selectedModule.id));
      break;
    case "uninstall":
      dispatch(uninstallModule(selectedModule.id));
      break;
    case "update":
      dispatch(checkModuleUpdates(selectedModule.id));
      break;
    default:
      break;
  }

  handleMenuClose();
};

  return (
    <Box sx={{ p: 3 }}>
      <br /><br />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          Installed Modules
        </Typography>
        <Button
          variant="contained"
          startIcon={<UploadIcon />}
          onClick={() => setOpen(true)}
        >
          Upload Module
        </Button>
      </Box>

      {modules.length > 0 ? <Grid container spacing={3}>
        {modules.map((m) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={m.id}>
            <Card
              sx={{
                cursor: "pointer",
                transition: "transform 0.2s ease",
                "&:hover": { transform: "scale(1.02)" },
              }}
              // onClick={() => onSelectModule(m)}
            >
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {m.name}
                  </Typography>
                  <IconButton
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleMenuOpen(e, m);
                    }}
                  >
                    <MoreVertIcon />
                  </IconButton>
                </Box>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 1, mb: 2 }}
                >
                  {m.description || "This module adds extended functionality."}
                </Typography>

                <Divider sx={{ mb: 1 }} />
                <Typography variant="body2" sx={{ mb: 0.5 }}>
                  <strong>Version:</strong> {m.version || "1.0.0"}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Installed: {"3 minutes ago"}
                  {/* {new Date(m.installedAt || m.createdAt).toLocaleDateString()} */}
                </Typography>
              </CardContent>

              <CardActions disableSpacing>
                <Tooltip title="Activate/Deactivate">
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAction(m.active ? "deactivate" : "activate");
                    }}
                  >
                    <PowerIcon
                      color={m.active ? "success" : "disabled"}
                      fontSize="small"
                    />
                  </IconButton>
                </Tooltip>

                <Tooltip title="Check for Updates">
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAction("update");
                    }}
                  >
                    <UpdateIcon fontSize="small" />
                  </IconButton>
                </Tooltip>

                <Tooltip title="Uninstall Module">
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAction("uninstall");
                    }}
                  >
                    <DeleteIcon fontSize="small" color="error" />
                  </IconButton>
                </Tooltip>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid> : (
        <Typography>No modules installed. Upload a module to get started.</Typography>
      )}

      {/* Action menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => handleAction("activate")}>Activate</MenuItem>
        <MenuItem onClick={() => handleAction("deactivate")}>
          Deactivate
        </MenuItem>
        <MenuItem onClick={() => handleAction("update")}>Check Updates</MenuItem>
        <MenuItem onClick={() => handleAction("uninstall")}>
          Uninstall
        </MenuItem>
      </Menu>

      <ModuleUploadModal
        open={open}
        onClose={() => setOpen(false)}
        onUploaded={fetchModules}
      />
    </Box>
  );
};

export default ModuleListPage;
