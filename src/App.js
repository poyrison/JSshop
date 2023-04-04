import "./App.css";
import data from "./data.js";
import Items from "./items.js";
import Detail from "./routes/Detail.js";
import Cart from "./routes/Cart.js";
import Alert_Icon from "./routes/Alert_Icon.js";
import Recent_Item from "./routes/Recent_Item.js";
import MainCarousel from "./MainCarousel.js";
import MainNavbar from "./MainNavbar";
import Footer from "./Footer.js";

import { lazy, Suspense, useEffect, useState } from "react";
import { Routes, Route, Link, useNavigate, Outlet } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { useSelector } from "react-redux";

import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";

import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

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

  /** grid 클래스명 */
  const gridStyle = "col-xs-12 col-sm-12 col-md-12 col-lg-4 col-xl-4";
  /** grid 클래스명 */
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
    // localStorage.setItem("...", JSON.stringify([])); - 데이터 추가
    // localStorage.getItem("...", JSON.stringify([])); - 데이터 조회
    // localStorage.removeItem("...", JSON.stringify([])); - 데이터 삭제

    localStorage.setItem("watched-id", JSON.stringify([]));
    localStorage.setItem("watched-title", JSON.stringify([]));
  }, []);

  return (
    <div className="App">
      <MainNavbar
        navigate={navigate}
        Button={Button}
        useSelector={useSelector}
      />
      <Routes>
        <Route
          sm="true"
          path="/"
          element={
            <>
              <MainCarousel />
              <Recent_Item useNavigate={useNavigate} />
              <MoreBtnAlert>
                {textAlert === true && (
                  <Alert
                    variant={"warning"}
                    className={`start ${alertFadeEnd}`}
                    style={{ flex: 1 }}
                  >
                    <Alert_Icon />
                    <b>{`마지막 상품입니다.`}</b>
                  </Alert>
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
              <Button
                id="main_more_btn"
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
              </Button>
              <Footer />
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
              Footer={Footer}
            />
          }
        />
        <Route path="/cart" element={<Cart />} />

        {/* {404 에러 페이지} */}
        <Route
          path="*"
          element={
            <>
              <div className="err_page">
                <div className="err_page_child">⚠</div>
                <h1 className="err_page_child">알 수 없는 페이지입니다.</h1>
                <Button
                  className="err_page_child"
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
