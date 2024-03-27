import React, { useState, useEffect } from "react";
import {
  Badge,
  Card,
  CardHeader,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Progress,
  Table,
  Container,
  Row,
  UncontrolledTooltip,
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

const Products = () => {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedProduct, setEditedProduct] = useState(null);
  const [editedName, setEditedName] = useState('');
  const [editedCategory, setEditedCategory] = useState('');
  const [editedStatus, setEditedStatus] = useState('Active');
  const [editedDescription, setEditedDescription] = useState('');
  const [editedPrice, setEditedPrice] = useState('');
  const [editedImage, setEditedImage] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3001/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleEditProduct = (product) => {
    setEditedProduct(product);
    setEditedName(product.name);
    setEditedCategory(product.category_id);
    setEditedStatus(product.status);
    setIsModalOpen(true);
  };

  const handleSaveEdit = async () => {
    try {
      await axios.put(`http://localhost:3001/products/${editedProduct.id}`, {
        name: editedName,
        category_id: editedCategory,
        status: editedStatus
      });

      const updatedProducts = products.map(product => {
        if (product.id === editedProduct.id) {
          return {
            ...product,
            name: editedName,
            category_id: editedCategory,
            status: editedStatus
          };
        }
        return product;
      });

      setProducts(updatedProducts);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleCancelEdit = () => {
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'name':
        setEditedName(value);
        break;
      case 'category_id':
        setEditedCategory(value);
        break;
      case 'status':
        setEditedStatus(value);
        break;
      case 'description':
        setEditedDescription(value);
        break;
      case 'price':
        setEditedPrice(value);
        break;
      case 'image_path':
        setEditedImage(value);
        break;
      default:
        break;
    }
  };

  return (
    <>
      <Header />
      <Container className="mt--7" fluid>
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <h3 className="mb-0">Products Table</h3>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">Category</th>
                    <th scope="col">Status</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {products.map(product => (
                    <tr key={product.id}>
                      <th scope="row">{product.id}</th>
                      <td>{product.name}</td>
                      <td>{product.category_id}</td>
                      <td>{product.status}</td>
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
                            <DropdownItem onClick={() => handleEditProduct(product)}>
                              Edit
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

        {/* Modal for Edit Product */}
        <Modal isOpen={isModalOpen} toggle={handleCancelEdit}>
          <ModalHeader toggle={handleCancelEdit}>Edit Product</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label for="editedName">Name</Label>
                <Input
                  type="text"
                  name="name"
                  id="editedName"
                  value={editedName}
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="editedCategory">Category</Label>
                <Input
                  type="select"
                  name="category_id"
                  id="editedCategory"
                  value={editedCategory}
                  onChange={handleChange}
                >
                  <option value="">Select a category</option>
                  {/* Map through categories to render options */}
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="editedDescription">Description</Label>
                <Input
                  type="text"
                  name="description"
                  id="editedDescription"
                  value={editedDescription}
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="editedPrice">Price</Label>
                <Input
                  type="number"
                  name="price"
                  id="editedPrice"
                  value={editedPrice}
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="editedImage">Image Path</Label>
                <Input
                  type="text"
                  name="image_path"
                  id="editedImage"
                  value={editedImage}
                  onChange={handleChange}
                />
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

export default Products;