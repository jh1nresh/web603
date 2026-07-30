import { Component } from "react";
import { Link } from "react-router-dom";
import { Alert, Button, ButtonGroup, Container, Table } from "reactstrap";

import { request } from "./api";
import Navbar from "./Navbar";

export default class InventoryList extends Component {
  state = {
    inventories: [],
    loading: true,
    error: "",
  };

  async componentDidMount() {
    try {
      const inventories = await request("/api/inventories");
      this.setState({ inventories, loading: false });
    } catch (error) {
      this.setState({ error: error.message, loading: false });
    }
  }

  removeInventory = async (id) => {
    try {
      await request(`/api/inventory/${id}`, { method: "DELETE" });
      this.setState(({ inventories }) => ({
        inventories: inventories.filter((inventory) => inventory._id !== id),
        error: "",
      }));
    } catch (error) {
      this.setState({ error: error.message });
    }
  };

  render() {
    const { inventories, loading, error } = this.state;

    return (
      <>
        <Navbar />
        <Container className="page-container">
          <Button color="success" tag={Link} to="/inventories/new">
            Add Inventory
          </Button>
          <h1>Inventory List</h1>

          {error && <Alert color="danger">{error}</Alert>}
          {loading ? (
            <p>Loading...</p>
          ) : (
            <Table hover responsive>
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {inventories.map((inventory) => (
                  <tr key={inventory._id}>
                    <td>{inventory.prodname}</td>
                    <td>{inventory.qty}</td>
                    <td>{inventory.price}</td>
                    <td>{inventory.status}</td>
                    <td>
                      <ButtonGroup size="sm">
                        <Button
                          color="primary"
                          tag={Link}
                          to={`/inventories/${inventory._id}`}
                        >
                          Edit
                        </Button>
                        <Button
                          color="danger"
                          onClick={() => this.removeInventory(inventory._id)}
                        >
                          Delete
                        </Button>
                      </ButtonGroup>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Container>
      </>
    );
  }
}
