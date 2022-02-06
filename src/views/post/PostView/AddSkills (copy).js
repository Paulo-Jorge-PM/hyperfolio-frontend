// *https://www.registers.service.gov.uk/registers/country/use-the-api*
import fetch from 'cross-fetch';
import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';

const SERVER = 'http://localhost:5820/esco/query';

function querySkill(wordInput) {
  let word = wordInput.toLowerCase();
  var q = `
  select ?skill where { 
  ?o a <http://data.europa.eu/esco/model#Skill> .
  ?o <http://www.w3.org/2004/02/skos/core#prefLabel> ?skill .
  FILTER langMatches( lang(?skill), "pt" ) .
  FILTER( contains( lcase(str(?skill)), "${word}" ) ) .
  } LIMIT 200`;

  //FILTER( strStarts( ?skill, "${wordInput}" ) ) .

  return q;
}

const Skills = ({ className, ...rest }) => {

  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const loading = open && options.length === 0;
  const [inputWord, setInputWord] = React.useState('');

function buildOptions(d) {
  var data = d.results.bindings;
  setOptions( Object.keys(data).map((key) => data[key]) )
    //ata.results.map(item => item))
}

function changeOptionBaseOnValue(val) {
      let query = querySkill(val);
      fetch(SERVER+'?query='+encodeURIComponent(query), {
          method: 'GET',
          headers: {
            'Authorization': 'Basic '+btoa('admin:admin'),
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/sparql-results+json',
          },
        })
      .then(response => response.json())
      .then(data => buildOptions(data) )
      //.catch(error => this.setState({ error, isLoading: false }));
}

  return (
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
      getOptionSelected={(option, value) => option.skill.value === value.skill.value}
      getOptionLabel={(option) => option.skill.value.toString()}
      options={options}
      loading={loading}

      onInputChange={(event: object, value: string, reason: string) => {
        if (reason === 'input') {
          setInputWord(value);
          changeOptionBaseOnValue(value);
        }
      }}


      renderInput={(params) => (
        <TextField
          {...params}
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
      )}
    />
  );
};

Skills.propTypes = {
  className: PropTypes.string,
};

export default Skills;
