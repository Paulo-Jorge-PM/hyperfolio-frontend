// *https://www.registers.service.gov.uk/registers/country/use-the-api*
import fetch from 'cross-fetch';
import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import {
  Grid,
  Box,
  Button,
  DialogActions,
  DialogContentText,
  DialogContent,
  DialogTitle

} from '@material-ui/core';


import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import DeleteForever from '@material-ui/icons/DeleteForever';



const SERVER = 'http://localhost:5820/esco/query';

function query(wordInput) {
  let word = wordInput.toLowerCase();
  var q = `
  select ?skill where { 
  ?o a <http://data.europa.eu/esco/model#Skill> .
  ?o <http://www.w3.org/2004/02/skos/core#prefLabel> ?skill .
  FILTER langMatches( lang(?skill), "pt" ) .
  FILTER( contains( lcase(str(?skill)), "${word}" ) ) .
  } LIMIT 200`;
  //FILTER( strStarts( ?occupation, "${wordInput}" ) ) .

  return q;
}

const Skills = ({ className, formData, handleClose, ...rest }) => {

  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const loading = open && options.length === 0;
  const [inputWord, setInputWord] = React.useState('');

  const [selectedSkill, setselectedSkill] = React.useState('');
  const [skills, setSkills] = React.useState(formData.skills);


function buildOptions(d) {
  var data = d.results.bindings;
  setOptions( Object.keys(data).map((key) => data[key]) )
    //data.results.map(item => item))
}

function changeOptionBaseOnValue(val) {
      let query = query(val);
      fetch(SERVER+'?query='+encodeURIComponent(query), {
          method: 'GET',
          //headers: new Headers({
          headers: {
            'Authorization': 'Basic '+btoa('admin:admin'),
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/sparql-results+json',
          },
        })
      .then(response => response.json())
      .then(data => buildOptions(data) )
}

function addEntry() {
setSkills(skills => skills.concat(selectedSkill));
formData.skills = formData.skills.concat(selectedSkill);
}

function listRemove(job) {
  setSkills(skills.filter(item => item !== job));
  formData.skills = formData.skills.filter(item => item !== job);
}

  return (

<Box>
        <DialogTitle id="form-dialog-title">
          Skills

          <Button onClick={() => handleClose()} color="primary" size="small" variant="outlined" style={{position: 'absolute', right: '25px'}}>
            Done
          </Button>
        </DialogTitle>

        <DialogContent>
          <DialogContentText>
            Add skills related with your portfolio creation. This will connect you to jobs and feed your CV.
          </DialogContentText>

    <Autocomplete
      id="asynchronous"
      style={{ width:"100%" }}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
        setOptions([]);
      }}
      getOptionSelected={(option, value) => option.occupation.value === value.occupation.value}
      getOptionLabel={(option) => option.occupation.value.toString()}
      options={options}
      loading={loading}

      onInputChange={(event: object, value: string, reason: string) => {
        setselectedSkill(value);
        if (reason === 'input') {
          setInputWord(value);
          changeOptionBaseOnValue(value);
        }
      }}


      renderInput={(params) => (
        <Grid>
        <TextField
          {...params}
          style={{ paddingRight: '100px' }}
          label="Type to search..."
          variant="outlined"
          autoFocus={true}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />

          <Button onClick={addEntry} color="primary" size="large" variant="contained" style={{ marginTop:'7px', position: 'absolute', right: '25px' }}>
            Add
          </Button>
        </Grid>
      )}
    />

        </DialogContent>

<Grid style={{ paddingRight: '20px', paddingLeft: '15px' }}>
      <List component="nav" aria-label="secondary mailbox folders">
      {skills.map((job) => 
        <ListItem button style={{ borderBottom:'1px dashed #F5F5F5', marginBottom:'5px' }} onClick={() => listRemove(job)}>
          <ListItemText primary={job} />
         <ListItemIcon style={{ paddingLeft:'20px' }}>
            <DeleteForever />
          </ListItemIcon>
        </ListItem>
      )}
      </List>
</Grid>

    </Box>
  );
};

Skills.propTypes = {
  className: PropTypes.string,
};

export default Skills;
