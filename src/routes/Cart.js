import Table from "react-bootstrap/Table";
import Button_b from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  changeCountPlus,
  changeCountMinus,
  handleCartDelete,
  minusAmount,
  plusAmount,
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
          {ITEM.length == 0 ? ( // 장바구니 안의 상품의 개수가 0개일 때 보여 테이블
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
                <div>
                  <div className="cart_item_box">
                    <img
                      onClick={() => {
                        navigate(`/detail/${ITEM[i].id}`);
                      }}
                      id="cart_item_img"
                      src={
                        process.env.PUBLIC_URL + `/img/shoes${ITEM[i].id}.jpg`
                      }
                    />
                  </div>
                  <div className="cart_item_box">
                    <p
                      id="item_name"
                      onClick={() => {
                        navigate(`/detail/${ITEM[i].id}`);
                      }}
                    >
                      {ITEM[i].name}
                    </p>
                  </div>
                </div>
              </td>
              <td>{(ITEM[i].price * ITEM[i].count).toLocaleString()}</td>
              <td>
                <div>
                  <Button_b
                    variant="outline-dark"
                    className="itemNumBtn itemNumMinus"
                    onClick={() => {
                      {
                        ITEM[i].count <= 1
                          ? alert("더 이상 수량을 줄일 수 없습니다.")
                          : dispatch(changeCountMinus(ITEM[i].id));
                      }
                      {
                        ITEM[i].count <= 1
                          ? dispatch(minusAmount(0))
                          : dispatch(minusAmount(ITEM[i].price));
                      }
                    }}
                  >
                    -
                  </Button_b>
                  {ITEM[i].count}
                  <Button_b
                    variant="outline-dark"
                    className=" itemNumBtn itemNumPlus"
                    onClick={() => {
                      dispatch(changeCountPlus(ITEM[i].id));
                      dispatch(plusAmount(ITEM[i].price));
                    }}
                  >
                    +
                  </Button_b>
                </div>
              </td>
              <td>
                <Button_b
                  variant="outline-danger"
                  // variant="outlined"
                  color="error"
                  className="cartDeleteBtn"
                  onClick={() => {
                    dispatch(handleCartDelete(i));
                    dispatch(minusAmount(ITEM[i].price * ITEM[i].count));
                  }}
                >
                  삭제하기
                </Button_b>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <h5 className="total_amount">
        최종 결제 금액: {TOTAL_AMOUNT.toLocaleString()}원
      </h5>
    </div>
  );
}

export default Cart;
