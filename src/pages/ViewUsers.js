import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import "./ViewUsers.css";

import Sidebar from "./Sidebar";

import { Box } from "@mui/material";

function ViewUsers() {
  const [openModal, setOpenModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    middleName: "",
    email: "",
    password: "",
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  function handleCloseModal() {
    setOpenModal(false);
    setFormData({
      firstName: "",
      lastName: "",
      middleName: "",
      email: "",
      password: "",
    }); // Clear form fields
    setShowPassword(false); // Reset show password option
  }

 

  function handleInputChange(e, field) {
    const value = e.target.value;
    setFormData({ ...formData, [field]: value });
  }

  // const handleAddUser = async () => {
  //   try {
  //     const response = await axios.post("http://localhost:1337/adduser", formData);
  //       if (response.data.success) {
  //         alert(response.data.message);
  //         console.log(response.data.message); // User added successfully
  //         fetchUsers(); // Refresh user list
  //        handleCloseModal(); // Close modal and clear form
  //       } else {
  //         alert(response.data.message);
  //         console.log(response.data.message); // Error message from server
  //       }
  //   } catch (error) {
  //     console.error("Error adding user:", error);
  //   }
  // };

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    try {
      const response = await axios.get("http://localhost:1337/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }

  async function handleAddUser() {
    try {
      if (editingUser) {
        // Update existing user
        const response = await axios.put(
          `http://localhost:1337/users/${editingUser._id}`,
          formData
        );
        if (response.data) {
          alert("User updated successfully");
          fetchUsers(); // Refresh user list
          handleCloseModal(); // Close modal and clear form
        } else {
          console.log("Error updating user");
        }
      } else {
        // Add new user
        const response = await axios.post(
          "http://localhost:1337/adduser",
          formData
        );
        if (response.data.success) {
          alert(response.data.message); // User added successfully
          fetchUsers(); // Refresh user list
          handleCloseModal(); // Close modal and clear form
        } else {
          alert(response.data.message); // Error message from server
          console.log(response.data.message);
        }
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        // Server returned an error message
        alert(error.response.data.message);
        console.error("Server error:", error.response.data.message);
      } else {
        // Generic error message
        alert("An error occurred while adding/updating user.");
        console.error("Error adding/updating user:", error);
      }
    }
  }
  

  function handleAdd() {
    setOpenModal(true);
    setEditingUser(null); // Reset editing user
  }

  function handleEditUser(user) {
    setOpenModal(true);
    setEditingUser(user);
    setFormData(user); // Set form fields to user data being edited
  }

  return (
    <div className="user">
      <Sidebar />
      <div className="table-container">
        <h1>View Users</h1>
        <Button variant="contained" onClick={handleAdd}>
          Add User
        </Button>

        <div className="user">
          <div className="table-container">
            <TableContainer component={Paper}>
              <Table
                sx={{ minWidth: 650 }}
                size="small"
                aria-label="a dense table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell align="right">First Name</TableCell>
                    <TableCell align="right">Last Name</TableCell>
                    <TableCell align="right">Middle Name</TableCell>
                    <TableCell align="right">Email</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user._id}>
                      <TableCell align="right">{user.firstName}</TableCell>
                      <TableCell align="right">{user.lastName}</TableCell>
                      <TableCell align="right">{user.middleName}</TableCell>
                      <TableCell align="right">{user.email}</TableCell>
                      <TableCell align="right">
                        <Button variant="contained" onClick={() => handleEditUser(user)}>
                          EDIT
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </div>

      <Modal open={openModal} onClose={handleCloseModal}>
        <div className="modal">
          <DialogTitle className="modal-title">
            {editingUser ? "Edit User" : "Add User"}
          </DialogTitle>
          <DialogContent className="modal-content">
            <>
            <TextField
  value={formData.firstName}
  onChange={(e) => handleInputChange(e, "firstName")}
  label="First Name"
  id="firstName"
  name="firstName" // Add name prop
  variant="outlined"
  fullWidth
  margin="normal"
  required={true} // Use boolean value instead of string
/>
<TextField
  value={formData.lastName}
  onChange={(e) => handleInputChange(e, "lastName")}
  label="Last Name"
  id="lastName"
  name="lastName" // Add name prop
  variant="outlined"
  fullWidth
  margin="normal"
  required={true} // Use boolean value instead of string
/>
<TextField
  value={formData.middleName}
  onChange={(e) => handleInputChange(e, "middleName")}
  label="Middle Name"
  id="middleName"
  name="middleName" // Add name prop
  variant="outlined"
  fullWidth
  margin="normal"
  required={true} // Use boolean value instead of string
/>
<TextField
  value={formData.email}
  onChange={(e) => handleInputChange(e, "email")}
  label="Email"
  id="email"
  name="email" // Add name prop
  type="email"
  variant="outlined"
  fullWidth
  margin="normal"
  required={true} // Use boolean value instead of string
/>
<TextField
  value={formData.password}
  onChange={(e) => handleInputChange(e, "password")}
  label="Password"
  id="password"
  name="password" // Add name prop
  type={showPassword ? "text" : "password"}
  variant="outlined"
  fullWidth
  margin="normal"
  required={true} // Use boolean value instead of string
  InputProps={{
    endAdornment: (
      <Button onClick={togglePasswordVisibility}>
        {showPassword ? "Hide" : "Show"}
      </Button>
    ),
  }}
/>
            </>
          </DialogContent>
          <DialogActions className="modal-actions">
            <Button variant="contained" onClick={handleAddUser}>
              {editingUser ? "Update User" : "Add User"}
            </Button>
            <Button onClick={handleCloseModal}>Close</Button>
          </DialogActions>
        </div>
      </Modal>
    </div>
  );
}

export default ViewUsers;
