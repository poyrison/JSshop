import "./App.css";
import { useEffect, useState } from "react";
import { Routes, Route, Link, useNavigate, Outlet } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

import data from "./data.js";
import Items from "./items.js";
import Detail from "./routes/detail.js";

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Offcanvas from "react-bootstrap/Offcanvas";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";

const MoreBtn = styled.button`
  border-radius: 5px 5px 25px 25px;
  width: 200px;
  margin-bottom: 30px;
`;

const MoreBtnAlert = styled.div`
  width: 50%;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, 0);
`;

function App() {
  const [shoes, setShoes] = useState(data);
  const [dataClick, setDataClick] = useState(2);
  const [loadingIcon, setLoadingIcon] = useState(false);
  const [textAlert, setTextAlert] = useState(false);

  /** grid 클래스명 */
  const gridStyle = "col-xs-12 col-sm-12 col-md-12 col-lg-4 col-xl-4";
  const alertGridStyle = "col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-6";

  // navigate(-1) 이전페이지, navigate(1) 이후페이지
  const navigate = useNavigate(); // 변수에 할당하여 사용해야함

  useEffect(() => {
    const alertTimer = setTimeout(() => {
      setTextAlert(false);
    }, 2000);
    return () => {
      clearTimeout(alertTimer);
    };
  }, [textAlert]);

  return (
    <div className="App">
      {/* lg에 해당하는 navbar style 적용 */}
      {["lg"].map((expand, i) => (
        <div style={{ height: "56px" }} key={i}>
          <Navbar
            bg="dark"
            variant="dark"
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
                style={{ cursor: "pointer" }}
              >
                <img
                  src="https://camo.githubusercontent.com/cbb0ed4ed73eb0bdf880019fe4fd13e0e0b0812435f11ac0d920c8f523a8d8d0/68747470733a2f2f74656368737461636b2d67656e657261746f722e76657263656c2e6170702f72656163742d69636f6e2e737667"
                  alt="icon"
                  width="30"
                  height="30"
                  className="d-inline-block align-top"
                  data-canonical-src="https://techstack-generator.vercel.app/react-icon.svg"
                />
                React Shop
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
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="https://github.com/poyrison/react_shop/">
                      Link
                    </Nav.Link>
                    <NavDropdown
                      title="Dropdown"
                      id={`offcanvasNavbarDropdown-expand-${expand}`}
                    >
                      <NavDropdown.Item href="#action3">
                        Action
                      </NavDropdown.Item>
                      <NavDropdown.Item href="#action4">
                        Another action
                      </NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item href="#action5">
                        Something else here
                      </NavDropdown.Item>
                    </NavDropdown>
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
      <Routes>
        <Route
          sm="true"
          path="/"
          element={
            <>
              <div className="main-bg" />
              <MoreBtnAlert>
                {textAlert === true ? (
                  <Alert variant={"warning"}>
                    <b>{`마지막 상품입니다.`}</b>
                  </Alert>
                ) : null}
              </MoreBtnAlert>
              {loadingIcon === true ? (
                <img
                  style={{
                    position: "fixed",
                    left: "50%",
                    transform: "translate(-50%, 0)",
                  }}
                  src="https://camo.githubusercontent.com/cbb0ed4ed73eb0bdf880019fe4fd13e0e0b0812435f11ac0d920c8f523a8d8d0/68747470733a2f2f74656368737461636b2d67656e657261746f722e76657263656c2e6170702f72656163742d69636f6e2e737667"
                  alt="icon"
                  width="100"
                  height="100"
                  data-canonical-src="https://techstack-generator.vercel.app/react-icon.svg"
                />
              ) : null}
              <Items shoes={shoes} navigate={navigate} gridStyle={gridStyle} />
              <MoreBtn
                onClick={() => {
                  setLoadingIcon(true);
                  setDataClick(dataClick + 1);
                  axios
                    .get(
                      `https://codingapple1.github.io/shop/data${dataClick}.json`
                    )
                    .then((result) => {
                      const newShoes = [...shoes, ...result.data];
                      setShoes(newShoes);
                      setLoadingIcon(false);
                    })
                    .catch(() => {
                      setLoadingIcon(false);
                      setTextAlert(true);
                    });
                }}
              >
                More
              </MoreBtn>
            </>
          }
        />
        <Route
          // URL 파라미터, useParams 사용, :이후 마음대로 작명 가능
          path="/detail/:id"
          element={
            <Detail
              shoes={shoes}
              gridStyle={gridStyle}
              alertGridStyle={alertGridStyle}
            />
          }
        />

        {/* {404 에러 페이지} */}
        <Route
          path="*"
          element={
            <>
              <div className="err-page">
                <div
                  style={{
                    fontSize: "40px",
                    marginBottom: "15px",
                  }}
                >
                  ⚠
                </div>
                <h1>알 수 없는 페이지입니다.</h1>
                <Button
                  onClick={() => {
                    navigate(-1);
                  }}
                  variant="info"
                >
                  이전 페이지로
                </Button>
              </div>
            </>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
