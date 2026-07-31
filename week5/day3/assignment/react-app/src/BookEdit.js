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

const emptyBook = {
  title: "",
  author: "",
};

export class BookEditForm extends Component {
  state = {
    book: emptyBook,
    loading: this.props.id !== "new",
    saving: false,
    error: "",
  };

  async componentDidMount() {
    if (this.props.id === "new") {
      return;
    }

    try {
      const book = await request(`/api/book/${this.props.id}`);
      this.setState({ book, loading: false });
    } catch (error) {
      this.setState({ error: error.message, loading: false });
    }
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState(({ book }) => ({
      book: { ...book, [name]: value },
    }));
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { book } = this.state;
    const isNew = this.props.id === "new";

    this.setState({ saving: true, error: "" });

    try {
      await request("/api/book", {
        method: isNew ? "POST" : "PUT",
        body: JSON.stringify(book),
      });
      this.props.navigate("/");
    } catch (error) {
      this.setState({ error: error.message, saving: false });
    }
  };

  render() {
    const { book, loading, saving, error } = this.state;
    const title = this.props.id === "new" ? "Add Book" : "Edit Book";

    return (
      <Container className="page-container form-container">
        <h1>{title}</h1>
        {error && <Alert color="danger">{error}</Alert>}
        {loading ? (
          <p>Loading...</p>
        ) : (
          <Form onSubmit={this.handleSubmit}>
            <FormGroup>
              <Label for="title">Book Title</Label>
              <Input
                id="title"
                name="title"
                value={book.title}
                onChange={this.handleChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="author">Author</Label>
              <Input
                id="author"
                name="author"
                value={book.author}
                onChange={this.handleChange}
                required
              />
            </FormGroup>
            <ButtonGroup>
              <Button color="primary" disabled={saving} type="submit">
                {saving ? "Saving..." : "Save"}
              </Button>
              <Button color="secondary" tag={Link} to="/">
                Cancel
              </Button>
            </ButtonGroup>
          </Form>
        )}
      </Container>
    );
  }
}

export default function BookEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  return <BookEditForm id={id} navigate={navigate} />;
}
