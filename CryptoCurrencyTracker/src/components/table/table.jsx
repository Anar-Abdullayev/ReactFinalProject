import * as React from 'react';
import './table.css'
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
import { cryptoListFetch } from '../../cryptoReducer/slices/cryptoSlicer/cryptoCurrencyFetchs';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { setCryptoId } from '../../cryptoReducer/slices/sideBarSlicer/sidebarSlicer';

const columns = [
  { id: 'rank', align: 'left', label: 'Rank' },
  { id: 'name', align: 'left', label: 'Name' },
  { id: 'symbol', align: 'left', label: 'Symbol' },
  {
    id: 'price_usd',
    label: 'Price',
    align: 'left',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'percent_change_1h',
    label: '1 h',
    align: 'left',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'percent_change_24h',
    label: '24 h',
    align: 'left',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'percent_change_7d',
    label: '7 day',
    align: 'left',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'market_cap_usd',
    label: 'Market cap',
    align: 'left',
    format: (value) => value.toFixed(2),
  },
];


function CryptoTable() {
  let { cryptoListArray, loading, error, count } = useSelector((state) => state.cryptoSlice);

  const pageCount = [10, 30, 60, 100]
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10);

  let dispatch = useDispatch()

  useEffect(() => {
    dispatch(cryptoListFetch({ start: 0, limit: rowsPerPage }))
  }, [])

  const handleChangePage = (_, newPage) => {
    dispatch(cryptoListFetch({ start: newPage * rowsPerPage, limit: rowsPerPage }))
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    dispatch(cryptoListFetch({ start: 0, limit: event.target.value }))
    setRowsPerPage(event.target.value);
    setPage(0);
  };
  
  if (loading) {
    return (
      <Box sx={{ width: 300 }}>
        <Skeleton sx={{backgroundColor: 'white'}} />
        <Skeleton sx={{backgroundColor: 'gray'}} animation="wave" />
        <Skeleton sx={{backgroundColor: 'white'}} animation={false} />
      </Box>
    )
  }
  if (error)
    return <p style={{ color: 'white' }}>Error: {error}</p>

  return (
    <Paper className='table'>
      <TableContainer sx={{ maxHeight: '100%' }} >
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  className='tableCell'
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {cryptoListArray
              .map((row) => {
                return (
                  <TableRow onClick={() => dispatch(setCryptoId(row))} hover role="checkbox" tabIndex={-1} key={row.rank} className='tableRow'>
                    {columns.map((column) => {
                      let value = row[column.id];
                      let valueClassName = column.id.startsWith('percent_change') ? value < 0 ? 'decreasedPercentageColumn' : 'increasedPercentageColumn' : 'originalColumn'
                      return (
                        <TableCell className={valueClassName} key={column.id} align={column.align}>
                          {column.id === 'price_usd' ? `${value} $` :
                            column.id.startsWith('percent_change') ? `${value} %` :
                              column.format && typeof value === 'number'
                                ? column.format(value)
                                : value}
                          {valueClassName.includes('decreasedPercentageColumn') ? <ArrowDropDownIcon/> : valueClassName.includes('increasedPercentageColumn') ? <ArrowDropUpIcon/> : <></>}
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
        rowsPerPageOptions={pageCount}
        component="div"
        count={count}
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