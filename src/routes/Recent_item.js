function Recent_item({ useNavigate }) {
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
          CART <span id="recent-title-cart-num">1</span>
        </p>
        <p className="recent-title">최근본상품</p>
        <div className="recent-item-box">
          <img
            className="recent-item"
            src={process.env.PUBLIC_URL + "/img/shoes0.jpg"}
            onClick={() => {
              navigate("/detail/0");
            }}
          />
        </div>
      </div>
    </>
  );
}

export default Recent_item;
