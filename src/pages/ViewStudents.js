import { useEffect, useState } from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import Sidebar from "./Sidebar";
import "./ViewStudents.css";

function Viewstudent() {
  const [students, setStudents] = useState([]);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editedStudent, setEditedStudent] = useState(null);

  const handleIdNumberChange = (e) => {
    const input = e.target.value;
    const numericInput = input.replace(/\D/g, "");
    const truncatedInput = numericInput.slice(0, 8);
    setEditedStudent((prevStudent) => ({
      ...prevStudent,
      IdNumber: truncatedInput,
    }));
  };

  const handleFirstNameChange = (e) => {
    const input = e.target.value;
    const lettersOnly = input.replace(/[^A-Za-z]/g, "");
    setEditedStudent((prevStudent) => ({
      ...prevStudent,
      First: lettersOnly,
    }));
  };
  const handleMiddleNameChange = (e) => {
    const input = e.target.value;
    const lettersOnly = input.replace(/[^A-Za-z]/g, "");
    setEditedStudent((prevStudent) => ({
      ...prevStudent,
      Middle: lettersOnly,
    }));
  };

  const handleLastNameChange = (e) => {
    const input = e.target.value;
    const lettersOnly = input.replace(/[^A-Za-z]/g, "");
    setEditedStudent((prevStudent) => ({
      ...prevStudent,
      Last: lettersOnly,
    }));
  };

  const handleCourseChange = (e) => {
    const input = e.target.value;
    const allowedCharacters = input.replace(/[^A-Za-z.-]/g, "");
    setEditedStudent((prevStudent) => ({
      ...prevStudent,
      Course: allowedCharacters.toUpperCase(),
    }));
  };

  const handleYearChange = (e) => {
    setEditedStudent((prevStudent) => ({
      ...prevStudent,
      Year: e.target.value,
    }));
  };

  // const handleModalInputChange = (e, field) => {
  //   setEditedStudent((prevStudent) => ({
  //     ...prevStudent,
  //     [field]: e.target.value,
  //   }));
  // };

  useEffect(() => {
    axios
      .get("http://localhost:1337/viewstudents")
      .then((response) => {
        setStudents(response.data);
      })
      .catch((error) => {
        console.error("Error fetching student data:", error);
      });
  }, []);

  const handleEditClick = (student) => {
    setEditedStudent({ ...student });
    setOpenEditDialog(true);
  };

  const handleEditClose = () => {
    setOpenEditDialog(false);
  };

  const handleInputChange = (e, field) => {
    setEditedStudent((prevStudent) => ({
      ...prevStudent,
      [field]: e.target.value,
    }));
  };

  const handleEditSave = () => {
    axios
      .put(
        `http://localhost:1337/editStudent/${editedStudent.IdNumber}`,
        editedStudent
      )
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error updating student data:", error);
      })
      .finally(() => {
        setOpenEditDialog(false);
        
        axios
          .get("http://localhost:1337/viewstudents")
          .then((response) => {
            setStudents(response.data);
          })
          .catch((error) => {
            console.error("Error fetching student data:", error);
          });
      });
  };
  

  return (
    <>
      <div className="baby">
        <Sidebar />
        <div className="babies">
          <h1>View Students</h1>

          <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: 650 }}
              size="small"
              aria-label="a dense table"
            >
              <TableHead>
                <TableRow>
                  <TableCell align="center">ID</TableCell>
                  <TableCell align="center">First Name</TableCell>
                  <TableCell align="center">Last Name</TableCell>
                  <TableCell align="center">Middle Name</TableCell>
                  <TableCell align="center">Course</TableCell>
                  <TableCell align="center">Year</TableCell>
                  <TableCell align="center">Edit Student</TableCell>
                </TableRow>
              </TableHead>
              <TableBody align="center">
                {students.map((student) => (
                  <TableRow key={student.IdNumber}>
                    <TableCell align="center">{student.IdNumber}</TableCell>
                    <TableCell align="center">
                      {openEditDialog &&
                      editedStudent?.IdNumber === student.IdNumber ? (
                        <TextField
                          value={editedStudent?.First}
                          onChange={(e) => handleInputChange(e, "First")}
                        />
                      ) : (
                        student.First
                      )}
                    </TableCell>
                    <TableCell align="center">
                      {openEditDialog &&
                      editedStudent?.IdNumber === student.IdNumber ? (
                        <TextField
                          value={editedStudent?.Last}
                          onChange={(e) => handleInputChange(e, "Last")}
                        />
                      ) : (
                        student.Last
                      )}
                    </TableCell>
                    <TableCell align="center">
                      {openEditDialog &&
                      editedStudent?.IdNumber === student.IdNumber ? (
                        <TextField
                          value={editedStudent?.Middle}
                          onChange={(e) => handleInputChange(e, "Middle")}
                        />
                      ) : (
                        student.Middle
                      )}
                    </TableCell>
                    <TableCell align="center">
                      {openEditDialog &&
                      editedStudent?.IdNumber === student.IdNumber ? (
                        <TextField
                          value={editedStudent?.Course}
                          onChange={(e) => handleInputChange(e, "Course")}
                        />
                      ) : (
                        student.Course
                      )}
                    </TableCell>
                    <TableCell align="center">
                      {openEditDialog &&
                      editedStudent?.IdNumber === student.IdNumber ? (
                        <TextField
                          value={editedStudent?.Year}
                          onChange={(e) => handleInputChange(e, "Year")}
                        />
                      ) : (
                        student.Year
                      )}
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        variant="contained"
                        onClick={() => handleEditClick(student)}
                      >
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Dialog open={openEditDialog} onClose={handleEditClose}>
            <DialogTitle><b>EDIT STUDENT</b></DialogTitle>
            <br />
            <DialogContent>
              {editedStudent && (
                <>
                  <TextField
                    label="ID Number"
                    value={editedStudent?.IdNumber}
                    onChange={handleIdNumberChange}
                    disabled
                  />
                  <br />
                  <TextField
                    label="First Name"
                    value={editedStudent?.First}
                    onChange={handleFirstNameChange}
                  />
                  <br />
                  <TextField
                    label="Last Name"
                    value={editedStudent?.Last}
                    onChange={handleLastNameChange}
                  />
                  <br />
                  <TextField
                    label="Middle Name"
                    value={editedStudent?.Middle}
                    onChange={handleMiddleNameChange}
                  />
                  <br />
                  <TextField
                    label="Course"
                    value={editedStudent?.Course}
                    onChange={handleCourseChange}
                  />
                  <br />
                  <TextField
                    label="Year"
                    value={editedStudent?.Year}
                    onChange={handleYearChange}
                  />
                  <br />
                </>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleEditClose}>Cancel</Button>
              <Button onClick={handleEditSave}>Save</Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    </>
  );
}

export default Viewstudent;
