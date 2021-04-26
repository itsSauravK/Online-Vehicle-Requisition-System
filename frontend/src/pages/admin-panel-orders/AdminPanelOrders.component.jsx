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
  LinearProgress,
  TableFooter,
  TablePagination,
  TableContainer,
  makeStyles,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@material-ui/core';
import { Check, Clear, ExpandMore } from '@material-ui/icons';
//import PageHeader from '../../components/page-header/PageHeader.component';
import TablePaginationActions from '../../components/table-pagination/TablePagination.component.jsx';

import { getAllOrders } from '../../redux/order/order.actions';

const useStyles = makeStyles((theme) => ({
  accordionDetails: {
    padding: 0,
  },
  completed: {
    background: '#a5d6a7',
  },
  rejected: {
    background: '#ef9a9a',
  },
  paid: {
    background: '#81d4fa',
  },
  yetToPay: {
    background: '#ffcc80',
  },
}));

const AdminPanelOrders = ({ history }) => {
  const { orders, loading } = useSelector((state) => state.orderList);
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
    if (user && user.isAdmin) {
      dispatch(getAllOrders());
    } else {
      history.push('/signin');
    }
  }, [dispatch, history, user]);

  const classes = useStyles();

  function getTableClassName(order, classes) {
    if (!order.isPaid && order.reviewPassed) {
      return classes.yetToPay;
    } else if (!order.isDispatched && order.isPaid && order.reviewPassed) {
      return classes.paid;
    } else if (order.isDispatched && order.isPaid && order.reviewPassed) {
      return classes.completed;
    } else if (!order.underReview && !order.reviewPassed) {
      return classes.rejected;
    }
  }

  return (
    <>
      {/* <PageHeader title="Admin Panel" subtitle="Orders" /> */}
      <Container>
        <Typography gutterBottom variant="h4" color="secondary">
          Manage Orders
        </Typography>
        {loading ? (
          <LinearProgress />
        ) : (
          <>
            <Accordion elevation={0}>
              <AccordionSummary
                style={{ padding: 0 }}
                expandIcon={<ExpandMore />}
              >
                <Typography variant="h6">Order Statistics</Typography>
              </AccordionSummary>
              <AccordionDetails className={classes.accordionDetails}>
                <TableContainer>
                  <Table>
                    <TableRow>
                      <TableCell>Total Orders</TableCell>
                      <TableCell>{orders.length}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Yet To Review</TableCell>
                      <TableCell>
                        {orders.filter((order) => order.underReview).length}
                      </TableCell>
                    </TableRow>
                    <TableRow className={classes.yetToPay}>
                      <TableCell>Yet To Be Paid</TableCell>
                      <TableCell>
                        {
                          orders.filter(
                            (order) => !order.isPaid && order.reviewPassed
                          ).length
                        }
                      </TableCell>
                    </TableRow>
                    <TableRow className={classes.paid}>
                      <TableCell>Yet To Dispatch</TableCell>
                      <TableCell>
                        {
                          orders.filter(
                            (order) =>
                              !order.isDispatched &&
                              order.isPaid &&
                              order.reviewPassed
                          ).length
                        }
                      </TableCell>
                    </TableRow>
                    <TableRow className={classes.completed}>
                      <TableCell>Completed Orders</TableCell>
                      <TableCell>
                        {
                          orders.filter(
                            (order) =>
                              order.isDispatched &&
                              order.isPaid &&
                              order.reviewPassed
                          ).length
                        }
                      </TableCell>
                    </TableRow>
                    <TableRow className={classes.rejected}>
                      <TableCell>Rejected Orders</TableCell>
                      <TableCell>
                        {
                          orders.filter(
                            (order) => !order.underReview && !order.reviewPassed
                          ).length
                        }
                      </TableCell>
                    </TableRow>
                  </Table>
                </TableContainer>
              </AccordionDetails>
            </Accordion>
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
                      <b>Placed On</b>
                    </TableCell>
                    <TableCell>
                      <b>Total Cost</b>
                    </TableCell>
                    <TableCell>
                      <b>Review</b>
                    </TableCell>
                    <TableCell>
                      <b>Paid</b>
                    </TableCell>
                    <TableCell>
                      <b>Dispatched</b>
                    </TableCell>
                    <TableCell>
                      <b>Actions</b>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(rowsPerPage > 0
                    ? orders.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                    : orders
                  ).map((order) => (
                    <TableRow
                      className={getTableClassName(order, classes)}
                      key={order._id}
                    >
                      <TableCell>
                        {order._id.substring(order._id.length - 7)}
                      </TableCell>
                      <TableCell>{order.user.name}</TableCell>
                      <TableCell>{order.user.email}</TableCell>
                      <TableCell>{order.createdAt.substring(0, 10)}</TableCell>
                      <TableCell>
                        ₹ {order.adjustedTotal || order.totalPrice}
                      </TableCell>
                      <TableCell>
                        {order.underReview ? (
                          'Pending'
                        ) : order.reviewPassed ? (
                          <Check />
                        ) : (
                          <Clear />
                        )}
                      </TableCell>
                      <TableCell>
                        {order.isPaid ? <Check /> : <Clear />}
                      </TableCell>
                      <TableCell>
                        {order.isDispatched ? <Check /> : <Clear />}
                      </TableCell>
                      <TableCell>
                        <Link to={`/order/${order._id}`}>
                          <Button variant="contained" color="primary">
                            View Order
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
                      count={orders.length}
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
          </>
        )}
      </Container>
    </>
  );
};

export default AdminPanelOrders;