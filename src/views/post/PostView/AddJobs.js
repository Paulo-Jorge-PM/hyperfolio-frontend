// *https://www.registers.service.gov.uk/registers/country/use-the-api*
import fetch from 'cross-fetch';
import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';

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

const Jobs = ({ className, ...rest }) => {

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
      getOptionSelected={(option, value) => option.occupation.value === value.occupation.value}
      getOptionLabel={(option) => option.occupation.value.toString()}
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

Jobs.propTypes = {
  className: PropTypes.string,
};

export default Jobs;
