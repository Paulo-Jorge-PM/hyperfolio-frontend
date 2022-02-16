import React, { useState, useEffect } from 'react';
import DownloadLink from "react-download-link";
import {
  Box,
  Paper,
  Container,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';

import Curriculum from './Curriculum';
import StyleCV from './StyleCV';

const POSTS_URL = 'http://127.0.0.1:8003/posts/';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

const defaultCSS = `
body {bacground:red;}
p {color:green;}
`
var html = "";


export default function CurriculumView() {
  const classes = useStyles();

  const [userPosts, setUserPosts] = useState([]);

  const [selectedPosts, setSelectedPosts] = useState([]);

  const [styleCss, setStyleCss] = useState(defaultCSS);

  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

function getSteps() {
  return ['Select assets to add', 'Custom CSS style', 'Preview'];
}

function generateHTML() {
  html = html + `<html>
  <head>
  <title>Hiperfolio Portfolio</title>
  <style type="text/css">
  ` + styleCss + `
  </style>
  
  </head>
  <body>
  <p>Teste</p>
  </body>
  </html>`;
}

function updateCSS(css) {
  setStyleCss(css);
}

function getStepContent(stepIndex) {
  switch (stepIndex) {
    case 0:
      return <div><Paper style={{marginTop:"25px", padding:"15px 15px"}}><h4>1. Content to publish</h4>Generate a new static portoflio/cv. Start by selecting content to show.</Paper><Curriculum userPosts={userPosts} selectedPosts={selectedPosts} addSelected={addSelected} /></div>;
    case 1:
      return <div><Paper style={{marginTop:"25px", padding:"15px 15px"}}><h4>2. Select a template</h4>Custom the default portfolio template wth your own CSS.</Paper><StyleCV selectedPosts={selectedPosts} updateCSS={updateCSS} defaultCSS={defaultCSS} /></div>;
    case 2:
      return <Paper style={{marginTop:"25px", padding:"15px 15px"}}><h4>3. Preview your content.</h4>Click <a href="#">here</a> to preview your portfolio template. If you like it, publish it to get a permanent link.</Paper>;
    default:
      return 'Error: reset';
  }
}

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  function addSelected(id) {
    if(selectedPosts.includes(id)){
      //remove
      setSelectedPosts(selectedPosts.filter(el => el !== id));
    }
    else {
      //add
      setSelectedPosts([...selectedPosts, id]);
    }
  }

  function getPosts() {
      fetch(POSTS_URL+'?user=1', {
          method: 'GET',
          headers: {
            'Authorization': 'Basic '+global.config.AUTH.POSTS.token,
            'Accept': 'application/json',
          },
        })
      .then(response => response.json())
      .then(data => setUserPosts(data) )
  }

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <Page
      className={classes.root}
      title="Cv"
    >
      <Container maxWidth="lg">

      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === steps.length ? generateHTML() : null}

        {activeStep === steps.length ? (

          <div>
            
            
            <Paper style={{marginTop:"25px", padding:"15px 15px"}}>
            <h4>Done!</h4>
            <Typography className={classes.instructions}>
              Permanet link <a href='#'>here</a>.
              Or <DownloadLink 
                label="download" 
                filename="portfolio.html"
                exportFile={() => html}
              /> your portfolio.

            </Typography>
            </Paper>
            <br />
            <Button onClick={handleReset} variant="contained" color="secondary">Restart</Button>
          </div>
        ) : (
          <div>
            <div style={{background:"#FFFFFF", paddingBottom:"10px"}}>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.backButton}
              >
                Back
              </Button>
              <Button variant="contained" color="primary" onClick={handleNext}>
                {activeStep === steps.length - 1 ? 'PUBLISH!' : 'Next'}
              </Button>
            </div>

              <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>

          </div>
        )}
      </div>

        
      </Container>
    </Page>
  );
};


