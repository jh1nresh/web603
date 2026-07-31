import { Component } from "react";
import { Link } from "react-router-dom";
import { Alert, Button, ButtonGroup, Container, Table } from "reactstrap";

import { request } from "./api";

export default class BookList extends Component {
  state = {
    books: [],
    loading: true,
    error: "",
  };

  async componentDidMount() {
    try {
      const books = await request("/api/books");
      this.setState({ books, loading: false });
    } catch (error) {
      this.setState({ error: error.message, loading: false });
    }
  }

  removeBook = async (id) => {
    try {
      await request(`/api/book/${id}`, { method: "DELETE" });
      this.setState(({ books }) => ({
        books: books.filter((book) => book._id !== id),
        error: "",
      }));
    } catch (error) {
      this.setState({ error: error.message });
    }
  };

  render() {
    const { books, loading, error } = this.state;

    return (
      <Container className="page-container">
        <Button color="primary" tag={Link} to="/books/new">
          Add Book
        </Button>
        <h1>Book List</h1>

        {error && <Alert color="danger">{error}</Alert>}
        {loading ? (
          <p>Loading...</p>
        ) : (
          <Table hover responsive>
            <thead>
              <tr>
                <th>Book Title</th>
                <th>Author</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr key={book._id}>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>
                    <ButtonGroup size="sm">
                      <Button
                        color="info"
                        tag={Link}
                        to={`/books/${book._id}`}
                      >
                        Edit
                      </Button>
                      <Button
                        color="warning"
                        onClick={() => this.removeBook(book._id)}
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
    );
  }
}
