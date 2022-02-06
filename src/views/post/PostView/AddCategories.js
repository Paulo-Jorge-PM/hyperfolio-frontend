// *https://www.registers.service.gov.uk/registers/country/use-the-api*
import fetch from 'cross-fetch';
import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import {
  Grid,
  Box,
  Button,
  DialogActions,
  DialogContentText,
  DialogContent,
  DialogTitle,
  makeStyles,

} from '@material-ui/core';


import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import DeleteForever from '@material-ui/icons/DeleteForever';

const filter = createFilterOptions();

const SERVER = 'http://localhost:5820/esco/query';

const useStyles = makeStyles((theme) => ({
  delItem: {
    '&:hover': {
      background:'#ffcccb'
    }
  }
}));



function queryCategories(wordInput) {
  let word = wordInput.toLowerCase();
  var q = `
  select ?category where { 
  ?o a <http://data.europa.eu/esco/model#Categories> .
  ?o <http://www.w3.org/2004/02/skos/core#prefLabel> ?category .
  FILTER langMatches( lang(?category), "pt" ) .
  FILTER( contains( lcase(str(?category)), "${word}" ) ) .
  } LIMIT 200`;
  //FILTER( strStarts( ?occupation, "${wordInput}" ) ) .

  return q;
}

const Categoriess = ({ className, formData, handleClose, ...rest }) => {

  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);

  const [inputWord, setInputWord] = React.useState('');

  const [selectedCategories, setselectedCategories] = React.useState('');
  const [categories, setCategoriess] = React.useState(formData.categories);

  const [value, setValue] = React.useState(formData.categories[0]);
  const loading = open && options.length === 0;

function buildOptions(d) {
  //var data = d.results.bindings;
  //setOptions( Object.keys(data).map((key) => data[key]) )
//setOptions(Artifact);
}

function changeOptionBaseOnValue(val) {
      /*let query = queryCategories(val);
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
      .then(data => buildOptions(data) )*/
      //buildOptions(Artifact);
}

function addEntry() {
setCategoriess(categories => categories.concat(selectedCategories));
formData.categories = formData.categories.concat(selectedCategories);
}

function listRemove(job) {
  setCategoriess(categories.filter(item => item !== job));
  formData.categories = formData.categories.filter(item => item !== job);
}


const Artifact = [
{title: "Art"},
{title: "Science"},
{title: "Engineering"},
{title: "Humanities"},
{title: "Architecture"},
{title: "DIY"},
{title: "Miscellaneous"}
]

const Activity = [
{title: "Graduation"},
{title: "Certification"},
{title: "Travel"},
{title: "Life"},
{title: "Event"},
{title: "Science"},
{title: "Prize"},
{title: "Miscellaneous"}
]

const Text = [
{title: "Opinion"},
{title: "Essay"},
{title: "Joke"},
{title: "Theory"},
{title: "Plan"},
{title: "Miscellaneous"}
]

var catType;
switch (formData.typePost) {
  case "Activity":
    catType = Activity
    break;
  case "Text":
    catType = Text;
    break;
  default:
    catType = Artifact;
  }

  return (

<Box>
        <DialogTitle id="form-dialog-title">
          Categoriess

          <Button onClick={() => handleClose()} color="primary" size="small" variant="outlined" style={{position: 'absolute', right: '25px'}}>
            Done
          </Button>
        </DialogTitle>

        <DialogContent>
          <DialogContentText>
            Define a category related with your portfolio creation. This will organize your creations in your CV.
          </DialogContentText>

    <Autocomplete
      value={value}
      onChange={(event, newValue) => {
        if (typeof newValue === 'string') {
          setValue({
            title: newValue,
          });
          formData.categories = [newValue];
        } else if (newValue && newValue.inputValue) {
          // Create a new value from the user input
          setValue({
            title: newValue.inputValue,
          });
          formData.categories = [newValue.inputValue];
        } else {
          setValue(newValue);
          formData.categories = [newValue];
        }
      }}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);

        // Suggest the creation of a new value
        if (params.inputValue !== '') {
          filtered.push({
            inputValue: params.inputValue,
            title: `Add "${params.inputValue}"`,
          });
        }

        return filtered;
      }}
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      id="free-solo-with-text-demo"
      options={catType}
      getOptionLabel={(option) => {
        // Value selected with enter, right from the input
        if (typeof option === 'string') {
          return option;
        }
        // Add "xxx" option created dynamically
        if (option.inputValue) {
          return option.inputValue;
        }
        // Regular option
        return option.title;
      }}
      renderOption={(option) => option.title}
      style={{ width: "100%" }}
      freeSolo
      renderInput={(params) => (

        <Grid>
        <TextField {...params} style={{ paddingRight: '100px' }} label={"What kind of " + formData.typePost + "?"} variant="outlined" />
        <br /><br /><br />
        </Grid>
      )}
    />







        </DialogContent>



    </Box>
  );
};

Categoriess.propTypes = {
  className: PropTypes.string,
};

export default Categoriess;
