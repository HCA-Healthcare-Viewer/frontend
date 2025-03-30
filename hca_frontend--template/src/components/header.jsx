import { Box, Typography, Avatar } from '@mui/material';

const Header = () => {
  return (
    <Box
      component="header"
      sx={{
        width: '100%',
        backgroundColor: '##03173E', // HCA Healthcare Navy
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 20px',
      }}
    >
      {/* Left: Dashboard Title */}
      <Typography variant="h" sx={{ fontWeight: 'bold', color: 'white' }}>
        Dashboard
      </Typography>

      {/* Right: Profile Image and Name */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <Avatar
          src="/Profile_Image_Example.jpg"
          alt="Profile"
          sx={{ width: 40, height: 40 }}
        />
        <Typography sx={{ fontWeight: 'bold', color: 'white' }}>
          John Doe
        </Typography>
      </Box>
    </Box>
  );
};

export default Header;
