import React, { useState } from 'react';
import {
    Box,
    Typography,
    TextField,
    Button,
    Grid,
    IconButton,
    Paper,
    Divider,
    FormControlLabel,
    Checkbox,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Tooltip,
    Stack,
    Alert
} from '@mui/material';
import {
    Add as AddIcon,
    Delete as DeleteIcon,
    ExpandMore as ExpandMoreIcon,
    GetApp as DownloadIcon,
    PostAdd as FormIcon,
    PlaylistAdd as FieldIcon
} from '@mui/icons-material';

const FIELD_TYPES = [
    { value: 'string', label: 'String' },
    { value: 'number', label: 'Number' },
    { value: 'date', label: 'Date' },
    { value: 'datetime', label: 'DateTime' },
    { value: 'boolean', label: 'Boolean' },
    { value: 'select', label: 'Select (Dropdown)' },
    { value: 'text', label: 'Long Text' }
];

const INITIAL_FIELD = {
    display: '',
    name: '',
    type: 'string',
    required: false,
    unique: false,
    constraints: {}
};

const INITIAL_FORM = {
    display: '',
    tableName: '',
    fields: [{ ...INITIAL_FIELD }]
};

const INITIAL_MODULE = {
    name: '',
    key: '',
    forms: [{ ...INITIAL_FORM }]
};

