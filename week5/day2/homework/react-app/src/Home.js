import { Link } from "react-router-dom";
import { Button, Container } from "reactstrap";

import Navbar from "./Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <Container className="page-container">
        <Button color="primary" outline tag={Link} to="/inventories">
          Manage Inventory List
        </Button>
      </Container>
    </>
  );
}
