function Recent_item({ useNavigate }) {
  const navigate = useNavigate();
  return (
    <>
      <div className="recent-item-box">
        <p
          className="recent-title"
          id="recent-title-cart"
          onClick={() => {
            navigate("/cart");
          }}
        >
          CART <div id="recent-title-cart-num">0</div>
        </p>
        <p className="recent-title">최근본상품</p>
      </div>
      {/* <img
          className="recent-item"
          src={process.env.PUBLIC_URL + `/img/shoes0.jpg`}
        >
          1
        </img> */}
    </>
  );
}

export default Recent_item;
