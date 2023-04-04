import { useSelector } from "react-redux";

function Recent_Item({ useNavigate }) {
  const BASKET_ITEM = useSelector((state) => state.item);

  const getStorageId = JSON.parse(localStorage.getItem("watched-id"));
  const getStorageTitle = JSON.parse(localStorage.getItem("watched-title"));

  const navigate = useNavigate();
  return (
    <>
      <div className="recent_box">
        <p
          className="recent_title"
          id="recent_title_cart"
          onClick={() => {
            navigate("/cart");
          }}
        >
          CART <span id="recent_title_cart_num">{`${BASKET_ITEM.length}`}</span>
        </p>
        <p className="recent_title">최근본상품</p>
        {getStorageId &&
          getStorageId.map((e, i) => {
            return (
              <div className="recent_item_box" key={i}>
                <img
                  className="recent_item"
                  src={
                    process.env.PUBLIC_URL + `/img/shoes${getStorageId[i]}.jpg`
                  }
                  alt={`${getStorageId[i]}`}
                  onClick={() => {
                    navigate(`/detail/${getStorageId[i]}`);
                    console.log(getStorageId);
                  }}
                />
                <p className="recent_item_title">{`${getStorageTitle[i]}`}</p>
              </div>
            );
          })}
        <a href="#" id="recent_box_top_btn">
          <div>TOP▲</div>
        </a>
      </div>
    </>
  );
}

export default Recent_Item;
