import Detail_Nav from "./detail_nav";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import styled from "styled-components";

// const buyAlert = styled.div`
//   display: ${(props) => display};
// `;

function Detail({ shoes, alertGridStyle }) {
  const [alert, setAlert] = useState(false);
  const [alert2, setAlert2] = useState(false);
  const [textAlert, setTextAlert] = useState(false);
  const [text, setText] = useState("");
  const { id } = useParams();
  const findId = shoes.find((item) => item.id == id);

  const onlyNumCheck = () => {
    if (/[^0-9]+/.test(text)) {
      setTextAlert(true);
    } else {
      setTextAlert(false);
    }
  };

  // 어려운 연산 or 서버에서 데이터 가져오는 작업 or 타이머 장착 등에 사용
  useEffect(() => {
    const a = setTimeout(() => {
      setAlert(false);
    }, 3000); // 3초 후에 alert state 기본값인 true를 false로 바꿔서 alert를 off함

    //clean up function
    return () => {
      clearTimeout(a); // 타이머 초기화 함수
    };
  }, [alert]); // alert state가 변경될 때만 실행

  useEffect(() => {
    const buyBtn = setTimeout(() => {
      setAlert2(false);
    }, 3000);

    return () => {
      clearTimeout(buyBtn);
    };
  }, [alert2]);

  useEffect(() => {
    const inputText = setTimeout(() => {
      setTextAlert(false);
    }, 3000);

    return () => {
      clearTimeout(inputText);
    };
  }, [textAlert]);

  return (
    <Container>
      <>
        <div style={{ height: "100px", margin: "30px 0 0 0" }}>
          {alert === true ? (
            <Alert variant={"success"}>
              {`${findId.title} 상품을 장바구니에 담았어요!!`}
            </Alert>
          ) : null}
          {alert2 === true ? (
            <Alert variant={"success"}>
              {`${findId.title} 상품 주문이 완료되었어요!!`}
            </Alert>
          ) : null}
          {textAlert === true ? (
            <Alert variant={"danger"}>{`입력란에 숫자만 입력해주세요!!`}</Alert>
          ) : null}
        </div>
      </>
      <Row>
        <Col className={`${alertGridStyle}`}>
          <img
            src={process.env.PUBLIC_URL + `/img/shoes${id}.jpg`}
            alt={`shoes${id}.jpg`}
            width="100%"
          />
        </Col>
        <Col className={`${alertGridStyle}`}>
          <h4 className="pt-5">{findId.title}</h4>
          <p>{findId.content}</p>
          <p>{findId.price}</p>
          <InputGroup
            className="mb-3"
            style={{ width: "50%", marginLeft: "25%" }}
          >
            <Form.Control
              placeholder="숫자만 적어주세요"
              aria-label="숫자만 적어주세요"
              aria-describedby="basic-addon2"
              value={text}
              type="text"
              onChange={(e) => {
                setText(e.target.value);
              }}
            />
            <Button
              onClick={() => {
                setText("");
                onlyNumCheck();
              }}
              variant="outline-secondary"
              id="button-addon2"
            >
              전송
            </Button>
          </InputGroup>
          <Button
            onClick={() => {
              setAlert(true);
              setAlert2(false);
            }}
            title="담기"
            style={{ marginRight: "10px", padding: "5px 31px" }}
            className="btn btn-success"
          >
            <img
              style={{ height: "25px", width: "25px" }}
              src={process.env.PUBLIC_URL + `/img/put_in.png`}
            />
          </Button>
          <Button
            title="주문하기"
            style={{ marginRight: "10px", padding: "5px 31px" }}
            onClick={() => {
              setAlert2(true);
              setAlert(false);
            }}
            className="btn btn-success"
          >
            <img
              style={{ height: "25px", width: "25px" }}
              src={process.env.PUBLIC_URL + `/img/delivery.png`}
            />
          </Button>
        </Col>
        <Detail_Nav />
      </Row>
    </Container>
  );
}

export default Detail;
