import { Box, Typography, Link, IconButton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import XIcon from '@mui/icons-material/X';
import YouTubeIcon from '@mui/icons-material/YouTube';
import RssFeedIcon from '@mui/icons-material/RssFeed';  // Blog icon

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#FFFFFF',
        color: '#000000',
        padding: '10px 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 1000,
        boxShadow: '0 -2px 5px rgba(0, 0, 0, 0.1)',
      }}
    >
      {/* Left side: Logo + Address */}
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <img
          src="/HCA_Healthcare_Logo.png"
          alt="HCA Healthcare Logo"
          style={{ height: '30px', marginRight: '10px' }}
        />
        <Typography variant="body2">
          123 Healthcare Way, Nashville, TN 37203
        </Typography>
      </Box>

      {/* Right side: Social Media Icons */}
      <Box>
        <IconButton
          component="a"
          href="https://www.facebook.com/HCACare"
          target="_blank"
          sx={{ color: '#03173E' }}
        >
          <FacebookIcon />
        </IconButton>
        <IconButton
          component="a"
          href="https://www.instagram.com/hcahealthcare/"
          target="_blank"
          sx={{ color: '#03173E' }}
        >
          <InstagramIcon />
        </IconButton>
        <IconButton
          component="a"
          href="https://www.linkedin.com/company/hca"
          target="_blank"
          sx={{ color: '#03173E' }}
        >
          <LinkedInIcon />
        </IconButton>
        <IconButton
          component="a"
          href="https://x.com/HCAhealthcare"
          target="_blank"
          sx={{ color: '#03173E' }}
        >
          <XIcon />
        </IconButton>
        <IconButton
          component="a"
          href="https://www.youtube.com/hcahealthcare"
          target="_blank"
          sx={{ color: '#03173E' }}
        >
          <YouTubeIcon />
        </IconButton>
        <IconButton
          component="a"
          href="https://hcahealthcaretoday.com/"
          target="_blank"
          sx={{ color: '#03173E' }}
        >
          <RssFeedIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Footer;