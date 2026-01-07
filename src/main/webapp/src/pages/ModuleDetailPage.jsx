import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Button,
  CircularProgress,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import api from "../setting/interceptor";
import FormDataDialog from "../components/FormDataDialog";
import { snakeToTitleCase } from "../util/ReusableFunctions";

const ModuleDetailPage = () => {
  const location = useLocation();
  const module = location.state;

  console.log("module: ", module);
  

  const [forms, setForms] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(true);
  const [formDataMap, setFormDataMap] = useState({});
  const [selectedForm, setSelectedForm] = useState(null);
  const [loadingTable, setLoadingTable] = useState(false);

  // Fetch forms for the module
  useEffect(() => {
    if (!module) return;

    const fetchForms = async () => {
      try {
        const response = await api.get(`/api/forms/module/${module.id}`);
        const fetchedForms = response.data;
        setForms(fetchedForms);

        // Immediately load data for the first form (active tab)
        if (fetchedForms.length > 0) {
          await fetchFormData(fetchedForms[0]);
        }
      } catch (error) {
        console.error("Error fetching forms:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchForms();
  }, [module]);

  // Function to fetch form data (lazy loading)
  const fetchFormData = async (form) => {
    if (!form || formDataMap[form.id]) return; // Already loaded

    setLoadingTable(true);
    try {
      const response = await api.get(`/api/forms/${form.tableName}/data`);
      setFormDataMap((prev) => ({
        ...prev,
        [form.id]: response.data || [],
      }));
    } catch (error) {
      console.error("Error fetching data for form:", form.name, error);
    } finally {
      setLoadingTable(false);
    }
  };

  const handleAddData = (form) => setSelectedForm(form);
  const handleDialogClose = () => setSelectedForm(null);

  const handleTabChange = async (event, newValue) => {
    setActiveTab(newValue);
    const form = forms[newValue];
    await fetchFormData(form); // Fetch data when switching to tab
  };

  if (!module) {
    return (
      <Typography variant="h6" sx={{ p: 3 }}>
        No module selected.
      </Typography>
    );
  }  

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        paddingTop: 6,
        boxSizing: "border-box",
      }}
    >
      {/* Header */}
      <Typography variant="h5" gutterBottom>
        {module.name}
      </Typography>

      {loading ? (
        <Box sx={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
          <CircularProgress />
        </Box>
      ) : forms.length === 0 ? (
        <Typography>No forms found for this module.</Typography>
      ) : (
        <Box sx={{ width: "100%" }}>
          {/* Tabs */}
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            sx={{ borderBottom: 1, borderColor: "divider", mb: 1 }}
          >
            {forms.map((form) => (
              <Tab key={form.id} label={form.display} />
            ))}
          </Tabs>

          {/* Tab content area */}
          <Box sx={{ flex: 1, overflow: "auto", mt: 2 }}>
            {forms.map((form, index) => (
              <Box
                key={form.id}
                sx={{
                  display: activeTab === index ? "flex" : "none",
                  flexDirection: "column",
                  height: "100%",
                }}
              >
                {/* Add Button */}
                <Box sx={{ display: "flex", justifyContent: "flex-end", m: 4 }}>
                  <Button variant="contained" onClick={() => handleAddData(form)}>
                    Add Data
                  </Button>
                </Box>

                {/* Table */}
                <Paper sx={{ flex: 1, overflow: "auto", p: 2 }}>
                  {loadingTable && activeTab === index ? (
                    <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
                      <CircularProgress size={24} />
                    </Box>
                  ) : formDataMap[form.id] && formDataMap[form.id].length > 0 ? (
                    <Table stickyHeader>
                      <TableHead>
                        <TableRow>
                          {Object.keys(formDataMap[form.id][0]).map((each) => snakeToTitleCase(each)).map((key) => (
                            <TableCell key={key}>{key}</TableCell>
                          ))}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {formDataMap[form.id].map((row, i) => (
                          <TableRow key={i}>
                            {Object.values(row).map((val, j) => (
                              <TableCell key={j}>{String(val)}</TableCell>
                            ))}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  ) : (
                    <Typography>No data entered yet for this form.</Typography>
                  )}
                </Paper>
              </Box>
            ))}
          </Box>
        </Box>
      )}

      {/* Dialog */}
      {selectedForm && (
        <FormDataDialog
          open={true}
          onClose={handleDialogClose}
          form={selectedForm}
        />
      )}
    </Box>
  );
};

export default ModuleDetailPage;
