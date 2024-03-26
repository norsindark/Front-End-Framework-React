import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Card, CardHeader, CardBody, FormGroup, Form, Input, Container, Row, Col, Modal, ModalHeader, ModalBody, ModalFooter, Label } from "reactstrap";
import UserHeader from "components/Headers/UserHeader.js";
import { useAuth } from "context/auth";
import bcrypt from "bcryptjs";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const { getUserByAccessToken } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [editedName, setEditedName] = useState("");
  const [editedEmail, setEditedEmail] = useState("");
  const [editedPassword, setEditedPassword] = useState("");
  const [editedAddress, setEditedAddress] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userEmail = await getUserByAccessToken();
        const response = await axios.get(`http://localhost:3001/users?email=${userEmail.email}`);
        const { data } = response;
        if (data && data.length > 0) {
          setUserData(data[0]);
        } else {
          console.error("User not found in database");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, [getUserByAccessToken]);

  const handleEditUser = (userData) => {
    setEditingUser(userData);
    setEditedName(userData.name);
    setEditedEmail(userData.email);
    setEditedPassword(""); 
    setEditedAddress(userData.address);
    setIsModalOpen(true);
  };

  const handleCancelEdit = () => {
    setEditingUser(null);
    setIsModalOpen(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "name":
        setEditedName(value);
        break;
      case "email":
        setEditedEmail(value);
        break;
      case "password":
        setEditedPassword(value);
        break;
      case "address":
        setEditedAddress(value);
        break;
      default:
        break;
    }
  };

  const handleSaveEdit = async () => {
    const isConfirmed = window.confirm("Are you sure you want to save these changes?");
    if (isConfirmed) {
      try {
        // Encode the password before saving
        const encodedPassword = await encodePassword(editedPassword);
        const updatedUser = {
          id: editingUser.id,
          name: editedName,
          email: editedEmail,
          role: editingUser.role,
          status: editingUser.status,
          password: encodedPassword, // Store the encoded password
          address: editedAddress,
          token: editingUser.token,
        };

        await axios.put(`http://localhost:3001/users/${editingUser.id}`, updatedUser);
        
        setIsModalOpen(false);
        setEditingUser(null);
        window.alert("User updated successfully!");
        await refreshUserData();
      } catch (error) {
        console.error("Error updating user:", error);
      }
    }
  };

  const encodePassword = async (password) => {
    try {
      const saltRounds = 10;
      const salt = await bcrypt.genSalt(saltRounds);
      const hashedPassword = await bcrypt.hash(password, salt);
      return hashedPassword;
    } catch (error) {
      console.error('Error encoding password:', error);
      throw error;
    }
  };

  const refreshUserData = async () => {
  try {
    const userEmail = await getUserByAccessToken();
    const response = await axios.get(`http://localhost:3001/users?email=${userEmail.email}`);
    const { data } = response;
    if (data && data.length > 0) {
      setUserData(data[0]);
    } else {
      console.error("User not found in database");
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};

  return (
    <>
      <UserHeader />
      <Container className="mt--7" fluid>
        {/* Profile card */}
        <Row>
          <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
            <Card className="card-profile shadow">
              <Row className="justify-content-center">
                <Col className="order-lg-2" lg="3">
                  <div className="card-profile-image">
                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                      <img
                        alt="..."
                        className="rounded-circle"
                        src={require("../../assets/img/theme/team-4-800x800.jpg")}
                      />
                    </a>
                  </div>
                </Col>
              </Row>
              <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                <div className="d-flex justify-content-between">
                  <Button
                    className="mr-4"
                    color="info"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                    size="sm"
                  >
                    Connect
                  </Button>
                  <Button
                    className="float-right"
                    color="default"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                    size="sm"
                  >
                    Message
                  </Button>
                </div>
              </CardHeader>
              <CardBody className="pt-0 pt-md-4">
                <Row>
                  <div className="col">
                    <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                      <div>
                        <span className="heading">22</span>
                        <span className="description">Friends</span>
                      </div>
                      <div>
                        <span className="heading">10</span>
                        <span className="description">Photos</span>
                      </div>
                      <div>
                        <span className="heading">89</span>
                        <span className="description">Comments</span>
                      </div>
                    </div>
                  </div>
                </Row>
                <div className="text-center">
                  <h3>
                    Jessica Jones
                    <span className="font-weight-light">, 27</span>
                  </h3>
                  <div className="h5 font-weight-300">
                    <i className="ni location_pin mr-2" />
                    Bucharest, Romania
                  </div>
                  <div className="h5 mt-4">
                    <i className="ni business_briefcase-24 mr-2" />
                    Solution Manager - Creative Tim Officer
                  </div>
                  <div>
                    <i className="ni education_hat mr-2" />
                    University of Computer Science
                  </div>
                  <hr className="my-4" />
                  <p>
                    Ryan — the name taken by Melbourne-raised, Brooklyn-based
                    Nick Murphy — writes, performs and records all of his own
                    music.
                  </p>
                  <a href="#pablo" onClick={(e) => e.preventDefault()}>
                    Show more
                  </a>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
            <Card className="card-profile shadow">
              {/* Card content */}
            </Card>
          </Col>
          <Col className="order-xl-1" xl="8">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">My account</h3>
                  </Col>
                  <Col className="text-right" xs="4">
                    <Button
                      color="primary"
                      href="#pablo"
                      onClick={() => handleEditUser(userData)}
                      size="sm"
                    >
                      Settings
                    </Button>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form>
                  {/* User information */}
                  <h6 className="heading-small text-muted mb-4">
                    User information
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            Full Name
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue={userData?.name || ""}
                            id="input-username"
                            placeholder="Username"
                            type="text"
                            disabled
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-email"
                          >
                            Email address
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue={userData?.email || ""}
                            id="input-email"
                            placeholder="Email"
                            type="email"
                            disabled
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-first-name"
                          >
                            First name
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue={userData ? userData.name.split(' ')[0] : ""}
                            id="input-first-name"
                            placeholder="First name"
                            type="text"
                            disabled
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-last-name"
                          >
                            Last name
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue={userData ? userData.name.split(' ').slice(1).join(' ') : ""}
                            id="input-last-name"
                            placeholder="Last name"
                            type="text"
                            disabled
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  <hr className="my-4" />
                  {/* Address */}
                  <h6 className="heading-small text-muted mb-4">
                    Contact information
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col md="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-address"
                          >
                            Address
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue={userData?.address || ""}
                            id="input-address"
                            placeholder="Address"
                            type="text"
                            disabled
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-city"
                          >
                            City
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue={userData?.city || ""}
                            id="input-city"
                            placeholder="City"
                            type="text"
                            disabled
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-country"
                          >
                            Country
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue={userData?.country || ""}
                            id="input-country"
                            placeholder="Country"
                            type="text"
                            disabled
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-postal-code"
                          >
                            Postal code
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue={userData?.postal_code || ""}
                            id="input-postal-code"
                            placeholder="Postal code"
                            type="number"
                            disabled
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  <hr className="my-4" />
                  {/* About Me */}
                  <h6 className="heading-small text-muted mb-4">About me</h6>
                  <div className="pl-lg-4">
                    <FormGroup>
                      <label>About Me</label>
                      <Input
                        className="form-control-alternative"
                        placeholder="A few words about you ..."
                        rows="4"
                        defaultValue={userData?.about_me || ""}
                        type="textarea"
                        disabled
                      />
                    </FormGroup>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>

        {/* Modal */}
        <Modal isOpen={isModalOpen} toggle={handleCancelEdit} backdrop="static">
          <ModalHeader toggle={handleCancelEdit}>Edit My Profile</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label for="name">Name</Label>
                <Input type="text" name="name" id="name" value={editedName} onChange={handleChange} />
              </FormGroup>
              <FormGroup>
                <Label for="email">Email</Label>
                <Input type="email" name="email" id="email" value={editedEmail} onChange={handleChange} />
              </FormGroup>
              <FormGroup>
                <Label for="password">Password</Label>
                <Input type="password" name="password" id="password" value={editedPassword} onChange={handleChange} />
              </FormGroup>
              <FormGroup>
                <Label for="address">Address</Label>
                <Input type="text" name="address" id="address" value={editedAddress} onChange={handleChange} />
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={handleSaveEdit}>Save</Button>{' '}
            <Button color="secondary" onClick={handleCancelEdit}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </Container>
    </>
  );
};

export default Profile;
