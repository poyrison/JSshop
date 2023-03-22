import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  changeCountPlus,
  changeCountMinus,
  handleCartDelete,
  minusAmount,
} from "./../store.js";

function Cart() {
  const ITEM = useSelector((state) => state.item); // Redux
  const TOTAL_AMOUNT = useSelector((state) => state.totalAmount);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="table_body">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>No</th>
            <th>상품명</th>
            <th>판매가</th>
            <th>수량</th>
            <th>주문관리</th>
          </tr>
        </thead>
        <tbody>
          {ITEM.length == 0 ? ( // 장바구니 안의 상품의 개수가 0개라면 아래 테이블 보여주기
            <tr>
              <td colSpan={5}>
                <p className="empty_cart">장바구니에 담긴 상품이 없습니다.</p>
              </td>
            </tr>
          ) : null}
          {ITEM.map((e, i) => (
            <tr key={i} className="cart_list_item">
              <td>{i + 1}</td>
              <td>
                <div
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    navigate(`/detail/${ITEM[i].id}`);
                  }}
                >
                  <img
                    className="cart_item_img"
                    src={process.env.PUBLIC_URL + `/img/shoes${ITEM[i].id}.jpg`}
                    height="60px"
                    width="90px"
                  />
                  <b>{ITEM[i].name}</b>
                </div>
              </td>
              <td>{(ITEM[i].price * ITEM[i].count).toLocaleString()}</td>
              <td>
                <div>
                  <Button
                    variant="outline-dark"
                    className="itemNumBtn itemNumMinus"
                    onClick={() => {
                      ITEM[i].count <= 1
                        ? alert("더 이상 수량을 줄일 수 없습니다.")
                        : dispatch(changeCountMinus(ITEM[i].id));
                    }}
                  >
                    -
                  </Button>
                  {ITEM[i].count}
                  <Button
                    variant="outline-dark"
                    className=" itemNumBtn itemNumPlus"
                    onClick={() => {
                      dispatch(changeCountPlus(ITEM[i].id));
                    }}
                  >
                    +
                  </Button>
                </div>
              </td>
              <td>
                <Button
                  variant="danger"
                  className="cartDeleteBtn"
                  onClick={() => {
                    console.log(ITEM[i].price);
                    console.log(TOTAL_AMOUNT);
                    dispatch(handleCartDelete(i));
                    dispatch(minusAmount(ITEM[i].price));
                  }}
                >
                  삭제하기
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <h5 className="total_amount">
        최종 결재 금액: {TOTAL_AMOUNT.toLocaleString()}원
      </h5>
    </div>
  );
}

export default Cart;
