import "./loginModal.css";

export default function LoginModal () {
  return (
    <>
    <section className="loginSection">
      <div className="loginModal">
        <h1>로그인</h1>
        <input type="email" placeholder="이메일 입력하세요"></input>
        <input type="password" placeholder="비밀번호 입력하세요"></input>
        <button>확인</button>
      </div>
    </section>
    </>
  )
}