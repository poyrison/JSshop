import { useSelector } from "react-redux";

function Recent_item({ useNavigate }) {
  const BASKET_ITEM = useSelector((state) => state.item);
  const STORAGE_PLUS = useSelector((state) => state.storage);

  const navigate = useNavigate();
  return (
    <>
      <div className="recent-box">
        <p
          className="recent-title"
          id="recent-title-cart"
          onClick={() => {
            navigate("/cart");
          }}
        >
          CART <span id="recent-title-cart-num">{`${BASKET_ITEM.length}`}</span>
        </p>
        <p className="recent-title">최근본상품</p>
        {STORAGE_PLUS.map((e, i) => {
          return (
            <div className="recent-item-box">
              <img
                className="recent-item"
                src={
                  process.env.PUBLIC_URL + `/img/shoes${STORAGE_PLUS[i].id}.jpg`
                }
                onClick={() => {
                  navigate(`/detail/${STORAGE_PLUS[i].id}`);
                }}
              />
              <p className="recent-item-title">{`${STORAGE_PLUS[i].title}`}</p>
            </div>
          );
        })}
        <a href="#" id="recent-box-top-btn">
          <div id="recent-box-top-btn">TOP▲</div>
        </a>
      </div>
    </>
  );
}

export default Recent_item;
