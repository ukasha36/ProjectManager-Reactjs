// src/components/ProjectTable.js
import React, { useEffect, useState } from 'react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../config/firebaseconfig.js';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Paper, Button, useMediaQuery, useTheme } from '@mui/material';
import ProjectModal from './ProjectModal';
import DeleteIcon from '@mui/icons-material/Delete';

const ProjectTable = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      const querySnapshot = await getDocs(collection(db, 'projects'));
      const projectsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProjects(projectsData);
    };

    fetchProjects();
  }, []);

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, 'projects', id));
    setProjects(projects.filter(project => project.id !== id));
  };

  const handleOpenModal = (project) => {
    setSelectedProject(project);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Start Date</TableCell>
              <TableCell>End Date</TableCell>
              <TableCell>Owner</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {projects.map(project => (
              <TableRow key={project.id} onClick={() => handleOpenModal(project)}>
               <TableCell>
  {project.imageUrl ? (
    <img
      src={project.imageUrl}
      alt={project.name}
      style={{ width: '50px', height: '50px', objectFit: 'cover' }}
    />
  ) : (
    <img
      src="../assets/react.svg" // Replace with the path to your placeholder image
      alt="Placeholder"
      style={{ width: '50px', height: '50px', objectFit: 'cover' }}
    />
  )}
</TableCell>
                <TableCell>{project.name}</TableCell>
                <TableCell>{project.description}</TableCell>
                <TableCell>{project.startDate}</TableCell>
                <TableCell>{project.endDate}</TableCell>
                <TableCell>{project.owner}</TableCell>
                <TableCell>
                  <Button variant="contained" color="primary" onClick={(e) => { e.stopPropagation(); handleOpenModal(project); }}>
                    View
                  </Button>
                  <IconButton
                    onClick={(e) => { e.stopPropagation(); handleDelete(project.id); }}
                    aria-label="delete"
                    sx={{ color: 'red' }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ProjectModal project={selectedProject} handleClose={handleCloseModal} />
    </>
  );
};

export default ProjectTable;
