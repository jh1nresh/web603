import { Link } from "react-router-dom";
import {
  Navbar as BootstrapNavbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";

export default function Navbar() {
  return (
    <BootstrapNavbar color="dark" dark expand="md">
      <NavbarBrand tag={Link} to="/">
        Home
      </NavbarBrand>
      <Nav className="ms-auto" navbar>
        <NavItem>
          <NavLink tag={Link} to="/inventories">
            Inventory List
          </NavLink>
        </NavItem>
      </Nav>
    </BootstrapNavbar>
  );
}
