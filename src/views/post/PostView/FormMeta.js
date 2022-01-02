import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Button,
  Card,
  Grid,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  makeStyles
} from '@material-ui/core';

const useStyles = makeStyles(({
  root: {}
}));


function getAtualDate() {
  let today = new Date();
  let date = today.getFullYear()+'-'+("0" + (today.getMonth() + 1)).slice(-2)+'-'+("0" + today.getDate()).slice(-2);
  //var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  return date;
}

const dateN = getAtualDate();

const FormMeta = ({ className, ...rest }) => {
  const classes = useStyles();
  const [values, setValues] = useState({
    password: '',
    confirm: ''
  });


  return (

      <Card>
        <CardHeader
          subheader="Optional metadata for the Curriculum Vitae"
          title="Description"
        />
        <Divider />
        <CardContent>

        <TextField
          id="filled-multiline-flexible"
          label="Description / Free text"
          multiline
          rows={2}
          rowsMax={10}
          variant="filled"
          fullWidth={true}
        />

        <Grid style={{marginTop: "0px"}}
          direction="row"
          justify="center"
          alignItems="center"
          spacing={1}
          container
        >
          <Grid item xs={4}>
            <TextField
              fullWidth
              label="When?"
              type="date"
              defaultValue={dateN}
              InputLabelProps={{
                shrink: true,
              }}
              margin="normal"
              name="when"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              label="Where?"
              margin="normal"
              name="where"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              label="For?"
              margin="normal"
              name="for"
              variant="outlined"
            />
          </Grid>
        </Grid>


        </CardContent>

      </Card>
  );
};

FormMeta.propTypes = {
  className: PropTypes.string
};

export default FormMeta;
