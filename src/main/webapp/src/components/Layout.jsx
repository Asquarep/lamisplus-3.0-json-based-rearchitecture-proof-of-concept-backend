import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { Box } from "@mui/material";

function Layout() {
  return (
    <Box style={{ display: "flex", width: "98vw", height: "100vh" }}>
      <Sidebar />
      <Box sx={{ width: "100%", flex: 1, padding: 4 }}>
        <Outlet />
      </Box>
    </Box>
  );
}

export default Layout;
