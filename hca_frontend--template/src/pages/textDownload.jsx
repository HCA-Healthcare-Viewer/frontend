import React from 'react';
import Navbar from '../components/Navbar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { DataGrid } from '@mui/x-data-grid';
import { makeStyles } from '@mui/styles';

// Custom row/cell Color
const useStyles = makeStyles({
    root: {
        // CheckBox
        '& .MuiDataGrid-columnHeaderCheckbox': {
            backgroundColor: '#0000FF',                 // Column Header Checkbox Background Color (Blue)
        },
        '& .MuiDataGrid-cellCheckbox': {
            backgroundColor: '#FFA500',                 // Cell Checkbox Background Color (Orange)
        },
        '& .MuiCheckbox-root.Mui-checked': {
            color: '#FFFF00 !important',                // Clicked Checkbox Color (Yellow)
        },

        // Header Columns:
        '& .custom-header': {
            backgroundColor: '#FF0000',                 // Header Background Color (Red)
            color: '#FFFFFF',                           // Header Text Color (White)
        },

        // Data Grid Cells:
        '& .MuiDataGrid-cell[data-field="id"]': {
            backgroundColor: '#AAAAAA',                 // ID Column Background Color (Gray)
            color: '#000000',                           // ID Column Text Color (Black)
        },
        '& .message-id-cell': {
            backgroundColor: '#FFFF00',                 // Message Control ID Cell Background Color (Yellow)
            color: '#AAAAAA',                           // Message Control ID Cell Text Color (Gray)
        },
        '& .mrn-cell': {
            backgroundColor: '#008000',                 // Medical Record Number Cell Background Color (Green)
            color: '#0000FF',                           // Medical Record Number Cell Text Color (Blue)
        },
        '& .last-name-cell': {
            backgroundColor: '#FFA500',                 // Last Name Cell Background Color (Orange)
            color: '#000000',                           // Last Name Cell Text Color (White)
        },

        // Sort Arrow Icon:
        '& .MuiDataGrid-sortIcon': {
            color: '#000000',                           // Sort (Arrow) Icon Color (Black)
        },

        // Menu Icon (Triple Dot):
        '& .MuiDataGrid-menuIconButton': {
            color: '#000000',                           // Menu Icon Color (Black)
        },

        // After Clicking the Checkbox (## Rows Selected):
        '& .MuiDataGrid-selectedRowCount': {
            color: '#00FFFF',                           // Selected Row Count Color (Cyan)
        },

        // Pagination (# - ## of ##):
        '& .MuiTablePagination-displayedRows': {
            color: '#FF69B4',                           // Pagination Text Color (Pink)
        },
        // Pagination Arrows (< >):
        '& .MuiTablePagination-actions button': {
            color: '#00FF00',                           // Pagination Arrow Color (Green)
        },
        '& .MuiDataGrid-footerContainer': {
            backgroundColor: '#AAAAAA',                 // DataGrid Footer Background Color (Gray)
},
    },

    // Header CSS Styles (MATERIAL UI)
    header: {
        padding: '1rem',
        height: '8vh',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#27262c',
        color: '#eaeaea',
        borderRadius: '0 0 10px 10px',
        marginBottom: '25px',
        boxShadow: '0 0 12px rgba(173, 214, 255, 0.6)',
        transition: 'box-shadow 0.3s ease',
    },
    wrapper: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        ['@media (max-width:600px)']: {
            flexDirection: 'column',
        },
    },
    sidebar: {
        width: '13%',
        minWidth: '180px',
        height: 'auto',
        marginRight: '5px',
        marginBottom: '5px',
        padding: '5px',
        backgroundColor: '#27262c',
        color: '#eaeaea',
        borderRadius: '5px',
        boxShadow: '0 0 8px rgba(173, 214, 255, 0.2)',
        transition: 'box-shadow 0.3s ease',
        ['@media (max-width:600px)']: {
            width: '100%',
            marginRight: 0,
        },
    },
});

