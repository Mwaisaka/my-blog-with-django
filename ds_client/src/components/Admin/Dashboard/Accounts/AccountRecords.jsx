import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

export default function TeacherSalaryTable() {
  const [teacherSalaries, setTeacherSalaries] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    const fetchTeacherSalaries = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5555/salaries');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setTeacherSalaries(data);
      } catch (error) {
        console.error('Error fetching data:', error.message);
        setTeacherSalaries([]); 
      }
    };

    fetchTeacherSalaries();
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
        <Table stickyHeader aria-label="teacher salary table">
          <TableHead>
            <TableRow>
              <TableCell>Teacher ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Salary(USD)</TableCell>
              <TableCell>Pay Date</TableCell>
              <TableCell>Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {teacherSalaries
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((teacher) => (
                <TableRow key={teacher.teacher_id}>
                  <TableCell>{teacher.teacher_id}</TableCell>
                  <TableCell>{teacher.teacher_name}</TableCell>
                  <TableCell>{teacher.salary}</TableCell>
                  <TableCell>{teacher.pay_date}</TableCell>
                  <TableCell>{teacher.description}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={teacherSalaries.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
