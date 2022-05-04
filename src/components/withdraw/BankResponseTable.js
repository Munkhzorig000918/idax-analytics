import React, { useState } from 'react'
import BigNumber from "bignumber.js";
import moment from 'moment';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, Popover } from '@material-ui/core'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import { BiExport } from 'react-icons/bi'

import { downloadExcel } from '../../utils';


export default function BankResponseTable({ title, data }) {

    let searchFields = ['id', 'toAccNo', 'toAccName', 'fromAccNo', 'realAmount', 'amount', 'fee', 'success', 'msg', 'createdDate']
    
    const [isShowDropdown, setIsShowDropdown] = useState(null)
    const [selectedField, setSelectedField] = useState('Choose field')
    const [searchValue, setSearchValue] = useState('')
    const [sortedData, setSortedData] = useState(data)
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(5)

    const handleChangePage = (event, newPage) => setPage(newPage)

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const sortData = () => {
        if (searchValue.length > 0) {
            let temp = selectedField != 'createdDate' ? data.filter(s => s[selectedField] == searchValue) : data.filter(s => moment(searchValue).isSame(moment(s[selectedField]).format("YYYY-MM-DD"), 'day'))
            setSortedData(temp)
        } else {
            setSortedData(data)
        }
    }

    const handleClick = (event) => {
        setIsShowDropdown(event.currentTarget)
    }
    
    const handleClose = () => {
        setIsShowDropdown(null)
    }
    
    const open = Boolean(isShowDropdown);
    const id = open ? 'simple-popover' : undefined;

    return (
        <>
            <div className="bg-white mt-9 rounded shadow p-4 space-y-8">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-sm mb-3 text-start">{title}</h3>
                    <div className="flex items-center justify-end space-x-4">
                        <div className="">
                            <div onClick={handleClick} className="cursor-pointer flex items-center">
                                <span className="font-medium text-sm">{selectedField}</span>
                                <ArrowDropDownIcon />
                            </div>
                        </div>
                        <input onChange={(e) => setSearchValue(e.target.value)} type="text" className="border-b px-3 py-1 focus:outline-none text-sm" placeholder="search" />
                        <button onClick={() => sortData()} className="bg-blue-500 text-black font-medium text-sm rounded-md px-3 py-1">Search</button>
                        <div className="pl-10"> 
                            <BiExport className="hover:text-blue-500 cursor-pointer" onClick={() => downloadExcel("Bank-Response", sortedData)} size={25} />
                        </div>
                    </div>
                </div>
                <div>
                    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    {searchFields.map(item => <TableCell key={item}>{item}</TableCell>)}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {sortedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item) => (
                                    <TableRow key={item.id}>
                                        <TableCell>{item.id}</TableCell>
                                        <TableCell>{item.toAccNo}</TableCell>
                                        <TableCell>{item.toAccName}</TableCell>
                                        <TableCell>{item.fromAccNo}</TableCell>
                                        <TableCell>₮{new BigNumber(item.realAmount).toFormat(0)}</TableCell>
                                        <TableCell>₮{new BigNumber(item.amount).toFormat(0)}</TableCell>
                                        <TableCell>₮{new BigNumber(item.fee).toFormat(0)}</TableCell>
                                        <TableCell>{item.success ? '1' : '0'}</TableCell>
                                        <TableCell>{item.msg}</TableCell>
                                        <TableCell>{moment(item.createdDate).format("YYYY-MM-DD HH:mm:ss")}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        {sortedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).length == 0 && <p className="text-center py-4 text-sm font-medium">Хайлт олдсонгүй</p>}
                    </TableContainer>
                    <TablePagination rowsPerPageOptions={[5,10,20]} component="div" count={sortedData.length} page={page} rowsPerPage={rowsPerPage} onPageChange={handleChangePage} onRowsPerPageChange={handleChangeRowsPerPage} />
                </div>
            </div>
            <Popover
                id={id}
                open={open}
                anchorEl={isShowDropdown}
                onClose={handleClose}
                anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
                }}
                transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
                }}
            >
                <div className="flex flex-col p-4">
                    {searchFields.map(field => (
                        <span key={field} className="cursor-pointer" onClick={() => {
                            setSelectedField(field)
                            handleClose()
                        }}>{field}</span>
                    ))}
                </div>
            </Popover>
        </>
    )
}