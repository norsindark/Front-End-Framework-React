import React, { useState, useEffect } from "react";
import { Badge, Card, CardHeader, CardFooter, DropdownMenu, DropdownItem, UncontrolledDropdown, DropdownToggle, Media, Pagination, PaginationItem, PaginationLink, Progress, Table, Container, Row, UncontrolledTooltip, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from "reactstrap";
import Header from "components/Headers/Header.js";
import { getCategoryList, updateCategory, deleteCategory, createCategory } from "services/category";

const TableCategories = () => {
  const [categories, setCategories] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [editedName, setEditedName] = useState("");
  const [newCategoryName, setNewCategoryName] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoryList = await getCategoryList();
        setCategories(categoryList);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleEditCategory = (category) => {
    setEditingCategory(category);
    setEditedName(category.name);
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = async () => {
    const isConfirmed = window.confirm("Are you sure you want to save these changes?");
    if (isConfirmed) {
      try {
        await updateCategory(editingCategory.id, { name: editedName });

        const updatedCategories = categories.map(category =>
          category.id === editingCategory.id ? { ...category, name: editedName } : category
        );

        setCategories(updatedCategories);
        setIsEditModalOpen(false);
        setEditingCategory(null);
        setEditedName("");

        window.alert("Category updated successfully!");
      } catch (error) {
        console.error("Error updating category:", error);
      }
    }
  };

  const handleCancelEdit = () => {
    setEditingCategory(null);
    setEditedName("");
    setIsCreateModalOpen(false);
  };

  const handleChange = (event) => {
    const { value } = event.target;
    setEditedName(value);
  };

  const handleDeleteCategory = async (categoryId) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this category?");
    if (isConfirmed) {
      try {
        await deleteCategory(categoryId);

        const updatedCategories = categories.filter(category => category.id !== categoryId);
        setCategories(updatedCategories);

        window.alert("Category deleted successfully!");
      } catch (error) {
        console.error("Error deleting category:", error);
      }
    }
  };

  const toggleModal = (modalType) => {
    if (modalType === 'create') {
      setIsCreateModalOpen(!isCreateModalOpen);
    } else if (modalType === 'edit') {
      setIsEditModalOpen(!isEditModalOpen);
    }
  };

  const handleCreateCategory = async () => {
    try {
      await createCategory({ name: newCategoryName });
      toggleModal();
      setNewCategoryName('');
      const updatedCategories = await getCategoryList();
      setCategories(updatedCategories);
      window.alert("Category created successfully!");
    } catch (error) {
      console.error('Error creating category:', error);
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
                <h3 className="mb-0">Categories</h3>
              </CardHeader>
              <Button color="primary" onClick={toggleModal}>Add New Category</Button>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Name</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {categories.map(category => (
                    <tr key={category.id}>
                      <th scope="row">{category.id}</th>
                      <td>{category.name}</td>
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
                            <DropdownItem onClick={() => handleEditCategory(category)}>
                              Edit
                            </DropdownItem>
                            <DropdownItem onClick={() => handleDeleteCategory(category.id)}>
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

        {/* Modal for Edit Category */}
        <Modal isOpen={isEditModalOpen } toggle={handleCancelEdit}>
          <ModalHeader toggle={handleCancelEdit}>Edit Category</ModalHeader>
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
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={handleSaveEdit}>Save</Button>{' '}
            <Button color="secondary" onClick={handleCancelEdit}>Cancel</Button>
          </ModalFooter>
        </Modal>

        {/* Modal Create */}

        <Modal isOpen={isCreateModalOpen } toggle={toggleModal}>
          <ModalHeader toggle={toggleModal}>Create New Category</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label for="newCategoryName">Category Name</Label>
                <Input type="text" id="newCategoryName" value={newCategoryName} onChange={(e) => setNewCategoryName(e.target.value)} />
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={handleCreateCategory}>Create</Button>
            <Button color="secondary" onClick={toggleModal}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </Container>
    </>
  );
};

export default TableCategories;