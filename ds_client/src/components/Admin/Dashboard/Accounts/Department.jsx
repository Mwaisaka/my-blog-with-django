import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

export default function DepartmentTable() {
  const [departments, setDepartments] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5555/departments');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setDepartments(data);
      } catch (error) {
        console.error('Error fetching data:', error.message);
        setDepartments([]); 
      }
    };

    fetchDepartments();
  }, []); 

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="department table">
          <TableHead>
            <TableRow>
              <TableCell>Department Name</TableCell>
              <TableCell>Program</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {departments
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((department) => (
                <TableRow key={department.dept_name}>
                  <TableCell>{department.dept_name}</TableCell>
                  <TableCell>{department.program}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={departments.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
