import React, { useState, useCallback, useRef } from 'react';
import ReactFlow, {
    addEdge,
    Background,
    Controls,
    MiniMap,
    useNodesState,
    useEdgesState,
    Panel
} from 'reactflow';
import 'reactflow/dist/style.css';

import {
    Box,
    Typography,
    Button,
    Paper,
    Divider,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Chip,
    TextField,
    IconButton,
    Tooltip
} from '@mui/material';
import {
    Save as SaveIcon,
    Cancel as CancelIcon,
    Add as AddIcon,
    FlashOn as TriggerIcon,
    PlayArrow as ActionIcon,
    Delete as DeleteIcon,
    InfoOutlined as InfoIcon
} from '@mui/icons-material';

const initialNodes = [];
const initialEdges = [];

let id = 0;
const getId = () => `node_${id++}`;

const WorkflowEditor = ({ onBack }) => {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const [workflowName, setWorkflowName] = useState('');
    const reactFlowWrapper = useRef(null);

    const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

    const addNode = (type, label) => {
        const newNode = {
            id: getId(),
            type: 'default',
            position: { x: Math.random() * 400, y: Math.random() * 400 },
            data: {
                label: (
                    <Box sx={{ p: 1, minWidth: 150 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                            {type === 'trigger' ? <TriggerIcon fontSize="small" color="warning" /> : <ActionIcon fontSize="small" color="primary" />}
                            <Typography variant="caption" sx={{ fontWeight: 700, textTransform: 'uppercase' }}>
                                {type}
                            </Typography>
                        </Box>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>{label}</Typography>
                        <Divider sx={{ my: 0.5 }} />
                        <Typography variant="caption" color="text.secondary">ID: {id - 1}</Typography>
                    </Box>
                ), originalType: type, originalLabel: label
            },
            style: {
                borderRadius: '8px',
                border: '1px solid #ddd',
                background: '#fff',
                padding: '0'
            }
        };
        setNodes((nds) => nds.concat(newNode));
    };

    const handleSave = () => {
        const flowObject = {
            name: workflowName,
            nodes,
            edges,
            viewport: { x: 0, y: 0, zoom: 1 } // Simplified for logging
        };

        console.log('--- WORKFLOW OBJECT SAVE ---');
        // console.log(JSON.stringify(flowObject, null, 2));
        console.log('Full State:', flowObject);
        // alert('Workflow saved to console! Check your browser dev tools.');
    };

    const nodeTypesList = [
        { type: 'trigger', label: 'Form Submission', icon: <TriggerIcon color="warning" /> },
        { type: 'trigger', label: 'Threshold Breach', icon: <TriggerIcon color="warning" /> },
        { type: 'trigger', label: 'Schedule (Cron)', icon: <TriggerIcon color="warning" /> },
        { type: 'action', label: 'Send SMS', icon: <ActionIcon color="primary" /> },
        { type: 'action', label: 'Email Provider', icon: <ActionIcon color="primary" /> },
        { type: 'action', label: 'REST API Call', icon: <ActionIcon color="primary" /> },
    ];

    return (
        <Box sx={{ height: '75vh', display: 'flex', flexDirection: 'column' }}>
            {/* Header */}
            <Paper sx={{ p: 2, mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderRadius: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexGrow: 1 }}>
                    <TextField
                        size="small"
                        label="Workflow Name"
                        value={workflowName}
                        onChange={(e) => setWorkflowName(e.target.value)}
                        placeholder="e.g. Critical Pulse Alert"
                        sx={{ width: 300 }}
                    />
                </Box>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button
                        variant="outlined"
                        startIcon={<CancelIcon />}
                        onClick={onBack}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        startIcon={<SaveIcon />}
                        onClick={handleSave}
                        color="success"
                    >
                        Save Workflow
                    </Button>
                </Box>
            </Paper>

            {/* Workflow Area */}
            <Box sx={{ flexGrow: 1, display: 'flex', gap: 2 }}>
                {/* Sidebar Nodes Panel */}
                <Paper sx={{ width: 260, borderRadius: 2, border: '1px solid', borderColor: 'divider', overflowY: 'auto' }}>
                    <Box sx={{ p: 2, bgcolor: 'action.hover' }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: 1 }}>
                            <AddIcon fontSize="small" /> Available Nodes
                        </Typography>
                    </Box>
                    <List dense>
                        <Divider />
                        <Box sx={{ px: 2, pt: 1 }}>
                            <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.secondary', textTransform: 'uppercase' }}>
                                Triggers
                            </Typography>
                        </Box>
                        {nodeTypesList.filter(n => n.type === 'trigger').map((item, idx) => (
                            <ListItem key={idx} disablePadding>
                                <ListItemButton onClick={() => addNode(item.type, item.label)}>
                                    <ListItemIcon sx={{ minWidth: 36 }}>{item.icon}</ListItemIcon>
                                    <ListItemText primary={item.label} primaryTypographyProps={{ variant: 'body2' }} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                        <Divider sx={{ my: 1 }} />
                        <Box sx={{ px: 2 }}>
                            <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.secondary', textTransform: 'uppercase' }}>
                                Actions
                            </Typography>
                        </Box>
                        {nodeTypesList.filter(n => n.type === 'action').map((item, idx) => (
                            <ListItem key={idx} disablePadding>
                                <ListItemButton onClick={() => addNode(item.type, item.label)}>
                                    <ListItemIcon sx={{ minWidth: 36 }}>{item.icon}</ListItemIcon>
                                    <ListItemText primary={item.label} primaryTypographyProps={{ variant: 'body2' }} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Paper>

                {/* React Flow Canvas */}
                <Paper ref={reactFlowWrapper} sx={{ flexGrow: 1, borderRadius: 2, border: '1px solid', borderColor: 'divider', overflow: 'hidden', position: 'relative' }}>
                    <ReactFlow
                        nodes={nodes}
                        edges={edges}
                        onNodesChange={onNodesChange}
                        onEdgesChange={onEdgesChange}
                        onConnect={onConnect}
                        fitView
                    >
                        <Background variant="dots" gap={12} size={1} />
                        <Controls />
                        <MiniMap
                            nodeStrokeColor={(n) => {
                                if (n.data.originalType === 'trigger') return '#ff9800';
                                if (n.data.originalType === 'action') return '#2196f3';
                                return '#eee';
                            }}
                            nodeColor={(n) => {
                                if (n.data.originalType === 'trigger') return '#fff9f0';
                                if (n.data.originalType === 'action') return '#f0f7ff';
                                return '#fff';
                            }}
                        />
                        <Panel position="top-right">
                            <Paper sx={{ p: 1, display: 'flex', alignItems: 'center', gap: 1, bgcolor: 'rgba(255,255,255,0.8)' }}>
                                <InfoIcon color="action" fontSize="small" />
                                <Typography variant="caption" sx={{ fontWeight: 500 }}>
                                    Drag dots to connect nodes. Delete key removes selection.
                                </Typography>
                            </Paper>
                        </Panel>
                    </ReactFlow>
                </Paper>
            </Box>
        </Box>
    );
};

export default WorkflowEditor;
