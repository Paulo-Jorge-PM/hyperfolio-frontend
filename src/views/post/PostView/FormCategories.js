import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContentText,
  DialogContent,
  DialogTitle,
  Card,
  Grid,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  makeStyles
} from '@material-ui/core';

import AddJobs from './AddJobs';
import AddSkills from './AddSkills';
import AddCategories from './AddCategories';
import AddPersons from './AddPersons';


const useStyles = makeStyles(({
  root: {}
}));


const FormCategories = ({ className, formData, ...rest }) => {
  const classes = useStyles();
  const [values, setValues] = useState({
    password: '',
    confirm: ''
  });

  const [open1, setOpen1] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);
  const [open4, setOpen4] = React.useState(false);

  const handleClickOpen1 = (number) => {
    setOpen1(true);
  };

  const handleClickOpen2 = (number) => {
    setOpen2(true);
  };

  const handleClickOpen3 = (number) => {
    setOpen3(true);
  };

  const handleClickOpen4 = (number) => {
    setOpen4(true);
  };

  const handleClose = (number) => {
    setOpen1(false);
    setOpen2(false);
    setOpen3(false);
    setOpen4(false);
  };



  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };


  return (

      <Card>

        <CardContent>

        <Grid style={{marginTop: "0px"}}
          direction="row"
          justify="center"
          alignItems="center"
          spacing={1}
          container
        >
          <Grid item xs={3} align="center">
            <Button className={classes.importButton} 
              color="default"
              variant="contained"
              onClick={handleClickOpen1}
              color={formData.jobs.length!=0 ? "primary":"default"}
            >
              Add Jobs
            </Button>
          </Grid>
          <Grid item xs={3} align="center">
            <Button className={classes.importButton} 
              color="default"
              variant="contained"
              onClick={handleClickOpen2}
              color={formData.skills.length!=0 ? "primary":"default"}
            >
              Add Skills
            </Button>
          </Grid>
          <Grid item xs={3} align="center">
            <Button className={classes.importButton} 
              color="default"
              variant="contained"
              onClick={handleClickOpen3}
              color={formData.categories.length!=0 ? "primary":"default"}
            >
              Add Type
            </Button>
          </Grid>
          <Grid item xs={3} align="center">
            <Button className={classes.importButton} 
              color="default"
              variant="contained"
              onClick={handleClickOpen4}
              color={formData.persons.length!=0 ? "primary":"default"}
            >
              Add Persons
            </Button>
          </Grid>
        </Grid>



      <Dialog 
            open={open1} 
            fullWidth={true}
            maxWidth="md"
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
            >

          <AddJobs
            handleClose={handleClose}
            formData={formData}
          />

      </Dialog>

      <Dialog 
            open={open2} 
            fullWidth={true}
            maxWidth="md"
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
            >

          <AddSkills
            handleClose={handleClose}
            formData={formData}
          />

      </Dialog>

      <Dialog 
            open={open3} 
            fullWidth={true}
            maxWidth="md"
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
            >

          <AddCategories
            handleClose={handleClose}
            formData={formData}
          />

      </Dialog>


      <Dialog 
            open={open4} 
            fullWidth={true}
            maxWidth="md"
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
            >

          <AddPersons
            handleClose={handleClose}
            formData={formData}
          />

      </Dialog>

        </CardContent>

      </Card>
  );
};

FormCategories.propTypes = {
  className: PropTypes.string
};

export default FormCategories;
