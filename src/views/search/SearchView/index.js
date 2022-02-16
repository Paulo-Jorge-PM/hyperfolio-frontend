/*import React from "react";

const SettingsView = ({ className, ...rest }) => {

  //const classes = useStyles();
  
  return (
  <div>Teste
    <my-search />
    </div>
  );
  };



export default SettingsView;*/



import React from 'react';
import {
  Box,
  Container,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const SettingsView = () => {
  const classes = useStyles();
  
  return (
    <Page
      className={classes.root}
      title="Cv"
    >
      <Container maxWidth="lg">
        
        
    <h1 style={{textAlign:"center",marginTop:"30px"}}>
    Semantic Search
    </h1>

    <p style={{textAlign:"center",marginTop:"30px"}}>Search posts based on Named-Entity Recognition and graph/RDF relationships.</p>

    <iframe src="http://localhost:3888/" style={{width:"100%", border:"none", height:"1500px"}}>Iframes not supported, please use other browser.</iframe>
        
      </Container>

    </Page>
  );
};

export default SettingsView;



