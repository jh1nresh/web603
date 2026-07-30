import { Component } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Alert,
  Button,
  ButtonGroup,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";

import { request } from "./api";
import Navbar from "./Navbar";

const emptyInventory = {
  prodname: "",
  qty: "",
  price: "",
  status: "",
};

export class InventoryEditForm extends Component {
  state = {
    item: emptyInventory,
    loading: this.props.id !== "new",
    saving: false,
    error: "",
  };

  async componentDidMount() {
    if (this.props.id === "new") {
      return;
    }

    try {
      const item = await request(`/api/inventory/${this.props.id}`);
      this.setState({ item, loading: false });
    } catch (error) {
      this.setState({ error: error.message, loading: false });
    }
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState(({ item }) => ({
      item: { ...item, [name]: value },
    }));
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { item } = this.state;
    const isNew = this.props.id === "new";

    this.setState({ saving: true, error: "" });

    try {
      await request("/api/inventory", {
        method: isNew ? "POST" : "PUT",
        body: JSON.stringify(item),
      });
      this.props.navigate("/inventories");
    } catch (error) {
      this.setState({ error: error.message, saving: false });
    }
  };

  render() {
    const { item, loading, saving, error } = this.state;
    const title = this.props.id === "new" ? "Add Inventory" : "Edit Inventory";

    return (
      <>
        <Navbar />
        <Container className="page-container form-container">
          <h1>{title}</h1>
          {error && <Alert color="danger">{error}</Alert>}
          {loading ? (
            <p>Loading...</p>
          ) : (
            <Form onSubmit={this.handleSubmit}>
              <FormGroup>
                <Label for="prodname">Product Name</Label>
                <Input
                  id="prodname"
                  name="prodname"
                  value={item.prodname}
                  onChange={this.handleChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for="qty">Quantity</Label>
                <Input
                  id="qty"
                  min="0"
                  name="qty"
                  type="number"
                  value={item.qty}
                  onChange={this.handleChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for="price">Price</Label>
                <Input
                  id="price"
                  min="0"
                  name="price"
                  step="0.01"
                  type="number"
                  value={item.price}
                  onChange={this.handleChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for="status">Status</Label>
                <Input
                  id="status"
                  name="status"
                  value={item.status}
                  onChange={this.handleChange}
                  required
                />
              </FormGroup>
              <ButtonGroup>
                <Button color="primary" disabled={saving} type="submit">
                  {saving ? "Saving..." : "Save"}
                </Button>
                <Button color="secondary" tag={Link} to="/inventories">
                  Cancel
                </Button>
              </ButtonGroup>
            </Form>
          )}
        </Container>
      </>
    );
  }
}

export default function InventoryEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  return <InventoryEditForm id={id} navigate={navigate} />;
}
