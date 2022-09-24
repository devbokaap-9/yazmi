import React, { useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { lighten, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/Delete";
import FilterListIcon from "@material-ui/icons/FilterList";
// import ViewUserModal from "./ViewUserModal";
// import EditUserModal from "./EditUserModal";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Cupcake", "Cupcake", "User", "Active"),
  createData("Donut", "Donut", "Admin", "Active"),
  createData("Eclair", "Eclair", "User", "Active"),
  createData("Gingerbread", "Gingerbread", "User", "In-active"),
  createData("Honeycomb", "Honeycomb", "Admin", "In-active"),
];

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function getSorting(order, orderBy) {
  return order === "desc"
    ? (a, b) => desc(a, b, orderBy)
    : (a, b) => -desc(a, b, orderBy);
}

const headRows = [
  { id: "name", numeric: false, disablePadding: true, label: "Name" },
  { id: "calories", numeric: false, disablePadding: false, label: "Username" },
  { id: "carbs", numeric: false, disablePadding: false, label: "Status" },
  { id: "protein", numeric: true,  disablePadding: false},
];

function EnhancedTableHead(props) {
  const {
    classes,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ "aria-label": "select all desserts" }}
          />
        </TableCell>
        {headRows.map((row) => (
          <TableCell
            key={row.id}
            align={row.numeric ? "right" : "left"}
            padding={row.disablePadding ? "none" : "default"}
            sortDirection={orderBy === row.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === row.id}
              direction={order}
              onClick={createSortHandler(row.id)}
            >
              {row.label}
              {orderBy === row.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  spacer: {
    flex: "1 1 100%",
  },
  actions: {
    color: theme.palette.text.secondary,
  },
  title: {
    flex: "0 0 auto",
  },
}));

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { numSelected } = props;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      <div className={classes.spacer} />
      <div className={classes.actions}>
        <Tooltip title="Delete">
          <IconButton aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Filter list">
          <IconButton aria-label="filter list">
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      </div>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
    overflow: "hidden",
  },
  tableWrapper: {
    overflowX: "auto",
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
  tableRow: {
    cursor: "pointer",
  },
}));

