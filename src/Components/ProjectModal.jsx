// src/components/ProjectModal.js
import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, useMediaQuery, useTheme, Typography, Box } from '@mui/material';

const ProjectModal = ({ project, handleClose }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Dialog open={!!project} onClose={handleClose} fullScreen={fullScreen}>
      <DialogTitle>Project Details</DialogTitle>
      <DialogContent>
        {project && (
          <>
            {project.imageUrl && (
              <Box
                component="img"
                sx={{
                  width: '100%',
                  height: 'auto',
                  marginBottom: '16px',
                  objectFit: 'cover',
                }}
                src={project.imageUrl}
                alt={project.name}
              />
            )}
            <Typography variant="h6" component="div"><strong>Name:</strong> {project.name}</Typography>
            <Typography variant="body1" component="div"><strong>Description:</strong> {project.description}</Typography>
            <Typography variant="body1" component="div"><strong>Start Date:</strong> {project.startDate}</Typography>
            <Typography variant="body1" component="div"><strong>End Date:</strong> {project.endDate}</Typography>
            <Typography variant="body1" component="div"><strong>Owner:</strong> {project.owner}</Typography>
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProjectModal;