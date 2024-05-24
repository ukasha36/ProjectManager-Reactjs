import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db, storage } from '../config/firebaseconfig.js';
import { TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions, CircularProgress } from '@mui/material';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import moment from 'moment';

const AddProjectForm = ({ open, handleClose }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [owner, setOwner] = useState('');
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!name || !description || !startDate || !endDate || !owner) {
      setError('Please fill all fields');
      return;
    }

    setUploading(true);
    setError('');
    let imageUrl = '';

    try {
      if (image) {
        const imageRef = ref(storage, `projects/${image.name}`);
        await uploadBytes(imageRef, image);
        imageUrl = await getDownloadURL(imageRef);
      }

      await addDoc(collection(db, 'projects'), {
        name,
        description,
        startDate: moment(startDate).format('YYYY-MM-DD'),
        endDate: moment(endDate).format('YYYY-MM-DD'),
        owner,
        imageUrl
      });

      handleClose(); // Close the dialog after submission
    } catch (err) {
      console.error("Error adding document: ", err);
      setError('Failed to add project. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add New Project</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Name"
          fullWidth
          variant="standard"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Description"
          fullWidth
          variant="standard"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Start Date"
          type="date"
          fullWidth
          variant="standard"
          InputLabelProps={{
            shrink: true,
          }}
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <TextField
          margin="dense"
          label="End Date"
          type="date"
          fullWidth
          variant="standard"
          InputLabelProps={{
            shrink: true,
          }}
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Owner"
          fullWidth
          variant="standard"
          value={owner}
          onChange={(e) => setOwner(e.target.value)}
        />
        <Button
          variant="contained"
          component="label"
          sx={{ mt: 2 }}
        >
          Upload Image
          <input
            type="file"
            hidden
            onChange={handleImageChange}
          />
        </Button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit} color="primary" disabled={uploading}>
          {uploading ? <CircularProgress size={24} /> : 'Add'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddProjectForm;
