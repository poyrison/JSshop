import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Offcanvas from "react-bootstrap/Offcanvas";

function MainNavbar({ navigate, Button, useSelector }) {
  const BASKET_ITEM = useSelector((state) => state.item);

  return (
    <>
      {["lg"].map((expand, i) => (
        <div style={{ height: "56px" }} key={i}>
          <Navbar
            bg="light"
            variant="light"
            expand={expand}
            id="reactHead"
            className="mb-3 navbar"
            style={{ position: "fixed", width: "100%" }}
          >
            <Container fluid>
              <Navbar.Brand
                onClick={() => {
                  navigate("/");
                }}
                style={{ cursor: "pointer", marginLeft: "15px" }}
              >
                JS Shop
              </Navbar.Brand>
              <Navbar.Toggle
                aria-controls={`offcanvasNavbar-expand-${expand}`}
              />
              <Navbar.Offcanvas
                id={`offcanvasNavbar-expand-${expand}`}
                aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                placement="end"
              >
                <Offcanvas.Header closeButton>
                  <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                    Information
                  </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                  <Nav className="justify-content-end flex-grow-1 pe-3">
                    <Nav.Link
                      title="홈으로"
                      className="navIcon"
                      onClick={() => {
                        navigate("/");
                      }}
                    >
                      <img
                        style={{
                          height: "30px",
                          width: "33px",
                          marginLeft: "-2px",
                        }}
                        src={process.env.PUBLIC_URL + `/img/home.png`}
                      />
                    </Nav.Link>
                    <Nav.Link
                      className="navIcon"
                      title="장바구니"
                      onClick={() => {
                        navigate("/cart");
                      }}
                    >
                      <img
                        style={{ height: "28px", width: "30px" }}
                        src={process.env.PUBLIC_URL + `/img/cart.png`}
                      />
                      {BASKET_ITEM.length == 0 ? null : (
                        <div className="cart_item_num">
                          {BASKET_ITEM.length}
                        </div>
                      )}
                    </Nav.Link>
                  </Nav>
                  <Form className="d-flex">
                    <Form.Control
                      type="search"
                      placeholder="Search"
                      className="me-2"
                      aria-label="Search"
                    />
                    <Button variant="outline-success">Search</Button>
                  </Form>
                </Offcanvas.Body>
              </Navbar.Offcanvas>
            </Container>
          </Navbar>
        </div>
      ))}
    </>
  );
}

export default MainNavbar;
