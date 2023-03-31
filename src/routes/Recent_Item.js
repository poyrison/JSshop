import { useSelector } from "react-redux";

function Recent_Item({ useNavigate }) {
  const BASKET_ITEM = useSelector((state) => state.item);

  const getStorageId = JSON.parse(localStorage.getItem("watched-id"));
  const getStorageTitle = JSON.parse(localStorage.getItem("watched-title"));

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
        {/* {getStorageId.map((e, i) => {
          return (
            <div className="recent-item-box" key={i}>
              <img
                className="recent-item"
                src={
                  process.env.PUBLIC_URL + `/img/shoes${getStorageId[i]}.jpg`
                }
                alt={`${getStorageId[i]}`}
                onClick={() => {
                  navigate(`/detail/${getStorageId[i]}`);
                }}
              />
              <p className="recent-item-title">{`${getStorageTitle[i]}`}</p>
            </div>
          );
        })} */}
        <a href="#" id="recent-box-top-btn">
          <div>TOP▲</div>
        </a>
      </div>
    </>
  );
}

export default Recent_Item;
