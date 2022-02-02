import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  makeStyles
} from '@material-ui/core';
import { PenTool as PenTool } from 'react-feather';

const useStyles = makeStyles((theme) => ({
  root: {},
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  }
}));

const Toolbar = ({ className, updateForm, ...rest }) => {
  const classes = useStyles();

const generalUpdate = (event) => {
  const name = event.target.name;
  const value = event.target.value;
  updateForm(name, value);
}

  return (

      <Box 
          style={{width:'100%'}}
      >
            <Box>
              <TextField
                size="small"
                fullWidth
                autoFocus={true}
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
                onChange={generalUpdate}
              />
            </Box>

      </Box>



  );
};

Toolbar.propTypes = {
  className: PropTypes.string
};

export default Toolbar;
