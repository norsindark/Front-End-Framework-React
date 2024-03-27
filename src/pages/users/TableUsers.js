import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Table,
  Container,
  Row,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";
import Header from "components/Headers/Header.js";
import axios from "axios";
import { updateUser } from "services/user";

const Tables = () => {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState("");
  const [editedName, setEditedName] = useState("");
  const [editedEmail, setEditedEmail] = useState("");
  const [editedRole, setEditedRole] = useState("");
  const [editedStatus, setEditedStatus] = useState("");
  const [editedPassword, setEditedPassword] = useState("");
  const [editedStreet, setEditedStreet] = useState("");
  const [editedCity, setEditedCity] = useState("");
  const [editedCountry, setEditedCountry] = useState("");
  const [editedPostalCode, setEditedPostalCode] = useState("");
  const [editedAbout, setEditedAbout] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3001/users");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleEditUser = (userData) => {
    setEditingUser(userData);
    setEditedName(userData.name);
    setEditedEmail(userData.email);
    setEditedRole(userData.role);
    setEditedStatus(userData.status);
    setEditedPassword(userData.password);
    setEditedStreet(userData.address.street);
    setEditedCity(userData.address.city);
    setEditedCountry(userData.address.country);
    setEditedPostalCode(userData.address.postal_code);
    setEditedAbout(userData.about);
    setIsModalOpen(true);
  };

  const handleSaveEdit = async () => {
    updateUser(editingUser, editedName, editedEmail, editedRole, editedStatus, editedPassword, editedStreet, editedCity, editedCountry, editedPostalCode, editedAbout, setIsModalOpen, setEditingUser);
  };

  const handleCancelEdit = () => {
    setEditingUser(null);
    setEditedName("");
    setEditedEmail("");
    setEditedRole("");
    setEditedStatus("");
    setIsModalOpen(false);
  };

  const handleChange = (event) => {
    console.log('hi');
    const { name, value } = event.target;
    switch (name) {
      case "name":
        setEditedName(value);
        break;
      case "email":
        setEditedEmail(value);
        break;
      case "role":
        setEditedRole(value);
        break;
      case "status":
        setEditedStatus(value);
        break;
      default:
        break;
    }
  };

  const handleDeleteUser = async (userId) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this user?");
    if (isConfirmed) {
      try {
        await axios.delete(`http://localhost:3001/users/${userId}`);

        const updatedUsers = users.filter(user => user.id !== userId);
        setUsers(updatedUsers);

        window.alert("User deleted successfully!");
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  return (
    <>
      <Header />
      <Container className="mt--7" fluid>
        {/* Light Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <h3 className="mb-0">User tables</h3>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Role</th>
                    <th scope="col">Status</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {users.filter(user => user.status !== 'Banned').map(user => (
                    <tr key={user.id}>
                      <th scope="row">{user.id}</th>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.role}</td>
                      <td>{user.status}</td>
                      <td className="text-right">
                        <UncontrolledDropdown>
                          <DropdownToggle
                            className="btn-icon-only text-light"
                            href="#pablo"
                            role="button"
                            size="sm"
                            color=""
                            onClick={(e) => e.preventDefault()}
                          >
                            <i className="fas fa-ellipsis-v" />
                          </DropdownToggle>
                          <DropdownMenu className="dropdown-menu-arrow" right>
                            <DropdownItem onClick={() => handleEditUser(user)}>
                              Edit
                            </DropdownItem>
                            <DropdownItem onClick={() => handleDeleteUser(user.id)}>
                              Delete
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card>
          </div>
        </Row>

        {/* dark table */}
        <Row className="mt-5">
          <div className="col">
            <Card className="bg-default shadow">
              <CardHeader className="bg-transparent border-0">
                <h3 className="text-white mb-0">Users Banned Table</h3>
              </CardHeader>
              <Table className="align-items-center table-dark table-flush" responsive>
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Role</th>
                    <th scope="col">Status</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {users.filter(user => user.status === 'Banned').map(user => (
                    <tr key={user.id}>
                      <th scope="row">{user.id}</th>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.role}</td>
                      <td>{user.status}</td>
                      <td className="text-right">
                        <UncontrolledDropdown>
                          <DropdownToggle
                            className="btn-icon-only text-light"
                            href="#pablo"
                            role="button"
                            size="sm"
                            color=""
                            onClick={(e) => e.preventDefault()}
                          >
                            <i className="fas fa-ellipsis-v" />
                          </DropdownToggle>
                          <DropdownMenu className="dropdown-menu-arrow" right>
                            <DropdownItem onClick={() => handleEditUser(user)}>
                              Edit
                            </DropdownItem>
                            <DropdownItem onClick={() => handleDeleteUser(user.id)}>
                              Delete
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card>
          </div>
        </Row>


        {/* Modal for Edit User */}
        <Modal isOpen={isModalOpen} toggle={handleCancelEdit}>
          <ModalHeader toggle={handleCancelEdit}>Edit User</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label for="name">Name</Label>
                <Input
                  type="text"
                  name="name"
                  id="name"
                  value={editedName}
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="email">Email</Label>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  value={editedEmail}
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="role">Role</Label>
                <Input
                  type="select"
                  name="role"
                  id="role"
                  value={editedRole}
                  onChange={handleChange}
                >
                  <option value="USER">USER</option>
                  <option value="ADMIN">ADMIN</option>
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="status">Status</Label>
                <Input
                  type="select"
                  name="status"
                  id="status"
                  value={editedStatus}
                  onChange={handleChange}
                >
                  <option value="Active">Active</option>
                  <option value="UnActive">UnActive</option>
                  <option value="Banned">Banned</option>
                </Input>
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={handleSaveEdit}>Save</Button>{' '}
            <Button color="secondary" onClick={handleCancelEdit}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </Container >
    </>
  );
};

export default Tables;