// Columns Header DataGrid (ID, Message Control ID, Medical Record Number, Last Name)
const columns = [
    {
        field: 'id',
        headerName: 'ID',
        flex: 0.3,
        minWidth: 70,
        headerClassName: 'custom-header',
    },
    {
        field: 'messageControlId',
        headerName: 'Message Control ID',
        flex: 1,
        minWidth: 250,
        headerClassName: 'custom-header',
        cellClassName: 'message-id-cell',
    },
    {
        field: 'medicalRecordNumber',
        headerName: 'Medical Record Number',
        flex: 1,
        minWidth: 250,
        headerClassName: 'custom-header',
        cellClassName: 'mrn-cell',
    },
    {
        field: 'lastName',
        headerName: 'Last Name',
        flex: 0.7,
        minWidth: 150,
        headerClassName: 'custom-header',
        cellClassName: 'last-name-cell',
    },
];

// Rows DataGrid (Cells) (ID, Message Control ID, Medical Record Number, Last Name)
const rows = [
    // Test Data (Comment and Uncomment to use)
    { id: 1, messageControlId: 'MSH|^~&|MegaReg|', medicalRecordNumber: 'SuperOE|XYZImgCtr|20060529090131-0500|', lastName: 'Smith' },
    { id: 2, messageControlId: 'OBX|1|NM|^Body Height||1.80|m^Meter^ISO+||N|||F', medicalRecordNumber: 'OBX|2|NM|^Body Weight||79|kg^Kilogram^ISO+||N|||F', lastName: 'Brown' },
    { id: 3, messageControlId: 'EVN||200605290901||||200605290900', medicalRecordNumber: 'PID|2||987654321^^^SuperOE', lastName: 'Garcia' },
    { id: 4, messageControlId: 'EVN||200605290901||||200605290900', medicalRecordNumber: 'PID|2||987654321^^^SuperOE', lastName: 'Lee' },
    { id: 5, messageControlId: 'PID|1||123456789^^^MegaReg', medicalRecordNumber: 'PID|2||987654321^^^SuperOE', lastName: 'Patel' },
    { id: 6, messageControlId: 'MSH|^~&|MegaReg|', medicalRecordNumber: 'SuperOE|XYZImgCtr|20060529090131-0500|', lastName: 'Walker' },
    { id: 7, messageControlId: 'OBX|1|NM|^Body Height||1.80|m^Meter^ISO+||N|||F', medicalRecordNumber: 'OBX|2|NM|^Body Weight||79|kg^Kilogram^ISO+||N|||F', lastName: 'Khan' },
    { id: 8, messageControlId: 'EVN||200605290901||||200605290900', medicalRecordNumber: 'PID|2||987654321^^^SuperOE', lastName: 'Nguyen' },
    { id: 9, messageControlId: 'EVN||200605290901||||200605290900', medicalRecordNumber: 'PID|2||987654321^^^SuperOE', lastName: 'Wong' },
    { id: 10, messageControlId: 'PID|1||123456789^^^MegaReg', medicalRecordNumber: 'PID|2||987654321^^^SuperOE', lastName: 'Ali' },
];

// Main Component
export default function TextDownload() {
    const classes = useStyles();

    return (
        <>
            <header className={classes.header}>
                <h2>HCA Data Dashboard</h2>
                <Navbar />
            </header>

            <Box className={classes.wrapper}>
                <Box className={classes.sidebar}>
                    <div className="file-upload">
                        <label htmlFor="hl7-file-upload">Upload HL7 File:</label>
                        <input
                            type="file"
                            id="hl7-file-upload"
                            accept=".hl7,.txt"
                            onChange={() => {}}
                            style={{ marginTop: '8px' }}
                        />
                    </div>
                </Box>

                <Box sx={{ flexGrow: 1, p: { xs: 1, sm: 2 }, width: '100%' }}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: { xs: 'column', sm: 'row' },
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            gap: 1,
                            mb: 2,
                        }}
                    >
                        <Typography variant="h6">
                            Message Control ID, Medical Record Number & Last Name
                        </Typography>
                        <Button
                            variant="contained"
                            color="secondary"
                            fullWidth
                            sx={{ maxWidth: { sm: '150px' } }}
                        >
                            Download
                        </Button>
                    </Box>

                    <Box className={classes.root} sx={{ width: '100%', overflowX: 'auto' }}>
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            pageSizeOptions={[5]}
                            checkboxSelection
                            disableRowSelectionOnClick
                            getRowHeight={() => 'auto'}
                        />
                    </Box>
                </Box>
            </Box>
        </>
    );
}