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

function queryOccupation(wordInput) {
  let word = wordInput.toLowerCase();
  var q = `
  select ?occupation where { 
  ?o a <http://data.europa.eu/esco/model#Occupation> .
  ?o <http://www.w3.org/2004/02/skos/core#prefLabel> ?occupation .
  FILTER langMatches( lang(?occupation), "pt" ) .
  FILTER( contains( lcase(str(?occupation)), "${word}" ) ) .
  } LIMIT 200`;

  //FILTER( strStarts( ?occupation, "${wordInput}" ) ) .

  return q;
}

const Assets = ({ className, formData, handleClose, ...rest }) => {

  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const loading = open && options.length === 0;
  const [inputWord, setInputWord] = React.useState('');

  const [selectedJob, setselectedJob] = React.useState('');
  const [jobs, setJobs] = React.useState(formData.jobs);

  const [selectedFile, setSelectedFile] = React.useState(null)


function buildOptions(d) {
  var data = d.results.bindings;
  setOptions( Object.keys(data).map((key) => data[key]) )
    //data.results.map(item => item))
}

function changeOptionBaseOnValue(val) {
    /*fetch("http://127.0.0.1:8003/posts", {
        method: 'GET', 
        headers: {
          'Authorization': 'Basic cGF1bG86dW5pY29ybmlv',
          'Content-Type': 'application/json',
        }, 
      })*/
      let query = queryOccupation(val);
      fetch(SERVER+'?query='+encodeURIComponent(query), {
          method: 'GET',
          //headers: new Headers({
          headers: {
            'Authorization': 'Basic '+btoa('admin:admin'),
            //'Authorization': 'Basic YWRtaW46YWRtaW4=',
            //'Authorization': 'Basic cGF1bG86dW5pY29ybmlv',
            //'X-CSRFToken': 'gTiPlygvqXHH3NEDOO23x9yhVUAv2MvOkMKH3wdPKjh3tYfjqeaqACLU74uOcGxu',
            //'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/sparql-results+json',
          },
          //body: JSON.stringify({
          //  query: 'select ?occupation where {?o a <http://data.europa.eu/esco/model#Occupation> . ?o <http://www.w3.org/2004/02/skos/core#prefLabel> ?occupation . FILTER langMatches( lang(?occupation), "pt" )} LIMIT 5',
          //  })
          //body: {
          //  'query': query
          //}
        })
      .then(response => response.json())
      .then(data => buildOptions(data) )
      //.catch(error => this.setState({ error, isLoading: false }));
}

function addEntry() {


onFileUpload();

//setJobs(jobs => jobs.concat(selectedJob));
//alert(JSON.stringify(test));

//formData.jobs = formData.jobs.concat(selectedJob);
}

function listRemove(job) {
  setJobs(jobs.filter(item => item !== job));
  formData.jobs = formData.jobs.filter(item => item !== job);
}

// On file select 
function onFileChange(event) { 
    // Update the state 
    setSelectedFile(event.target.files[0]);
    //this.setState({ selectedFile: event.target.files[0] });
}; 


// On file upload (click on the add button) 
function onFileUpload() { 
  // Create an object of formData 
  const form = new FormData();
 
  // Update the formData object 
  form.append(
    "file", 
    selectedFile
  );

  const queryString = new URLSearchParams(form).toString()

  alert(queryString);
 

  // Send formData object 
  //axios.post("api/uploadfile", formData); 
}; 

  return (

<Box>
        <DialogTitle id="form-dialog-title">
          Assets

          <Button onClick={() => handleClose()} color="primary" size="small" variant="outlined" style={{position: 'absolute', right: '25px'}}>
            Done
          </Button>
        </DialogTitle>

        {/*<DialogActions>
          <Button onClick={false} color="primary">
            Add
          </Button>
        </DialogActions>*/}

        <DialogContent>
          <DialogContentText>
            Add assets that testify your creation. Share your work with the world.
          </DialogContentText>


          <div>
            <input type="file" onChange={onFileChange} /> 
          </div>


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
        setselectedJob(value);
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
      {jobs.map((job) => 
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

Assets.propTypes = {
  className: PropTypes.string,
};

export default Assets;
