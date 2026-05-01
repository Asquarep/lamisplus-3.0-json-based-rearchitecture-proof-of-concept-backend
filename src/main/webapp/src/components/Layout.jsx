import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { Box } from "@mui/material";

function Layout() {
  return (
    <Box style={{ display: "flex", width: "98vw", height: "100vh", backgroundColor: "#f9f9f9" }}>
      <Sidebar />
      <Box sx={{ width: "100%", flex: 1, padding: 6, mt: 10, overflowY: 'auto' }}>
        <Outlet />
      </Box>
    </Box>
  );
}

export default Layout;
