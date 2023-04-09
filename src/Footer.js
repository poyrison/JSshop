function Footer() {
  return (
    <>
      <div className="footer_wrapper">
        <div className="footer_box">
          <p>
            안녕하세요, 저는 새로운 기술과 도구에 대한 열정을 가지고 있는 신입
            프론트엔드 개발자 입니다.
            <br />
            사용자 경험을 개선하는데 관심이 많으며, 함께 성장할 수 있는 기회를
            찾고 있습니다.
          </p>
        </div>
        <div className="footer_icon_box">
          <i
            title="GitHub"
            onClick={() => {
              window.open("https://github.com/poyrison");
            }}
            className="fa-brands fa-square-github fa-2xl footer_icon"
          ></i>
          <i
            title="Instagram"
            onClick={() => {
              window.open("https://www.instagram.com/jun._.sik/");
            }}
            className="fa-brands fa-square-instagram fa-2xl footer_icon"
          ></i>
        </div>
      </div>
    </>
  );
}

export default Footer;
