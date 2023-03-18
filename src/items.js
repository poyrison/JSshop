import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Items({ shoes, gridStyle, navigate }) {
  return (
    <Container>
      <Row>
        {shoes.map((e, i) => {
          return (
            <Col
              sm
              key={i}
              className={`${gridStyle} itemLine`} //`itemLine ${grid}`
              onClick={() => {
                navigate(`/detail/${i}`);
              }}
            >
              <img
                // public 폴더에 img를 두고 사용할 때의 권장 방법
                src={process.env.PUBLIC_URL + `/img/shoes${i}.jpg`}
                style={{ width: "80%" }}
              />
              <h4>{shoes[i].title}</h4>
              <p>{shoes[i].content}</p>
              <p>price: {shoes[i].price}</p>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}

export default Items;
