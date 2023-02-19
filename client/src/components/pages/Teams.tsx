import React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import { useGetTeamsQuery } from 'api/teams.api';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';

const HEAD_CELLS = ['Name'];

const Teams = (): JSX.Element => {
  const { data: rows = [] } = useGetTeamsQuery();
  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{mb: 2 }}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link to="/" >
            DashBoard
          </Link>
          <Typography color="text.primary">Teams</Typography>
        </Breadcrumbs>
      </Box>
      <Paper sx={{ mb: 2, ml: 2 }}>
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size="medium"
          >
            <TableHead>
              <TableRow>
                {HEAD_CELLS.map(headCell => (
                  <TableCell key={headCell}>{headCell}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map(row => (
                <TableRow key={row.id}>
                  <TableCell>{row.name}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default Teams;
