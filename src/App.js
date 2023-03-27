import "./App.css";
import { useEffect, useState } from "react";
import { Routes, Route, Link, useNavigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import styled from "styled-components";
import axios from "axios";

import data from "./data.js";
import Items from "./items.js";
import Detail from "./routes/Detail.js";
import Cart from "./routes/Cart.js";
import Alert_icon from "./routes/Alert_icon.js";
import Recent_item from "./routes/Recent_item.js";

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Offcanvas from "react-bootstrap/Offcanvas";
import Alert_b from "react-bootstrap/Alert";
import Button_b from "react-bootstrap/Button";
import Carousel from "react-bootstrap/Carousel";

import Button_m from "@mui/material/Button";

import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const MoreBtn = styled.button`
  border: 1px solid;
  width: 200px;
  margin-bottom: 30px;
`;

const MoreBtnAlert = styled.div`
  width: 50%;
  position: fixed;
  display: flex;
  left: 50%;
  top: 45%;
  transform: translate(-50%, 0);
`;

function App() {
  const [shoes, setShoes] = useState(data);
  const [dataClick, setDataClick] = useState(2);
  const [loadingIcon, setLoadingIcon] = useState(false);
  const [textAlert, setTextAlert] = useState(false);
  const [alertFadeEnd, setAlertFadeEnd] = useState("");

  const BASKET_ITEM = useSelector((state) => state.item);

  /** grid 클래스명 */
  const gridStyle = "col-xs-12 col-sm-12 col-md-12 col-lg-4 col-xl-4";
  const alertGridStyle = "col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-6";

  // navigate(-1) 이전페이지, navigate(1) 이후페이지
  const navigate = useNavigate(); // 변수에 할당하여 사용해야함

  useEffect(() => {
    const alertTimer = setTimeout(() => {
      setTextAlert(false);
    }, 3000);
    return () => {
      clearTimeout(alertTimer);
    };
  }, [textAlert]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAlertFadeEnd("");
    }, 2000);
    return () => {
      clearTimeout(timer);
    };
  }, [alertFadeEnd]);

  useEffect(() => {
    localStorage.setItem("watched", JSON.stringify([]));
  });

  return (
    <div className="App">
      {/* lg에 해당하는 navbar style 적용 */}
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
                JS˙s Shop
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
                        <div className="cartItemsNum">{BASKET_ITEM.length}</div>
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
                    <Button_b variant="outline-success">Search</Button_b>
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
              <Carousel className="main-carousel">
                <Carousel.Item>
                  <div id="bg1" className="bg-img" />
                </Carousel.Item>
                <Carousel.Item>
                  <div id="bg2" className="bg-img" />
                </Carousel.Item>
                <Carousel.Item>
                  <div id="bg3" className="bg-img" />
                </Carousel.Item>
                <Carousel.Item>
                  <div id="bg4" className="bg-img" />
                </Carousel.Item>
              </Carousel>
              <Recent_item useNavigate={useNavigate} />
              <MoreBtnAlert>
                {textAlert === true && (
                  <Alert_b
                    variant={"warning"}
                    className={`start ${alertFadeEnd}`}
                    style={{ flex: 1 }}
                  >
                    <Alert_icon />
                    <b>{`마지막 상품입니다.`}</b>
                  </Alert_b>
                )}
              </MoreBtnAlert>
              <Backdrop
                sx={{
                  color: "#fff",
                  zIndex: (theme) => theme.zIndex.drawer + 1,
                }}
                open={loadingIcon}
                className="backdrop"
              >
                <CircularProgress color="inherit" />
              </Backdrop>
              <Items shoes={shoes} navigate={navigate} gridStyle={gridStyle} />
              <Button_b
                id="main-more-btn"
                variant="outline-dark"
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
                      setTimeout(() => {
                        setLoadingIcon(false);
                      }, 300);
                    })
                    .catch(() => {
                      setTimeout(() => {
                        setLoadingIcon(false);
                      }, 300);
                      setTextAlert(true);
                      setTimeout(() => {
                        setAlertFadeEnd("end");
                      }, 10);
                    });
                }}
              >
                펼쳐보기
              </Button_b>
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
        <Route path="/cart" element={<Cart />} />

        {/* {404 에러 페이지} */}
        <Route
          path="*"
          element={
            <>
              <div className="err-page">
                <div className="err-page-child">⚠</div>
                <h1 className="err-page-child">알 수 없는 페이지입니다.</h1>
                <Button_b
                  className="err-page-child"
                  onClick={() => {
                    navigate(-1);
                  }}
                  variant="info"
                >
                  이전 페이지로
                </Button_b>
              </div>
            </>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
