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
        '& .MuiDataGrid-columnHeaderCheckbox': {
            backgroundColor: '#0000FF',
            color: '#FFFF00',
        },
        '& .MuiDataGrid-cellCheckbox': {
            backgroundColor: '#FFA500',
        },
        '& .MuiCheckbox-root.Mui-checked': {
            color: '#FFFF00 !important',
        },
        '& .custom-header': {
            backgroundColor: '#FF0000',
            color: '#FFFFFF',
        },
        '& .MuiDataGrid-cell[data-field="id"]': {
            backgroundColor: '#AAAAAA',
            color: '#000000',
        },
        '& .original-cell': {
            backgroundColor: '#FFFF00',
            color: '#AAAAAA',
        },
        '& .deid-cell': {
            backgroundColor: '#008000',
            color: '#0000FF',
        },
        '& .MuiDataGrid-sortIcon': {
            color: '#FFFFFF',
        },
        '& .MuiDataGrid-menuIconButton': {
            color: '#FFFFFF',
        },
        '& .MuiDataGrid-selectedRowCount': {
            color: '#00FFFF',
        },
        '& .MuiTablePagination-displayedRows': {
            color: '#FF69B4',
        },
        '& .MuiTablePagination-actions button': {
            color: '#00FF00',
        },
    },
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

// ✅ Responsive Columns
const columns = [
    {
        field: 'id',
        headerName: 'ID',
        flex: 0.3,
        minWidth: 70,
        headerClassName: 'custom-header',
    },
    {
        field: 'originalTxt',
        headerName: 'Original Text',
        flex: 1,
        minWidth: 250,
        headerClassName: 'custom-header',
        cellClassName: 'original-cell',
    },
    {
        field: 'deIdentifiedTxt',
        headerName: 'De-Identified Text',
        flex: 1,
        minWidth: 250,
        headerClassName: 'custom-header',
        cellClassName: 'deid-cell',
    },
];




const rows = [

];




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
                        <Typography variant="h6">Original vs De-Identified</Typography>
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
