import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useSelector } from 'react-redux';
import moment from 'moment';
import '../table/table.css'

const columns = [
    { id: 'date', label: 'Date', minWidth: 170 },
    {
        id: 'price',
        label: 'Price',
        minWidth: 170,
        align: 'left',
        format: (value) => value.toFixed(2) + ' $',
    },
];

function CryptoHistoryTable() {
    const chartCryptoHistory = useSelector((state) => state.sidebarSlice.lastYearHistory)
    let reversed = [...chartCryptoHistory].reverse()
    const rows = reversed.map((item) => {
        var newItem = { date: moment.unix(item[0]).format('DD-MM-YYYY'), price: item[1]}
        return newItem
    })


    return (
        <Paper className='table'>
            <TableContainer sx={{ height: '90%' }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    className='tableCell'
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.date} className='tableRow'>
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell key={column.id} align={column.align} sx={{color:'white'}}>
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
        </Paper>
    )
}

export default CryptoHistoryTable;