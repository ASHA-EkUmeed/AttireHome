import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Badge, Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { FaShoppingBag, FaShoppingCart, FaUser } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../slices/usersApiSlice";
import { logout } from "../../slices/authSlice";
import SearchBox from "../SearchBox";
import "../../assets/styles/component.css";

const Header = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Navbar
      className="navbar border-bottom border-black fluid-container bg-body-tertiary"
      expand="md"
      collapseOnSelect
    >
      <Container>
        {/* Logo and Brand */}
        <Nav.Link as={Link} to="/">
          <Navbar.Brand className="fontstyle">
            <h3 className="logo">
              <FaShoppingBag /> ATTIRE <span>Home</span>
            </h3>
          </Navbar.Brand>
        </Nav.Link>

        {/* Navbar Toggle Button */}
        <button
          class="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navMenu"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Content */}
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav style={{ marginLeft: "auto" }}>
            {/* Search Box */}
            <SearchBox />

            {/* Cart Link */}
            <Nav.Link as={Link} to="/cart">
              <FaShoppingCart className="mx-1" />
              Cart
              {cartItems.length > 0 && (
                <Badge pill bg="success" style={{ marginLeft: "5px" }}>
                  {cartItems.reduce((a, c) => a + c.qty, 0)}
                </Badge>
              )}
            </Nav.Link>

            {/* User and Admin Links */}
            {userInfo ? (
              // User Links
              <NavDropdown title={userInfo.name} id="username">
                <Nav.Link as={Link} to="/profile">
                  <NavDropdown.Item>Profile</NavDropdown.Item>
                </Nav.Link>
                <NavDropdown.Item onClick={logoutHandler}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              // Guest Links
              <Nav.Link as={Link} to="/login">
                <FaUser /> Login
              </Nav.Link>
            )}

            {/* Admin Links */}
            {userInfo && userInfo.isAdmin && (
              <NavDropdown title="Admin" id="adminmenu">
                <Nav.Link as={Link} to="/admin/productlist">
                  <NavDropdown.Item>Products</NavDropdown.Item>
                </Nav.Link>
                <Nav.Link as={Link} to="/admin/userlist">
                  <NavDropdown.Item>Users</NavDropdown.Item>
                </Nav.Link>
                <Nav.Link as={Link} to="/admin/orderlist">
                  <NavDropdown.Item>Orders</NavDropdown.Item>
                </Nav.Link>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
