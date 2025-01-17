import * as React from 'react';
import { getCryptoList } from '../../cryptoReducer/slices/cryptoCurrencySlicer';
import { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useDispatch, useSelector } from 'react-redux'
import { cryptoListFetch } from '../../cryptoReducer/slices/cryptoCurrencyFetchs';

const columns = [
  { id: 'rank', label: 'Rank', minWidth: 0, maxWidth: 20},
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'code', label: 'ISO\u00a0Code', minWidth: 100 },
  {
    id: 'population',
    label: 'Population',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'size',
    label: 'Size\u00a0(km\u00b2)',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'density',
    label: 'Density',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
];


function CryptoTable() {
  let {cryptoListArray, loading, error} = useSelector((state) => state.cryptoSlice);
  console.log(cryptoListArray);
  let dispatch = useDispatch()
  useEffect(() => {
    dispatch(cryptoListFetch())
  },[])

  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    console.log(event.target.value);
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  if (loading)
    return <p>Loading...</p>
  if (error)
    return <p>Error: {error}</p>

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', backgroundColor: '#121825', marginTop: '35px', borderRadius: '18px' }}>
      <TableContainer sx={{ maxHeight: '100%' }} >
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                  sx={{ backgroundColor: '#121825', color: 'white' }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {cryptoListArray
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow  hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align} sx={{ color: 'white' }}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={cryptoListArray.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{ color: 'white' }}
      />
    </Paper>
  );
}

export default CryptoTable;