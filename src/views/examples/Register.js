import React, { useState } from "react";
import { Button, Card, CardBody, Col, FormGroup, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from "reactstrap";
import axios from "axios";
import validator from "validator";
import bcrypt from "bcryptjs";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("USER");
  const [status, setStatus] = useState("IsActive");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const errors = {};

    if (!name.trim()) {
      errors.name = "Name is required";
    }

    if (!email.trim()) {
      errors.email = "Email is required";
    } else if (!validator.isEmail(email)) {
      errors.email = "Invalid email format";
    }

    if (!password.trim()) {
      errors.password = "Password is required";
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters long";
    }

    if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    return errors;
  };

  const validateEmail = async () => {
    try {
      const existingUsers = await axios.get("http://localhost:3001/users");
      const isEmailExists = existingUsers.data.some((user) => user.email === email);
      if (isEmailExists) {
        return { email: "Email already exists" };
      }
      return {};
    } catch (error) {
      console.error("Error checking existing email:", error);
      return { email: "Error checking existing email" };
    }
  }

  const handleRegister = async () => {
    const validationErrors = validateForm();
  
    if (Object.keys(validationErrors).length === 0) {
      const validationEmail = await validateEmail();
  
      if (Object.keys(validationEmail).length === 0) {
        try {
          const salt = await bcrypt.genSalt(10); 
          const hashedPassword = await bcrypt.hash(password, salt);
          const randomToken = Math.random().toString(36).substring(2);
  
          const newUser = { name, email, password: hashedPassword, role, status,address, token: randomToken }; 
          await axios.post("http://localhost:3001/users", newUser);
          alert("User created successfully!");
          setName("");
          setEmail("");
          setPassword("");
          setConfirmPassword("");
          setRole("");
          setAddress("");
          setErrors("");
        } catch (error) {
          console.error("Error creating user:", error);
          alert("An error occurred while creating user");
        }
      } else {
        setErrors(validationEmail);
      }
    } else {
      setErrors(validationErrors);
    }
  };
  

  return (
    <>
      <Col lg="6" md="8">
        <Card className="bg-secondary shadow border-0">
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-muted text-center mt-2 mb-4">
              <small>Sign up with</small>
            </div>
            <Form role="form">
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-hat-3" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  {errors.name && <div className="text-danger">{errors.name}</div>}
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Email"
                    type="email"
                    autoComplete="new-email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {errors.email && <div className="text-danger">{errors.email}</div>}
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Password"
                    type="password"
                    autoComplete="new-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {errors.password && <div className="text-danger">{errors.password}</div>}
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Confirm Password"
                    type="password"
                    autoComplete="new-password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  {errors.confirmPassword && <div className="text-danger">{errors.confirmPassword}</div>}
                </InputGroup>
              </FormGroup>
              <div className="text-center">
                <Button
                  className="mt-4"
                  color="primary"
                  type="button"
                  onClick={handleRegister}
                >
                  Create account
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </>
  );
};

export default Register;
