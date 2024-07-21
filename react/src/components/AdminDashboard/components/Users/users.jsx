import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, FormGroup, Label } from 'reactstrap';
import { fetchUsers, addUser, updateUser, deleteUser } from '../../../../slices/adminDashboard/adminSlice'; // Adjust the import path

const Users = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.adminDashboard.users);
  const status = useSelector((state) => state.adminDashboard.status);
  const error = useSelector((state) => state.adminDashboard.error);

  const [modalOpen, setModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleAddUser = () => {
    setModalOpen(true);
    setEditMode(false);
    setCurrentUser(null);
  };

  const handleEditUser = (user) => {
    setModalOpen(true);
    setEditMode(true);
    setCurrentUser(user);
  };

  const handleDeleteUser = (id) => {
    dispatch(deleteUser(id));
  };

  const handleSaveUser = () => {
    if (editMode) {
      dispatch(updateUser(currentUser));
    } else {
      dispatch(addUser(currentUser));
    }
    setModalOpen(false);
  };

  return (
    <div>
      <Button color="primary" onClick={handleAddUser}>Add User</Button>
      <Table striped>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.first_name} {user.last_name}</td>
              <td>{user.email}</td>
              <td>
                <Button color="warning" onClick={() => handleEditUser(user)}>Edit</Button>
                <Button color="danger" onClick={() => handleDeleteUser(user.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal isOpen={modalOpen} toggle={() => setModalOpen(!modalOpen)}>
        <ModalHeader toggle={() => setModalOpen(!modalOpen)}>
          {editMode ? 'Edit User' : 'Add User'}
        </ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="first_name">First Name</Label>
            <Input
              id="first_name"
              value={currentUser?.first_name || ''}
              onChange={(e) => setCurrentUser({ ...currentUser, first_name: e.target.value })}
            />
          </FormGroup>
          <FormGroup>
            <Label for="last_name">Last Name</Label>
            <Input
              id="last_name"
              value={currentUser?.last_name || ''}
              onChange={(e) => setCurrentUser({ ...currentUser, last_name: e.target.value })}
            />
          </FormGroup>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input
              id="email"
              value={currentUser?.email || ''}
              onChange={(e) => setCurrentUser({ ...currentUser, email: e.target.value })}
            />
          </FormGroup>
          {/* Add more fields as needed */}
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleSaveUser}>Save</Button>
          <Button color="secondary" onClick={() => setModalOpen(!modalOpen)}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default Users;
