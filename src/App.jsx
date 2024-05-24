// src/App.js
import React, { useState } from 'react';
import { Container, Button, Typography, useMediaQuery, useTheme } from '@mui/material';
import ProjectTable from './Components/ProjectTable';
import ProjectModal from './Components/ProjectModal';
import AddProjectForm from './Components/AddProjectForm';

function App() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isAddProjectOpen, setIsAddProjectOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleOpenModal = (project) => {
    setSelectedProject(project);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
  };

  const handleOpenAddProject = () => {
    setIsAddProjectOpen(true);
  };

  const handleCloseAddProject = () => {
    setIsAddProjectOpen(false);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Project Manager</Typography>
      <Button variant="contained" color="primary" onClick={handleOpenAddProject} style={{ marginBottom: isMobile ? '16px' : '24px' }}>
        Add Project
      </Button>
      <ProjectTable openModal={handleOpenModal} />
      <ProjectModal project={selectedProject} handleClose={handleCloseModal} />
      <AddProjectForm open={isAddProjectOpen} handleClose={handleCloseAddProject} />
    </Container>
  );
}

export default App;