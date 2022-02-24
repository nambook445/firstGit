import * as React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import axios from 'axios';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


function TablePaginationActions(props) {
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
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
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
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};



export default function CustomPaginationActionsTable() {
  const [state, setState] = React.useState([])
  const [hasError, setHasError] = React.useState(false)
  //Axios 
  React.useEffect(async () => {
    await axios.get("http://localhost:8080/api").then(res => setState(res.data.test)).catch(err => setHasError(true)).then(console.log())}, []);
    
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const rows = state;

  //Accordion component
  const [expanded, setExpanded] = React.useState(false);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  // condition 조건 렌더링시 작동안하는데 이유를 당최 모르겠네
  // const [updateMode, setUpdateMode] = React.useState(false)
  // const toggle = () => setUpdateMode(!updateMode)
  // React.useEffect(()=>{
  //   console.log(updateMode);
  // },[updateMode]);
  // const renderUpdataMode = updateMode
  // ?
  // <TextField
  //   id="outlined-multiline-static"
  //   name="description"
  //   label="수정"
  //   multiline
  //   rows={10}
  //   margin="normal"
  //   defaultValue={state.description} 
  //   sx={{width: '100%'}}
  // />
  // :
  // <TextField
  //   id="outlined-multiline-static"
  //   name="description"
  //   label="본문"
  //   multiline
  //   rows={10}
  //   margin="normal"
  //   color="success"
  //   value={state.description} 
  //   sx={{width: '100%'}}
  // />

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const [title, setTitle] = React.useState([]);
  const [description, setDescription] = React.useState([]);
  const [id, setId] = React.useState([]);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    let data ={
      id: Number(e.target.id),
      title: e.target.title.value,
      description: e.target[2].value
    };
    axios.put("http://localhost:8080/api", JSON.stringify(data), {
      headers: {
        "Content-Type": `application/json`
      }
    }
  ).then(res => console.log(res)).catch(err => setHasError(true))}
  
  // const handelSubmit = (e) => {
  //   let data = {
  //     id: state.id,
  //     title: title,
  //     description: description
  //   }
  //   e.preventDefault();
  //   axios.put("http://localhost:8080/api", JSON.stringify(data), {
  //     headers: {
  //       "Content-Type": `application/json`
  //     }}).then(res => setState(res.data.test)).catch(err => setHasError(true)),[]};
  
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
      <TableHead>
          <TableRow>
            <TableCell>Dessert (100g serving)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        <TableRow >
          <TableCell sx={{padding:0}}>
          {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map((state) => (
            <Accordion key={state.id} expanded={expanded === state.id} onChange={handleChange(state.id)}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <Typography sx={{ width: '33%', flexShrink: 0 }}>
                  {state.title}
                </Typography>
                <Typography sx={{ width: '33%', flexShrink: 0 }}>
                  {state.created}
                </Typography>
                <Typography sx={{ width: '33%', flexShrink: 0 }}>
                  {state.nickname}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>

                <form id={state.id} onSubmit={handleSubmit}>
                  <TextField 
                  id="outlined-basic" 
                  name="title" 
                  label="제목" 
                  defaultValue={state.title} 
                  onChange={(e) => {
                    setTitle(e.target.value)}} 
                  variant="outlined" 
                  margin="normal" 
                  color="success"
                  sx={{width: '100%'}} />               
                  <TextField
                    id="outlined-multiline-static"
                    name="desc"
                    label="본문"
                    defaultValue={state.description}
                    onChange={(e)=>{
                      setDescription(e.target.value);
                    }}
                    multiline
                    rows={10}
                    margin="normal"
                    color="success"
                    sx={{width: '100%'}}
                  />
                  <Button type="submit" color="success">수정</Button>
                  <Button color="error">삭제</Button>
                </form>
     
              </AccordionDetails>
            </Accordion>
          ))}
          </TableCell>
          </TableRow>
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                colSpan={3}
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: {
                    'aria-label': 'rows per page',
                  },
                  native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
      </Table>
    </TableContainer>
  );
}
