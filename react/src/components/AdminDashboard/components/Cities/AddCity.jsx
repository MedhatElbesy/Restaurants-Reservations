import React from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';

const validationSchema = yup.object({
  name: yup.string('Enter city name').required('City name is required'),
  governorate: yup.string('Enter governorate name').required('Governorate name is required'),
});

const CityModal = ({ open, handleClose, initialData, handleSubmit }) => {
  const formik = useFormik({
    initialValues: initialData,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={{ p: 4, backgroundColor: 'white', margin: 'auto', mt: 10, borderRadius: 1, maxWidth: 400 }}>
        <Typography variant="h6" gutterBottom>
          {initialData.id ? 'Edit City' : 'Add City'}
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            id="name"
            name="name"
            label="City Name"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            margin="normal"
          />
          <TextField
            fullWidth
            id="governorate"
            name="governorate"
            label="Governorate"
            value={formik.values.governorate}
            onChange={formik.handleChange}
            error={formik.touched.governorate && Boolean(formik.errors.governorate)}
            helperText={formik.touched.governorate && formik.errors.governorate}
            margin="normal"
          />
          <Button color="primary" variant="contained" fullWidth type="submit" sx={{ mt: 2 }}>
            {initialData.id ? 'Update City' : 'Add City'}
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default CityModal;
