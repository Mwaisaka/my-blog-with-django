import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";

export default function TeacherStudentTables() {
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);
  const [teacherPage, setTeacherPage] = useState(0);
  const [studentPage, setStudentPage] = useState(0);
  const [teacherRowsPerPage, setTeacherRowsPerPage] = useState(10);
  const [studentRowsPerPage, setStudentRowsPerPage] = useState(10);
  const [open, setOpen] = useState(false);
  const [editedStudent, setEditedStudent] = useState(null);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5555/salaries");
        if (!response.ok) {
          throw new Error("Failed to fetch teachers data");
        }
        const data = await response.json();
        const formattedTeachers = data.map((teacher) => ({
          teacher_id: teacher.teacher_id,
          teacher_name: teacher.teacher_name,
          salary: teacher.salary,
          description: teacher.description,
        }));
        setTeachers(formattedTeachers);
      } catch (error) {
        console.error("Error fetching teachers data:", error.message);
        setTeachers([]);
      }
    };

    const fetchStudents = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5555/accounting_report");
        if (!response.ok) {
          throw new Error("Failed to fetch students data");
        }
        const data = await response.json();
        setStudents(data);
      } catch (error) {
        console.error("Error fetching students data:", error.message);
        setStudents([]);
      }
    };

    fetchTeachers();
    fetchStudents();
  }, []);

  const handleTeacherDelete = async (teacherId) => {
    try {
      const response = await fetch(`http://127.0.0.1:5555/admin/${teacherId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        alert("Teacher deleted successfully");
        setTeachers((prevTeachers) =>
          prevTeachers.filter((teacher) => teacher.teacher_id !== teacherId)
        );
      } else {
        throw new Error("Failed to delete teacher");
      }
    } catch (error) {
      console.error("Error deleting teacher:", error.message);
    }
  };

  const handleStudentDelete = async (studentId) => {
    try {
      const response = await fetch(`http://127.0.0.1:5555/admin/${studentId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        alert("Student deleted successfully");
        setStudents(
          students.filter((student) => student.student_id !== studentId)
        );
      } else {
        throw new Error("Failed to delete student");
      }
    } catch (error) {
      console.error("Error deleting student:", error.message);
    }
  };

  const handleEdit = (student) => {
    setEditedStudent(student);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditedStudent(null);
  };

  const handleSaveChanges = async () => {
    try {
        const response = await fetch(`http://127.0.0.1:5555/admin/${editedStudent.student_id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                account_name: editedStudent.account_name,
                accounting_status_perterm: editedStudent.accounting_status_perterm,
                amount_paid: editedStudent.amount_paid,
                balance: editedStudent.balance,
            }),
        });

        if (response.ok) {
            alert("Changes saved successfully");
            setOpen(false);
            setEditedStudent(null);
            setStudents((prevStudents) =>
                prevStudents.map((student) =>
                    student.student_id === editedStudent.student_id ? editedStudent : student
                )
            );
        } else {
            throw new Error("Failed to save changes");
        }
    } catch (error) {
        console.error("Error saving changes:", error.message);
        alert("Failed to save changes. Please try again later.");
    }
};
  
  

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div>
        <h2>Teachers</h2>
        <Paper style={{ width: "100%", overflow: "hidden" }}>
          <TableContainer>
            <Table stickyHeader aria-label="teacher table">
              <TableHead>
                <TableRow>
                  <TableCell>Teacher ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Salary</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {teachers
                  .slice(
                    teacherPage * teacherRowsPerPage,
                    teacherPage * teacherRowsPerPage + teacherRowsPerPage
                  )
                  .map((teacher) => (
                    <TableRow key={teacher.teacher_id}>
                      <TableCell>{teacher.teacher_id}</TableCell>
                      <TableCell>{teacher.teacher_name}</TableCell>
                      <TableCell>{teacher.salary}</TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          color="secondary"
                          sx={{ bgcolor: '#FF5722', color: '#fff', '&:hover': { bgcolor: '#FF7043' } }}
                          startIcon={<DeleteIcon />}
                          onClick={() => handleTeacherDelete(teacher.teacher_id)}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={teachers.length}
            rowsPerPage={teacherRowsPerPage}
            page={teacherPage}
            onPageChange={(event, newPage) => setTeacherPage(newPage)}
            onRowsPerPageChange={(event) => {
              setTeacherRowsPerPage(+event.target.value);
              setTeacherPage(0);
            }}
          />
        </Paper>
      </div>

      <div>
        <h2>Students</h2>
        <Paper style={{ width: "90%", overflow: "hidden" }}>
          <TableContainer>
            <Table stickyHeader aria-label="student table">
              <TableHead>
                <TableRow>
                  <TableCell>Student ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Fee Status</TableCell>
                  <TableCell>Paid</TableCell>
                  <TableCell>Balance</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {students
                  .slice(
                    studentPage * studentRowsPerPage,
                    studentPage * studentRowsPerPage + studentRowsPerPage
                  )
                  .map((student) => (
                    <TableRow key={student.student_id}>
                      <TableCell>{student.student_id}</TableCell>
                      <TableCell>{student.name}</TableCell>
                      <TableCell>{student.fee_status}</TableCell>
                      <TableCell>{student.paid}</TableCell>
                      <TableCell>{student.balance}</TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          color="secondary"
                          sx={{ bgcolor: '#FF5722', color: '#fff', '&:hover': { bgcolor: '#FF7043' } }}
                          startIcon={<DeleteIcon />}
                          onClick={() => handleStudentDelete(student.student_id)}
                        >
                          Delete
                        </Button>
                        <Button
                          variant="contained"
                          color="primary"
                          startIcon={<EditIcon />}
                          onClick={() => handleEdit(student)}
                          style={{ marginLeft: "8px" }}
                        >
                          Edit
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={students.length}
            rowsPerPage={studentRowsPerPage}
            page={studentPage}
            onPageChange={(event, newPage) => setStudentPage(newPage)}
            onRowsPerPageChange={(event) => {
              setStudentRowsPerPage(+event.target.value);
              setStudentPage(0);
            }}
          />
        </Paper>
      </div>

      {/* Edit Student Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Student</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            fullWidth
            value={editedStudent ? editedStudent.name : ""}
            disabled
          />
          <TextField
            margin="dense"
            label="Fee Status"
            fullWidth
            value={editedStudent ? editedStudent.fee_status : ""}
            onChange={(e) => setEditedStudent({...editedStudent, fee_status: e.target.value})}
          />
          <TextField
            margin="dense"
            label="Paid"
            fullWidth
            value={editedStudent ? editedStudent.paid : ""}
            onChange={(e) => setEditedStudent({...editedStudent, paid: e.target.value})}
          />
          <TextField
            margin="dense"
            label="Balance"
            fullWidth
            value={editedStudent ? editedStudent.balance : ""}
            onChange={(e) => setEditedStudent({...editedStudent, balance: e.target.value})}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSaveChanges} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