const ModuleCreator = ({ onBack, onSave }) => {
    const [module, setModule] = useState(INITIAL_MODULE);

    const handleModuleChange = (field, value) => {
        setModule(prev => ({ ...prev, [field]: value }));
    };

    const addForm = () => {
        setModule(prev => ({
            ...prev,
            forms: [...prev.forms, { ...INITIAL_FORM, fields: [{ ...INITIAL_FIELD }] }]
        }));
    };

    const removeForm = (formIndex) => {
        setModule(prev => ({
            ...prev,
            forms: prev.forms.filter((_, i) => i !== formIndex)
        }));
    };

    const updateForm = (formIndex, field, value) => {
        setModule(prev => ({
            ...prev,
            forms: prev.forms.map((form, i) =>
                i === formIndex ? { ...form, [field]: value } : form
            )
        }));
    };

    const addField = (formIndex) => {
        setModule(prev => ({
            ...prev,
            forms: prev.forms.map((form, i) =>
                i === formIndex
                    ? { ...form, fields: [...form.fields, { ...INITIAL_FIELD }] }
                    : form
            )
        }));
    };

    const removeField = (formIndex, fieldIndex) => {
        setModule(prev => ({
            ...prev,
            forms: prev.forms.map((form, i) =>
                i === formIndex
                    ? { ...form, fields: form.fields.filter((_, j) => j !== fieldIndex) }
                    : form
            )
        }));
    };

    const updateField = (formIndex, fieldIndex, fieldData) => {
        setModule(prev => ({
            ...prev,
            forms: prev.forms.map((form, i) =>
                i === formIndex
                    ? {
                        ...form,
                        fields: form.fields.map((f, j) => j === fieldIndex ? { ...f, ...fieldData } : f)
                    }
                    : form
            )
        }));
    };

    const downloadJson = () => {
        // Validation (basic)
        if (!module.name || !module.key) {
            alert('Please provide a module name and key.');
            return;
        }

        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(module, null, 2));
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", `${module.key || 'module'}.json`);
        document.body.appendChild(downloadAnchorNode);
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    };

    const handleSave = () => {
        if (!module.name || !module.key) {
            alert('Please provide a module name and key.');
            return;
        }
        // Logic to "save" (e.g., dispatch action or notify parent)
        console.log("Saving module:", module);
        if (onSave) onSave(module);
    };

    return (
        <Box sx={{ maxWidth: 1200, mx: 'auto', p: 2 }}>
            <Paper elevation={3} sx={{ p: 4, borderRadius: 3, mb: 4 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Typography variant="h5" sx={{ fontWeight: 700, color: 'primary.main' }}>
                            Module Configuration Builder
                        </Typography>
                    </Box>
                    <Stack direction="row" spacing={2}>
                        <Button
                            variant="outlined"
                            startIcon={<DownloadIcon />}
                            onClick={downloadJson}
                            sx={{ borderRadius: 2 }}
                        >
                            Download JSON
                        </Button>
                        <Button
                            variant="contained"
                            onClick={handleSave}
                            sx={{ borderRadius: 2 }}
                        >
                            Save Configuration
                        </Button>
                    </Stack>
                </Stack>

                <Alert severity="info" sx={{ mb: 4 }}>
                    Define your module metadata, forms, and fields. When finished, download the configuration file to upload it later.
                </Alert>

                <Grid container spacing={3} sx={{ mb: 4 }}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Module Name"
                            placeholder="e.g. Patient Records Enhanced"
                            value={module.name}
                            onChange={(e) => handleModuleChange('name', e.target.value)}
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Module Key"
                            placeholder="e.g. patient_records_v2"
                            value={module.key}
                            onChange={(e) => handleModuleChange('key', e.target.value)}
                            variant="outlined"
                        />
                    </Grid>
                </Grid>

                <Divider sx={{ mb: 4 }} />

                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        Forms
                    </Typography>
                    <Button
                        variant="outlined"
                        startIcon={<FormIcon />}
                        onClick={addForm}
                        sx={{ borderRadius: 2 }}
                    >
                        Add Form
                    </Button>
                </Stack>

                {module.forms.map((form, formIndex) => (
                    <Accordion key={formIndex} defaultExpanded sx={{ mb: 2, border: '1px solid', borderColor: 'divider', borderRadius: '8px !important', '&:before': { display: 'none' } }}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Stack direction="row" spacing={2} alignItems="center" sx={{ width: '100%', pr: 2 }}>
                                <Typography sx={{ fontWeight: 600, flexGrow: 1 }}>
                                    {form.display || `Form ${formIndex + 1}`}
                                </Typography>
                                {module.forms.length > 1 && (
                                    <IconButton size="small" color="error" onClick={(e) => { e.stopPropagation(); removeForm(formIndex); }}>
                                        <DeleteIcon fontSize="small" />
                                    </IconButton>
                                )}
                            </Stack>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid container spacing={2} sx={{ mb: 3 }}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="Form Display Name"
                                        value={form.display}
                                        onChange={(e) => updateForm(formIndex, 'display', e.target.value)}
                                        size="small"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="Table Name"
                                        value={form.tableName}
                                        onChange={(e) => updateForm(formIndex, 'tableName', e.target.value)}
                                        size="small"
                                    />
                                </Grid>
                            </Grid>

                            <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
                                Fields
                            </Typography>

                            <Stack spacing={2}>
                                {form.fields.map((field, fieldIndex) => (
                                    <Paper key={fieldIndex} variant="outlined" sx={{ p: 2, bgcolor: 'grey.50' }}>
                                        <Grid container spacing={2} alignItems="center">
                                            <Grid item xs={12} sm={3}>
                                                <TextField
                                                    fullWidth
                                                    label="Label"
                                                    value={field.display}
                                                    onChange={(e) => updateField(formIndex, fieldIndex, { display: e.target.value })}
                                                    size="small"
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={3}>
                                                <TextField
                                                    fullWidth
                                                    label="Name/Key"
                                                    value={field.name}
                                                    onChange={(e) => updateField(formIndex, fieldIndex, { name: e.target.value })}
                                                    size="small"
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={2}>
                                                <FormControl fullWidth size="small">
                                                    <InputLabel>Type</InputLabel>
                                                    <Select
                                                        value={field.type}
                                                        label="Type"
                                                        onChange={(e) => updateField(formIndex, fieldIndex, { type: e.target.value })}
                                                    >
                                                        {FIELD_TYPES.map(t => (
                                                            <MenuItem key={t.value} value={t.value}>{t.label}</MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={6} sm={1.5}>
                                                <FormControlLabel
                                                    control={<Checkbox size="small" checked={field.required} onChange={(e) => updateField(formIndex, fieldIndex, { required: e.target.checked })} />}
                                                    label="Req"
                                                />
                                            </Grid>
                                            <Grid item xs={6} sm={1.5}>
                                                <FormControlLabel
                                                    control={<Checkbox size="small" checked={field.unique} onChange={(e) => updateField(formIndex, fieldIndex, { unique: e.target.checked })} />}
                                                    label="Uniq"
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={1} textAlign="right">
                                                {form.fields.length > 1 && (
                                                    <IconButton color="error" size="small" onClick={() => removeField(formIndex, fieldIndex)}>
                                                        <DeleteIcon />
                                                    </IconButton>
                                                )}
                                            </Grid>

                                            {/* Type Specific Constraints */}
                                            {field.type === 'select' && (
                                                <Grid item xs={12}>
                                                    <TextField
                                                        fullWidth
                                                        label="Options (comma separated)"
                                                        placeholder="Option 1, Option 2, Option 3"
                                                        size="small"
                                                        value={field.constraints?.options?.join(', ') || ''}
                                                        onChange={(e) => updateField(formIndex, fieldIndex, {
                                                            constraints: {
                                                                ...field.constraints,
                                                                options: e.target.value.split(',').map(o => o.trim()).filter(o => o)
                                                            }
                                                        })}
                                                    />
                                                </Grid>
                                            )}
                                            {(field.type === 'string' || field.type === 'text') && (
                                                <>
                                                    <Grid item xs={6} sm={2}>
                                                        <TextField
                                                            fullWidth
                                                            label="Min Length"
                                                            type="number"
                                                            size="small"
                                                            value={field.constraints?.minLength || ''}
                                                            onChange={(e) => updateField(formIndex, fieldIndex, {
                                                                constraints: { ...field.constraints, minLength: e.target.value ? parseInt(e.target.value) : undefined }
                                                            })}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={6} sm={2}>
                                                        <TextField
                                                            fullWidth
                                                            label="Max Length"
                                                            type="number"
                                                            size="small"
                                                            value={field.constraints?.maxLength || ''}
                                                            onChange={(e) => updateField(formIndex, fieldIndex, {
                                                                constraints: { ...field.constraints, maxLength: e.target.value ? parseInt(e.target.value) : undefined }
                                                            })}
                                                        />
                                                    </Grid>
                                                </>
                                            )}
                                        </Grid>
                                    </Paper>
                                ))}
                                <Button
                                    variant="text"
                                    startIcon={<FieldIcon />}
                                    onClick={() => addField(formIndex)}
                                    size="small"
                                >
                                    Add Field
                                </Button>
                            </Stack>
                        </AccordionDetails>
                    </Accordion>
                ))}
            </Paper>
        </Box>
    );
};

export default ModuleCreator;
