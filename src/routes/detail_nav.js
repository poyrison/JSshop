// 1. 애니메이션 동작 전 스타일을 담을 className 만들기
// 2. 애니메이션 동작 후 스타일을 담을 className 만들기
// 3. transition 속성도 추가
// 4. 원할 때 2번 탈부착

import Nav from "react-bootstrap/Nav";
import Col from "react-bootstrap/Col";
import { useEffect, useState } from "react";

const TabContent = ({ tabState }) => {
  const [fade, setFade] = useState("");

  useEffect(() => {
    const a = setTimeout(() => {
      setFade("end");
    }, 10);

    return () => {
      setTimeout(a);
      setFade("");
    };
  }, [tabState]);

  return (
    <div className={`start ${fade}`}>
      {[<div>버튼1</div>, <div>버튼2</div>, <div>버튼3</div>][tabState]}
    </div>
  );
};

function Detail_Nav() {
  const [tabState, setTabState] = useState(0);

  return (
    <>
      <Col>
        <Nav variant="tabs" defaultActiveKey="btn1">
          <Nav.Item>
            <Nav.Link
              eventKey="btn1"
              onClick={() => {
                setTabState(0);
              }}
            >
              Button1
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              eventKey="btn2"
              onClick={() => {
                setTabState(1);
              }}
            >
              Button2
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              eventKey="btn3"
              onClick={() => {
                setTabState(2);
              }}
            >
              Button3
            </Nav.Link>
          </Nav.Item>
        </Nav>
        <TabContent tabState={tabState} />
      </Col>
    </>
  );
}

export default Detail_Nav;
