import * as React from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import Spinner from '../components/loading/spinner';
import Error from '../components/errror/error';

import {deletePost, fetchPosts} from '../utils/fetch-posts';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import BlogDetail from 'src/components/blog/BlogDetail';
import ViewListIcon from '@mui/icons-material/ViewList';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import { ToggleButton } from '@mui/material';
import Success from 'src/components/errror/Success';




const headCells = [
  {
    id: 'id',
    numeric: false,
    disablePadding: true,
    label: 'Id',
  },
  {
    id: 'title',
    numeric: true,
    disablePadding: false,
    label: 'Title',
  },
  {
    id: 'body',
    numeric: true,
    disablePadding: false,
    label: 'Body',
  },
  {
    id: '',
    numeric: true,
    disablePadding: false,
    label: '',
  }
];

export default function Blog() {
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState(0);
  const [page, setPage] = React.useState(1);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  // DELETION USING USEMUTATION
  const deleteMutation = useMutation((postId) => deletePost(postId) )

  // PREFETCHING
  const queryClient = useQueryClient();
  React.useEffect(() => {
    const nextPage = page + 1;
    queryClient.prefetchQuery(
      ['posts', nextPage, rowsPerPage],
      () => fetchPosts(nextPage, rowsPerPage), {
        staleTime: 2000,
        keepPreviouseData: true
      }      
      )
  },[page, rowsPerPage, queryClient])
  
  /// FETCHING DATA
  const {data, isError, error, isLoading} = useQuery(
    ['posts', page, rowsPerPage], 
    () => fetchPosts(page, rowsPerPage), {
      staleTime: 2000
    })
  if(isLoading) return <Spinner />
  if(isError) return <Error detail={error.toString()} />

 

  const handleClick = (event, id) => {
    // fetch comments
    setOpen(true)
    setSelected(id);
  };
  const handleDelete = (event, id) => {
    deleteMutation.mutate(id)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage + 1);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

 

  const isSelected = (id) => selected === id;
   
  return ( 
    <>
      {open && <BlogDetail open={open} setOpen={setOpen} postId={selected} />}
      {deleteMutation.isError && <Error detail={'Error deleting the post'} />}
      {deleteMutation.isLoading && <Spinner />}
      {deleteMutation.isSuccess && <Success detail={'post successfully deleted!'} />}
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <TableHead>
            <TableRow>
              {headCells.map((headCell) => (
                <TableCell
                  key={headCell.id}
                  align={headCell.numeric ? 'right' : 'left'}
                  padding={headCell.disablePadding ? 'none' : 'normal'}
                >
                  
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
            <TableBody>
              {data?.map(eachData => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isSelected(eachData.id)}
                      tabIndex={-1}
                      key={eachData.id}
                      selected={isSelected(eachData.id)}
                    >
                      {/* <TableCell
                        component="th"
                        id={eachData.id}
                        scope="row"
                        padding="none"
                      >
                        {eachData.id}
                      </TableCell> */}
                      <TableCell padding="checkbox">
                        <ToggleButton 
                          value="list" 
                          aria-label="list"
                          onClick={(event) => handleClick(event, eachData.id)}
                          >
                          <ViewListIcon color='info' />
                        </ToggleButton>
                      </TableCell>
                      <TableCell align="left">{eachData.title}</TableCell>
                      <TableCell align="left">{eachData.body}</TableCell>
                      <TableCell align="left">
                        <ToggleButton 
                          value="list" 
                          aria-label="list"
                          onClick={(event) => handleDelete(event, eachData.id)}
                          >
                          <DeleteForeverOutlinedIcon color='error' />
                        </ToggleButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
              
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={200}
          rowsPerPage={rowsPerPage}
          page={page - 1}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      
    </Box>
    </>

  );
}
