import React, { useEffect, useState,useContext } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { lighten, makeStyles, useTheme  } from "@material-ui/core/styles";
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

import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import { useDispatch, useSelector } from "react-redux";
import { getUsersData } from "../../../actions/User";
import SearchBar from "material-ui-search-bar";
import {UserContext} from "../../../UserContext";


const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}


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
  { id: "fat", numeric: false, disablePadding: false, label: "Status" },
  { id: "region", numeric: false, disablePadding: false, label: "Region Name" },
  { id: "woreda", numeric: false, disablePadding: false, label: "Woreda Name" },
  { id: "carbs", numeric: true,  disablePadding: false},
  // { id: "action", numeric: true, disablePadding: false },
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
            checked={numSelected === rowCount && rowCount > 1}
            onChange={onSelectAllClick}
            inputProps={{ "aria-label": "select all desserts" }}
          />
        </TableCell>
        {headRows.map((row) => (
          <TableCell
            key={row.id}
            align={row.numeric ? "right" : "left"}
            padding={row.disablePadding ? "none" : "normal"}
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

const EnhancedTable = (props) => {
  let userContext = useContext(UserContext)
  const classes = useStyles();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("name");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  // const [showViewUser, setShowViewUser] = useState(false);
  // const [showDelete, setShowDelete] = useState(false);
  // let [viewLoading, setViewLoading] = useState(false);
  // let [editLoading, setEditLoading] = useState(false);
  // let [deleteId, setDeleteId] = useState();
  // let [color, setColor] = useState("#ffffff");

  const [userData, setUserData] = useState([]);
  const [searched, setSearched] = useState([]);



  const [rows, setRows] = useState([]);

  // get region data
  const dispatch = useDispatch();
  const { usersData }  = useSelector((state) => state.usersData);

  const { singleUserData }  = useSelector((state) => state.usersData);

  function createData(id,name, calories, fat , region, woreda,carbs) {
    return { id,name, calories, fat, region, woreda,carbs };
  }
  
  
  useEffect(() => {
    if(!usersData){
      dispatch(getUsersData());
      userContext.setFrmLdng(true)
    }
    if (usersData && usersData.results && usersData.results.length !== 0) {
      var data = usersData.results.map((data) =>
        createData(
          data.id,
          data.first_name && data.first_name.charAt(0).toUpperCase() + data.first_name.slice(1),
          data.username && data.username.charAt(0).toUpperCase() + data.username.slice(1),
          data.status,
          data.region_name && data.region_name.charAt(0).toUpperCase() + data.region_name.slice(1),
          data.woreda_name && data.woreda_name.charAt(0).toUpperCase() + data.woreda_name.slice(1),
          data.id
        )
      );
      setRows(data);
      setUserData(data)
      props.count(usersData.results.length)
    }
    else{
      setRows([]);
      props.count(0)
    }
    setPage(0)
    setSelected([]);
  }, [dispatch,usersData]);

  function handleRequestSort(event, property) {
    const isDesc = orderBy === property && order === "desc";
    setOrder(isDesc ? "asc" : "desc");
    setOrderBy(property);
  }

  function handleSelectAllClick(event) {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  }

  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  function getComparator(order, orderBy) {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

   //put total count of data per page that comes from API instead of 5
   if(selected.length === 5){
    props.setCheck(true)
  }
  else{
    props.setCheck(false)
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


  const requestSearch = (searchedVal) => {
    const filteredRows = userData.filter((row) => {
      let newSearchedVal = searchedVal.toLowerCase()
      return (row.name && row.name.toLowerCase().includes(newSearchedVal)) || (row.calories && row.calories.toLowerCase().includes(newSearchedVal)) || (row.fat && row.fat.toLowerCase().includes(newSearchedVal)) || (row.region && row.region.toLowerCase().includes(newSearchedVal)) || (row.woreda && row.woreda.toLowerCase().includes(newSearchedVal))
    })
    setRows(filteredRows);
    setSearched(searchedVal)
  };
  const cancelSearch = () => {
    setSearched("");
    requestSearch(searched);
    setRows(userData)
  };

  

  return (
    <>
      <div className="search_box mb-3">
          <SearchBar
            className=""
            value={searched}
            onCancelSearch={() => cancelSearch()}
            onChange={(searchVal) => requestSearch(searchVal)}
            />
          <span className="d-flex p_10">
              <svg
                width="17"
                height="17"
                viewBox="0 0 17 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.17647 1C5.95488 1 4.76073 1.36224 3.74501 2.04092C2.72929 2.7196 1.93764 3.68423 1.47016 4.81284C1.00268 5.94144 0.880361 7.18332 1.11868 8.38144C1.357 9.57956 1.94525 10.6801 2.80905 11.5439C3.67284 12.4077 4.77339 12.9959 5.9715 13.2343C7.16962 13.4726 8.4115 13.3503 9.54011 12.8828C10.6687 12.4153 11.6333 11.6236 12.312 10.6079C12.9907 9.59222 13.3529 8.39806 13.3529 7.17647C13.3528 5.5384 12.7021 3.96745 11.5438 2.80916C10.3855 1.65087 8.81454 1.0001 7.17647 1V1Z"
                  stroke="#666666"
                  strokeWidth="2"
                  strokeMiterlimit="10"
                />
                <path
                  d="M11.5883 11.5881L16 15.9999"
                  stroke="#666666"
                  strokeWidth="2"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                />
              </svg>
            </span>
         </div>
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
                {stableSort(rows, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const isItemSelected = isSelected(row.id);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.id}
                        selected={isItemSelected}
                      >
                        <TableCell
                          padding="checkbox"
                          onClick={(event) => handleClick(event, row.id)}
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
                          // onClick={() => {showViewUserModal(row.id)}}
                          // style={{cursor: "pointer"}}
                        >
                          {row.name}
                        </TableCell>
                        <TableCell align="left">{row.calories}</TableCell>
                        <TableCell align="left">{row.fat}</TableCell>
                        <TableCell align="left">{row.region}</TableCell>
                        <TableCell align="left">{row.woreda}</TableCell>
                        <TableCell align="left">
                          <div className="action_icon invisible">
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
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
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
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            ActionsComponent={TablePaginationActions}
          />
        </Paper>
      </div>
    </>
  );
};

export default EnhancedTable;
