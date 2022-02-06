import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Avatar,
  Grid,
  Divider,
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  Typography,
  makeStyles
} from '@material-ui/core';
import { PenTool as PenTool } from 'react-feather';

import Fab from '@material-ui/core/Fab';
import { Award as Artifact } from 'react-feather';
import { Send as Activity } from 'react-feather';
import { MessageCircle as Text } from 'react-feather';

const useStyles = makeStyles((theme) => ({
  root: {},
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  },
  statsItem: {
    alignItems: 'center',
    display: 'flex'
  },
  statsIcon: {
    marginRight: theme.spacing(1)
  },
  userName: {
    fontWeight: 'bold',
    color:'#000000'
  },
  userPhoto: {
    borderRadius:'50%',
    marginRight:'10px',
  }
}));

var timeInterval = 2000;
const examplesMaxSize = 7;

const textExamples = {
  didExamples: ["Painted 🖌", "Composed 🎤", "Published 🎓", "Filmed 🎥", "Built 🏡", "Wrote 📖", "Invented 🔧", "Cooked 🍪"],
  livedExamples: ["Graduated 🎓", "Won 🏆", "Experienced 👶", "Certfied 📚", "Scheduled 🏖", "Married 💍", "Moved 🔑", "Visited 🗿"],
  saidExamples: ["Thought 💭", "Teached 💡", "Announcing 📢", "Theorized 🔎", "Believe 💫", "Sketched 🗒", "Debating 🗣", "Advise 💬"]
}

const textPost = {
  "Artifact": "Did",
  "Activity": "Lived",
  "Text": "Said"
}


const Toolbar = ({ className, formData, updateForm, ...rest }) => {
  const classes = useStyles();

  /*function urlParams() {
    const windowUrl = window.location.search;
    const params = new URLSearchParams(windowUrl);
    const hasTypePost = params.has("typePost");
    const t = params.get("typePost");
    alert(params);
  }

  const type = urlParams();*/



  //Hooks (States for Functions)
  /*let typePost = "Artifact";
  if(formData.hasOwnProperty("isHomepage")) {
    typePost = "Artifact";
  }
  else {
    typePost = formData.typePost;
  }*/

  const [formVar, setForm] = useState("Artifact");
  const [examplesN, setExamplesN] = useState(0);
  const [examplesText, setExamplesText] = useState(textExamples.didExamples);

  //const [user, setUser] = useState({ name: "John Doe", age: 20 });

  const [count, setCount] = useState(0);

  // Trigger redirect if is click in the homepage for a new post
  function titleClick() {
      if (formData.hasOwnProperty("isHomepage")) {
        updateForm("redirect", true);
      }
  }

  //const formType = (arg) => setForm(arg);
  const formType = (arg) => {
      if (formData.hasOwnProperty("isHomepage")) {
        updateForm("redirect", true);
      }
      setForm(arg);
      formData.typePost = arg;//update formData
      setExamplesN(0);
      if (arg == "Activity") {
        setExamplesText(textExamples.livedExamples);
      }
      else if (arg == "Text") {
        setExamplesText(textExamples.saidExamples);
      }
      else {
        setExamplesText(textExamples.didExamples);
      }
  }

  function timerCalc() {
      if (examplesN === examplesMaxSize) {
        setExamplesN(0);
      } else {
        setExamplesN(examplesN + 1);
      }
  } 

  function useInterval(callback, delay) {
    const intervalId = React.useRef(null);
    const savedCallback = React.useRef(callback);
    React.useEffect(() => {
      savedCallback.current = callback;
    });
    React.useEffect(() => {
      const tick = () => savedCallback.current();
      if (typeof delay === 'number') {
        intervalId.current = window.setInterval(tick, delay);
        return () => window.clearInterval(intervalId.current);
      }
    }, [delay]);
    return intervalId.current;
  }

  useInterval(() => {
    timerCalc();
  }, timeInterval);


const updateTitle = (event) => {
  formData.title = event.target.value;
}

  return (
    <div>
      <CardContent>
        <Box
          display="flex"
          justifyContent="left"
          alignItems="center"
          mb={3}
          style={{position: 'relative'}}
        >
          <Avatar
            className={classes.userPhoto}
            alt="User Photo"
            src=""
            variant="square"
          />
      <Box 
          style={{width:'100%'}}
      >
            <Box>
              <TextField
                size="small"
                fullWidth
                autoFocus={!formData.hasOwnProperty("isHomepage") ? true: false}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SvgIcon
                        fontSize="small"
                        color="action"
                      >
                        <PenTool />
                      </SvgIcon>
                    </InputAdornment>
                  )
                }}
                placeholder="A short awesome title..."
                variant="outlined"

                name="title"
                onChange={updateTitle}
                onClick={titleClick}
              />
            </Box>

      </Box>


        </Box>

<Divider />

        <Grid style={{paddingTop: "10px"}}
          direction="row"
          justify="center"
          alignItems="center"
          spacing={8}
          container
        >

          <Grid item style={{paddingBottom: "20px"}}>
          <Fab
            variant="extended"
            size="small"
            aria-label="add"
            color={formVar=="Artifact" ? "primary":"default"}
            style={{paddingLeft:'15px',paddingRight:'15px'}}
            onClick={() => formType('Artifact')}
          >

            Did this!&nbsp;<SvgIcon
                fontSize="small"
                //color="action"
              >
                <Artifact />
              </SvgIcon>
          </Fab>
          </Grid>

          <Grid item style={{paddingBottom: "20px"}}>
          <Fab
            variant="extended"
            size="small"
            color={formVar=="Activity" ? "primary":"default"}
            aria-label="add"
            style={{paddingLeft:'15px',paddingRight:'15px'}}
            onClick={() => formType('Activity')}
          >
            Lived this!&nbsp;<SvgIcon
                fontSize="small"
                //color="action"
              >
                <Activity />
              </SvgIcon>
          </Fab>
          </Grid>

          <Grid item style={{paddingBottom: "20px"}}>
          <Fab
            variant="extended"
            size="small"
            color={formVar=="Text" ? "primary":"default"}
            aria-label="add"
            style={{paddingLeft:'15px',paddingRight:'15px'}}
            onClick={() => formType('Text')}
          >
            Said this!&nbsp;<SvgIcon
                fontSize="small"
                //color="action"
              >
                <Text />
              </SvgIcon>
          </Fab>
          </Grid>
        </Grid>
      </CardContent>


      <Grid style={{marginTop: "20px", background:"#f4f6f8"}}
        direction="row"
        justify="center"
        alignItems="center"
        spacing={1}
        container
      >
        <Grid item xs={6}>
            <Typography variant="overline" component="p" align="right">
              Things that I <strong>{textPost[formVar]}</strong>:
            </Typography>
        </Grid>
        <Grid item xs={6}>
        <Typography variant="overline" component="p" align="left">
        <strong>{examplesText[examplesN]}</strong> this!
        </Typography>
        </Grid>
      </Grid>

      </div>







  );
};

Toolbar.propTypes = {
  className: PropTypes.string
};

export default Toolbar;
