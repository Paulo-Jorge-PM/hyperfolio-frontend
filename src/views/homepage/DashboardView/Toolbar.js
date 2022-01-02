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

const Toolbar = ({ className, ...rest }) => {
  const classes = useStyles();

  return (

      <Box 
          style={{width:'100%'}}
      >
            <Box>
              <TextField
                size="small"
                fullWidth
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
                placeholder="Share your creations"
                variant="outlined"
              />
            </Box>

      </Box>



  );
};

Toolbar.propTypes = {
  className: PropTypes.string
};

export default Toolbar;
