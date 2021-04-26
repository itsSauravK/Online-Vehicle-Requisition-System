import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  Container,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Typography,
  Button,
  TableContainer,
  LinearProgress,
  TableFooter,
  TablePagination,
} from '@material-ui/core';
import { Check, Clear } from '@material-ui/icons';
// import PageHeader from '../../components/page-header/PageHeader.component';
import TablePaginationActions from '../../components/table-pagination/TablePagination.component';

import { getAllUsers } from '../../redux/user/user.actions';

const AdminPanelUsers = ({ history }) => {
  const { users, loading } = useSelector((state) => state.userList);
  const { user } = useSelector((state) => state.userLogin);

  const dispatch = useDispatch();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    // eslint-disable-next-line
    if (user && user.isAdmin) {
      dispatch(getAllUsers());
    } else {
      history.push('/signin');
    }
  }, [dispatch, history, user]);

  return (
    <>
      {/* <PageHeader title="Admin Panel" subtitle="Users" /> */}
      <Container>
        <Typography variant="h4" color="secondary">
          Manage Users
        </Typography>
        {loading ? (
          <LinearProgress />
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <b>ID</b>
                  </TableCell>
                  <TableCell>
                    <b>Name</b>
                  </TableCell>
                  <TableCell>
                    <b>Email</b>
                  </TableCell>
                  <TableCell>
                    <b>Is Admin?</b>
                  </TableCell>
                  <TableCell>
                    <b>Actions</b>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(rowsPerPage > 0
                  ? users.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : users
                ).map((user) => (
                  <TableRow key={user._id}>
                    <TableCell>{user._id}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      {user.isAdmin ? <Check /> : <Clear />}
                    </TableCell>
                    <TableCell>
                      <Link to={`/admin/users/${user._id}`}>
                        <Button variant="contained" color="primary">
                          Edit
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[
                      5,
                      10,
                      25,
                      { label: 'All', value: -1 },
                    ]}
                    colSpan={3}
                    count={users.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    SelectProps={{
                      inputProps: { 'aria-label': 'rows per page' },
                      native: true,
                    }}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                    ActionsComponent={TablePaginationActions}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        )}
      </Container>
    </>
  );
};

export default AdminPanelUsers;