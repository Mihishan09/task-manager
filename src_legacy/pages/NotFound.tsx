import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Button, Box } from '@mui/material';
import { Home as HomeIcon } from '@mui/icons-material';

const NotFound: React.FC = () => {
  return (
    <Box
      className="min-h-screen flex flex-col items-center justify-center p-4"
      sx={{ backgroundColor: 'background.default' }}
    >
      <Typography variant="h1" className="text-6xl font-bold mb-4">
        404
      </Typography>
      <Typography variant="h4" className="mb-4 text-center">
        Oops! Page Not Found
      </Typography>
      <Typography variant="body1" className="mb-8 text-center text-gray-600">
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </Typography>
      <Button
        component={Link}
        to="/"
        variant="contained"
        color="primary"
        startIcon={<HomeIcon />}
        size="large"
      >
        Back to Home
      </Button>
    </Box>
  );
};

export default NotFound; 