const EnhancedTable = () => {
  const classes = useStyles();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [showViewUser, setShowViewUser] = useState(false);
  const [showEditUser, setShowEditUser] = useState(false);

  function handleRequestSort(event, property) {
    const isDesc = orderBy === property && order === "desc";
    setOrder(isDesc ? "asc" : "desc");
    setOrderBy(property);
  }

  function handleSelectAllClick(event) {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  }

  function handleClick(event, name) {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  }

  function handleChangePage(event, newPage) {
    setPage(newPage);
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(+event.target.value);
    setPage(0);
  }

  function handleChangeDense(event) {
    setDense(event.target.checked);
  }

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const showViewUserModal = () => {
    setShowViewUser(true);
  };

  const closeViewUserModal = () => {
    setShowViewUser(false);
  };

  const showEditUserModal = () => {
    setShowEditUser(true);
  };

  const closeEditUserModal = () => {
    setShowEditUser(false);
  };

  return (
    <>
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <EnhancedTableToolbar numSelected={selected.length} />
          <div className={classes.tableWrapper}>
            <Table
              className={classes.table}
              aria-labelledby="tableTitle"
              size={dense ? "small" : "medium"}
            >
              <EnhancedTableHead
                classes={classes}
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
              />
              <TableBody>
                {stableSort(rows, getSorting(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const isItemSelected = isSelected(row.name);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.name}
                        selected={isItemSelected}
                      >
                        <TableCell
                          padding="checkbox"
                          onClick={(event) => handleClick(event, row.name)}
                        >
                          <Checkbox
                            checked={isItemSelected}
                            inputProps={{ "aria-labelledby": labelId }}
                          />
                        </TableCell>
                        <TableCell
                          component="th"
                          id={labelId}
                          scope="row"
                          padding="none"
                          onClick={showViewUserModal}
                          style={{cursor: "pointer"}}
                        >
                          {row.name}
                        </TableCell>
                        <TableCell align="left">{row.calories}</TableCell>
                        <TableCell align="left">{row.fat}</TableCell>
                        <TableCell align="left">{row.carbs}</TableCell>
                        <TableCell align="left">
                          <div className="action_icon">
                            {/* <span
                              className="datatable_icon view_icon"
                              onClick={showViewUserModal}
                        {row.name}
                      </TableCell>
                      <TableCell align="left">{row.fat}</TableCell>
                      <TableCell align="left">{row.carbs}</TableCell>
                      <TableCell align="left">
                        <div className="action_icon">
                        <span className="datatable_icon view_icon" onClick={showViewUserModal}>
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye" viewBox="0 0 16 16"><path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"></path><path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"></path></svg>
                            </span>                        
                          <span className="datatable_icon delete_icon">
                            <svg
                              width="11"
                              height="14"
                              viewBox="0 0 11 14"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                className="bi bi-eye"
                                viewBox="0 0 16 16"
                              >
                                <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"></path>
                                <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"></path>
                              </svg>
                            </span> */}
                            <span className="datatable_icon delete_icon">
                              <svg
                                width="11"
                                height="14"
                                viewBox="0 0 11 14"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M11 0.777778L8.25 0.777778L7.46429 0L3.53571 0L2.75 0.777778L0 0.777778L0 2.33333L11 2.33333V0.777778ZM0.785714 12.4444C0.785714 12.857 0.951275 13.2527 1.24597 13.5444C1.54067 13.8361 1.94037 14 2.35714 14L8.64286 14C9.05963 14 9.45932 13.8361 9.75402 13.5444C10.0487 13.2527 10.2143 12.857 10.2143 12.4444L10.2143 3.11111L0.785714 3.11111L0.785714 12.4444Z"
                                  fill="#FD4F48"
                                />
                              </svg>
                            </span>
                            <span className="datatable_icon medium_icon">
                              <svg
                                width="9"
                                height="12"
                                viewBox="0 0 9 12"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M2.7 11.1429C2.7 11.3702 2.60518 11.5882 2.4364 11.7489C2.26761 11.9097 2.03869 12 1.8 12H0.9C0.661305 12 0.432387 11.9097 0.263604 11.7489C0.0948213 11.5882 0 11.3702 0 11.1429L0 0.857143C0 0.629814 0.0948213 0.411797 0.263604 0.251051C0.432387 0.090306 0.661305 0 0.9 0L1.8 0C2.03869 0 2.26761 0.090306 2.4364 0.251051C2.60518 0.411797 2.7 0.629814 2.7 0.857143L2.7 11.1429ZM9 11.1429C9 11.3702 8.90518 11.5882 8.7364 11.7489C8.56761 11.9097 8.33869 12 8.1 12H7.2C6.96131 12 6.73239 11.9097 6.5636 11.7489C6.39482 11.5882 6.3 11.3702 6.3 11.1429L6.3 0.857143C6.3 0.629814 6.39482 0.411797 6.5636 0.251051C6.73239 0.090306 6.96131 0 7.2 0L8.1 0C8.33869 0 8.56761 0.090306 8.7364 0.251051C8.90518 0.411797 9 0.629814 9 0.857143L9 11.1429Z"
                                  fill="#FFC024"
                                />
                              </svg>
                            </span>
                            <span
                              className="datatable_icon edit_icon"
                              onClick={showEditUserModal}
                            >
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M14.0488 1.95122C12.8952 0.796822 12.0288 0.969622 12.0288 0.969622L7.18716 5.81122L1.76796 11.2296L0.959961 15.0392L4.77036 14.2312L10.1896 8.81442L15.0312 3.97282C15.0304 3.97282 15.204 3.10642 14.0488 1.95122ZM4.54396 13.7736L3.24476 14.0536C3.10098 13.7777 2.91471 13.5261 2.69276 13.308C2.47448 13.0861 2.22292 12.8996 1.94716 12.7552L2.22716 11.4568L2.60316 11.0816C2.60316 11.0816 3.30956 11.096 4.10796 11.8944C4.90556 12.6912 4.92076 13.3992 4.92076 13.3992L4.54396 13.7736Z"
                                  fill="#7CD21F"
                                />
                              </svg>
                            </span>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 49 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            backIconButtonProps={{
              "aria-label": "previous page",
            }}
            nextIconButtonProps={{
              "aria-label": "next page",
            }}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Paper>
      </div>
      {/* <ViewUserModal show={showViewUser} closeModal={closeViewUserModal} />
      <EditUserModal show={showEditUser} closeModal={closeEditUserModal} /> */}
    </>
  );
};

export default EnhancedTable;
