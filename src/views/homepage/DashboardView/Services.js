import React from 'react';
import clsx from 'clsx';
import {
  Card,
  CardContent
} from '@material-ui/core';

import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
}));

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

function createData(name, calories, fat, carbs, protein, price) {
  return {
    name,
    calories,
    fat,
    carbs,
    protein,
    price,
    history: [
      { date: '/services/api', customerId: '0.0.0.0', amount: 300, priority:2 },
      { date: '/external/api', customerId: '193.137.11.51', amount: -1, priority: 5 },
      { date: '/api', customerId: '193.154.12.33', amount: 100, priority: 3 },
      { date: '/datalake/api', customerId: 'localhost', amount: 500, priority: 4 },
    ],
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="right">{row.calories}</TableCell>
        <TableCell align="right">{row.fat}</TableCell>
        <TableCell align="right">{row.carbs}</TableCell>
        <TableCell align="right">{row.protein}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                ROUTES / ENDPOINTS
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Relative Path</TableCell>
                    <TableCell>Host</TableCell>
                    <TableCell align="right">Max Traffic</TableCell>
                    <TableCell align="right">Priority</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell component="th" scope="row">
                        {historyRow.date}
                      </TableCell>
                      <TableCell>{historyRow.customerId}</TableCell>
                      <TableCell align="right">{historyRow.amount}</TableCell>
                      <TableCell align="right">{historyRow.priority}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    calories: PropTypes.number.isRequired,
    carbs: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      }),
    ).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    protein: PropTypes.number.isRequired,
  }).isRequired,
};

const rows = [
  createData('api', 159, 52, 'auto', 'online'),
  createData('dashboard', 237, 0, 'auto', 'offline'),
  createData('crud', 262, 102, 'limit', 'online'),
  createData('json2csv', 305, 77, 'auto', 'online'),
  createData('shoppingCart', 356, 66,'fixed', 'online'),
];

const Services = ({ className, ...rest }) => {
  const classes = useStyles();

  return (
	<div className={classes.root} style={{ marginTop:0, paddingTop:0 }}>
		<h2 style={{ marginBottom:15 }}>Microservices</h2>
		<TableContainer component={Paper}>
		  <Table aria-label="collapsible table">
		    <TableHead>
		      <TableRow style={{ backgroundColor:'#000000' }}>
		        <TableCell />
		        <TableCell style={{ color:'#ffffff' }}>Namespace</TableCell>
		        <TableCell style={{ color:'#ffffff' }} align="right">Visits (Total)</TableCell>
		        <TableCell style={{ color:'#ffffff' }} align="right">Visits (Active)</TableCell>
		        <TableCell style={{ color:'#ffffff' }} align="right">Balancer Mode</TableCell>
		        <TableCell style={{ color:'#ffffff' }} align="right">State</TableCell>
		      </TableRow>
		    </TableHead>
		    <TableBody>
		      {rows.map((row) => (
		        <Row key={row.name} row={row} />
		      ))}
		    </TableBody>
		  </Table>
		</TableContainer>
	</div>
  );
};

Services.propTypes = {
  className: PropTypes.string
};

export default Services;
