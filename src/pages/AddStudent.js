import React, { Component } from "react";
import "./AddStudent.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Sidebar from "./Sidebar";

class AddStudent extends Component {
  constructor() {
    super();
    this.state = {
      IdNumber: "",
      First: "",
      Last: "",
      Middle: "",
      Course: "",
      Year: "",
    };
  }

  isButtonDisabled = () =>
    !this.state.IdNumber ||
    !this.state.First ||
    !this.state.Last ||
    !this.state.Course ||
    !this.state.Year ||
    this.state.IdNumber.length !== 8;

  handleIdNumberChange = (e) => {
    const input = e.target.value;
    const numericInput = input.replace(/\D/g, "");
    const truncatedInput = numericInput.slice(0, 8);
    this.setState({ IdNumber: truncatedInput });
  };

  handleFirstNameChange = (e) => {
    const input = e.target.value;
    const lettersOnly = input.replace(/[^A-Za-z]+./g, "");
    this.setState({ First: lettersOnly });
  };

  handleLastNameChange = (e) => {
    const input = e.target.value;
    const lettersOnly = input.replace(/[^A-Za-z]+./g, "");
    this.setState({ Last: lettersOnly });
  };

  handleCourseChange = (e) => {
    const input = e.target.value;
    const allowedCharacters = input.replace(/[^A-Za-z.-]/g, "");
    this.setState({ Course: allowedCharacters.toUpperCase() });
  };

  handleYearChange = (e) => {
    this.setState({ Year: e.target.value });
  };

  handleAddStudent = async () => {
    if (this.isButtonDisabled()) {
      alert("Please fill in the required fields correctly.");
      return;
    }

    const studentData = {
      IdNumber: this.state.IdNumber,
      First: this.state.First,
      Last: this.state.Last,
      Middle: this.state.Middle,
      Course: this.state.Course,
      Year: this.state.Year,
    };

    try {
      const response = await fetch("http://localhost:1337/addStudent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(studentData),
      });
      const result = await response.json();

      if (result.success) {
        this.setState({
          IdNumber: "",
          First: "",
          Last: "",
          Middle: "",
          Course: "",
          Year: "",
        });
        alert(result.message);
      } else {
        alert("Failed to add student. Please try again.");
      }
    } catch (error) {
      console.error("Error adding student:", error);
      alert("An error occurred. Please try again.");
    }
  };

  render() {
    return (
      <div className="addstudent">
        <Sidebar />
        <div className="container">
          <h1>ADD STUDENT</h1>

          <TextField
            error={this.state.IdNumber.length !== 8}
            id="outlined-error"
            label="ID Number"
            variant="outlined"
            value={this.state.IdNumber}
            onChange={this.handleIdNumberChange}
            helperText={
              this.state.IdNumber.length !== 8
                ? "ID Number must be exactly 8 digits."
                : ""
            }
          />

          <TextField
            id="outlined-basic"
            label="First Name"
            variant="outlined"
            value={this.state.First}
            onChange={this.handleFirstNameChange}
            helperText="Firstname must not have numbers and special characters except '.'"
          />

          <TextField
            id="outlined-basic"
            label="Last Name"
            variant="outlined"
            value={this.state.Last}
            onChange={this.handleLastNameChange}
            helperText="Lastname must not have numbers and special characters except '.'"
          />
          

          <TextField
            id="outlined-basic"
            label="Middle Name"
            variant="outlined"
            value={this.state.Middle}
            onChange={(e) => this.setState({ Middle: e.target.value })}
            helperText="Optional"
          />
          
          <TextField
            id="outlined-basic"
            label="Course"
            variant="outlined"
            value={this.state.Course}
            onChange={this.handleCourseChange}
            helperText="Course must not have number and special character"
          />
         
          <TextField
            id="outlined-select-year"
            select
            label="Year"
            variant="outlined"
            value={this.state.Year}
            onChange={this.handleYearChange}
            SelectProps={{
              IconComponent: (props) => <ArrowDropDownIcon {...props} />,
            }}
          >
            {[1, 2, 3, 4, 5].map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>

          <div className="button">
            <Button
              variant="contained"
              onClick={this.handleAddStudent}
              disabled={this.isButtonDisabled()}
            >
              Add Student
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default AddStudent;
