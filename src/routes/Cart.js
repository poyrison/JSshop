import Table from "react-bootstrap/Table";
import { useSelector } from "react-redux";

function Cart() {
  const ITEM = useSelector((state) => state.item);

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>No</th>
          <th>상품명</th>
          <th>수량</th>
          <th>변경하기</th>
        </tr>
      </thead>
      <tbody>
        {ITEM.map((e, i) => {
          return (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>{ITEM[i].name}</td>
              <td>{ITEM[i].count}</td>
              <td>변경</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}

export default Cart;
