import styled from "styled-components";
import Link from "next/link";
import { useRouter } from "next/router";
import Lottie from "react-lottie-player";
import Container from "../utility/Container";

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  font-size: 18px;
  margin: auto;
  text-align: center;
`;
const A = styled.a`
  color: red;
  font-size: 13px;
  margin-top: 50px;
  cursor: pointer;
`;
const Button = styled.div`
  color: white;
  padding: 5px;
  border: 1px solid red;
  width: fit-content;
  font-size: 12px;
  text-align: center;
  margin-top: 14px;
  background: red;
  border-radius: 3px;
  font-weight: 700;
  cursor: pointer;
`;
const lottieJson = require("../../public/icons/not_found.json");

export default function Error({ status = 500 }) {
  const router = useRouter();
  function onHandleClick() {
    router.reload();
  }
  return (
    <Content>
      {status === 404 ? (
        <>
          <Lottie
            loop
            animationData={lottieJson}
            play
            style={{ width: 300, height: 300 }}
          />
          <p>
            دنبال چی می گردی <strong className="text-danger">همشهری</strong> !؟
          </p>
          <p>
            متاسفانه صفحه ای که به دنبال آن هستید یا در دسترس نیست، یا پاک شده،
            یا جا به جا شده یا ...
          </p>
          <Link href="/">
            <A>{"بازگشت به صفحه اول"}</A>
          </Link>
        </>
      ) : (
        <>
          <div>{"کجایی همشهری؟"}</div>
          <div>{"متاسفانه ارتباطمون قطع شده!"}</div>
          <div>{"لطفا یه بار دیگه تلاش کن"}</div>
          <Link href="/">
            <A>{"بازگشت به صفحه اول"}</A>
          </Link>
          <Button onChange={onHandleClick}>{"تلاش مجدد"}</Button>
        </>
      )}
    </Content>
  );
}
