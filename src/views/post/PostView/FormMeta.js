import React, { useState, useEffect } from 'react';
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

const FormMeta = ({ className, updateForm, ...rest }) => {
  const classes = useStyles();
  const [values, setValues] = useState({
    password: '',
    confirm: ''
  });

  //const [date, setDate] = useState("");

  //Run code once after component loads, to sync default value with form data in parent
  useEffect(() => {
      updateForm("when", dateN);
  }, []);// <-- empty array means 'run once'

const generalUpdate = (event) => {
  const name = event.target.name;
  const value = event.target.value;

  updateForm(name, value);
}

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
          name="body"
          multiline
          rows={2}
          rowsMax={10}
          variant="outlined"
          fullWidth={true}

          onChange={generalUpdate}
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
              name="when"
              InputLabelProps={{
                shrink: true,
              }}
              margin="normal"
              name="when"
              variant="outlined"

              defaultValue={dateN}
              onChange={generalUpdate}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              label="Where?"
              name="where"
              margin="normal"
              name="where"
              variant="outlined"

              onChange={generalUpdate}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              label="For whom?"
              name="for"
              margin="normal"
              name="for"
              variant="outlined"

              onChange={generalUpdate}
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
