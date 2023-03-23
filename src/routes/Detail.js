import Detail_Nav from "./Detail_nav";
import { handleCartAdd, plusAmount, cartItemOverlap } from "../store.js";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button_b from "react-bootstrap/Button";
import Alert_b from "react-bootstrap/Alert";
import Button_m from "@mui/material/Button";
import Alert_m from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";
import InputGroup from "react-bootstrap/InputGroup";

import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { height } from "@mui/system";

// const buyAlert = styled.div`
//   display: ${(props) => display};
// `;

function Detail({ shoes, alertGridStyle }) {
  const [alertOpen, setAlertOpen] = useState(false);
  const [fade, setFade] = useState("");
  const [alertFadeEnd, setAlertFadeEnd] = useState("");
  const { id } = useParams();

  const findId = shoes.find((item) => item.id == id);

  const dispatch = useDispatch();

  function AlertIcon() {
    <>
      <svg
        className="MuiSvgIcon-root MuiSvgIcon-fontSizeInherit css-1cw4hi4 alert-icon"
        focusable="false"
        aria-hidden="true"
        viewBox="0 0 24 24"
        data-testid="SuccessOutlinedIcon"
      >
        <path d="M20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4C12.76,4 13.5,4.11 14.2, 4.31L15.77,2.74C14.61,2.26 13.34,2 12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0, 0 22,12M7.91,10.08L6.5,11.5L11,16L21,6L19.59,4.58L11,13.17L7.91,10.08Z"></path>
      </svg>
    </>;
  }

  // 어려운 연산 or 서버에서 데이터 가져오는 작업 or 타이머 장착 등에 사용
  useEffect(() => {
    const timer = setTimeout(() => {
      setAlertOpen(false);
    }, 3000); // 3초 후에 alert state 기본값인 true를 false로 바꿔서 alert를 off함

    //clean up function
    return () => {
      clearTimeout(timer); // 타이머 초기화 함수
    };
  }, [alertOpen]); // alert state가 변경될 때만 실행

  // detail 페이지 로드시 opacity 효과 0 => 1로 변경
  useEffect(() => {
    setFade("end");
    return () => {
      setFade("");
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAlertFadeEnd("");
    }, 3000);
    return () => {
      clearTimeout(timer);
    };
  }, [alertFadeEnd]);

  return (
    <Container>
      <Row>
        <Col className={`${alertGridStyle}`}>
          <div className="detail-alert-area">
            <Alert_b variant="success" className={`start ${alertFadeEnd}`}>
              <AlertIcon />
              {`${findId.title} 상품을 장바구니에 담았어요!!`}
            </Alert_b>
          </div>
          <img
            className={`start ${fade} detail-body`}
            src={process.env.PUBLIC_URL + `/img/shoes${id}.jpg`}
            alt={`shoes${id}.jpg`}
            width="100%"
          />
        </Col>
        <Col className={`${alertGridStyle} detail-body`}>
          <h4 className="pt-5">{findId.title}</h4>
          <p>{findId.content}</p>
          <p>{findId.price.toLocaleString()}원</p>
          <InputGroup
            className="mb-3"
            style={{ width: "50%", marginLeft: "25%" }}
          ></InputGroup>
          <Button_m
            variant="contained"
            color="success"
            onClick={() => {
              dispatch(
                handleCartAdd({
                  id: findId.id,
                  name: findId.title,
                  price: findId.price,
                  count: 1,
                })
              );
              dispatch(plusAmount(findId.price));
              // dispatch(cartItemOverlap(findId));
              setAlertFadeEnd("end");
              setAlertOpen(true);
            }}
            title="담기"
            style={{ marginRight: "10px", padding: "5px 31px" }}
            className="btn btn-success"
          >
            <img
              style={{ height: "25px", width: "25px" }}
              src={process.env.PUBLIC_URL + `/img/put_in.png`}
            />
          </Button_m>
        </Col>
        <Detail_Nav />
      </Row>
    </Container>
  );
}

export default Detail;
