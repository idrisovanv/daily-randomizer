import React, { useState } from 'react';
import { useGetDevelopersQuery } from 'api/developers.api';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TablePagination from '@mui/material/TablePagination';
import TableHead from '@mui/material/TableHead';
import { DEVELOPER_ROLE_LABELS, DEVELOPER_STATUS_LABELS } from 'constants/developers';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Modal from 'components/ui/Modal';
import DeveloperForm from 'components/forms/DeveloperForm';
import { useGetTeamsQuery } from 'api/teams.api';
import { IDeveloper } from 'interfaces/developers.interface';
import RandomizerForm from 'components/forms/RandomizerForm';

const HEAD_CELLS = ['Name', 'Email', 'Role', 'Status', 'Team'];

const Developers = (): JSX.Element => {
  const [page, setPage] = useState(0);
  const [perPage, setRowsPerPage] = useState(5);
  const [developer, setDeveloper] = useState<IDeveloper>();
  const { data: { rows, count } = { rows: [], count: 0 } } = useGetDevelopersQuery({ page, perPage });
  const handleChangePage = (event: unknown, newPage: number): void => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const [developerModalOpen, setDeveloperModalOpen] = useState(false);
  const handleDeveloperModalOpen = (): void => setDeveloperModalOpen(true);
  const handleDeveloperModalClose = (): void => {
    setDeveloperModalOpen(false);
    setDeveloper(undefined);
  };
  const showDeveloperDetails = (developer: IDeveloper) => (): void => {
    setDeveloper(developer);
    handleDeveloperModalOpen();
  };

  const [randomizerModalOpen, setRandomizerModalOpen] = useState(false);
  const handleRandomizerModalOpen = (): void => setRandomizerModalOpen(true);
  const handleRandomizerModalClose = (): void => setRandomizerModalOpen(false);

  const { data: teams = [] } = useGetTeamsQuery();
  return (
    <Box sx={{ width: '100%' }}>
      <Stack spacing={2} direction="row" sx={{ mb: 2 }}>
        <Breadcrumbs aria-label="breadcrumb" sx={{ marginRight: 'auto' }}>
          <Link to="/" >
            DashBoard
          </Link>
          <Typography color="text.primary">Developers</Typography>
        </Breadcrumbs>
        <Button variant="outlined" onClick={handleRandomizerModalOpen}>Name randomizer</Button>
        <Button variant="contained" onClick={handleDeveloperModalOpen}>Create new user</Button>
        <Modal open={randomizerModalOpen} handleClose={handleRandomizerModalClose} title="Name randomizer">
          <RandomizerForm handleClose={handleRandomizerModalClose} />
        </Modal>
        <Modal open={developerModalOpen} handleClose={handleDeveloperModalClose} title={developer ? 'Edit user' : 'Create new user'} >
          <DeveloperForm developer={developer} teams={teams} handleClose={handleDeveloperModalClose} />
        </Modal>
      </Stack>
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
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map(row => (
                <TableRow key={row.id}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{DEVELOPER_ROLE_LABELS[row.role ]}</TableCell>
                  <TableCell>{DEVELOPER_STATUS_LABELS[row.status]}</TableCell>
                  <TableCell>{teams.find(t => t.id === row.teamId)?.name}</TableCell>
                  <TableCell><Button onClick={showDeveloperDetails(row)}>View/Edit</Button></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[1, 5, 10, 25, 100]}
          component="div"
          count={count}
          rowsPerPage={perPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
};

export default Developers;
