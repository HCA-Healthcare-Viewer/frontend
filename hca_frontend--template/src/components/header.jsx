import { Box, Typography, Avatar } from '@mui/material';

const Header = () => {
  return (
    <Box
      component="header"
      sx={{
        width: '100%',
        marginBottom: '10px',
        backgroundColor: '#27262C', // HCA Healthcare Navy
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '12.5px 25px',
        height: 'auto',
        boxSizing: 'border-box',
        boxShadow: '0 4px 12px rgba(173, 214, 255, 0.5)',
        borderRadius: '0 0 10px 10px',
        position: 'relative',
        zIndex: 100,
      }}
    >
      {/* Centered Logo and Title */}
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '12.5px',
        justifyContent: 'center'
      }}>
        <Avatar
          src="/HCA_Logo.jpg"
          alt="Logo"
          sx={{ 
            width: 50, 
            height: 50,
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
          }}
        />
        <Typography 
          sx={{ 
            fontSize: '1.125rem',
            textShadow: '0 2px 4px rgba(0, 0, 0, 0.7)',
            letterSpacing: '0.8px',
            color: '#ffffff',
            fontWeight: 800,
          }}
        >
          HCA Healthcare Viewer
        </Typography>
      </Box>
    </Box>
  );
};

export default Header;
