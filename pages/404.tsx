import styled from "styled-components";
import Link from "next/link";
import Lottie from "react-lottie-player";
import Container from "@/components/utility/Container";

const Content = styled.div`
  display: flex;
  flex-direction: column;
  inset: 30% 30% 0% 0%;
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
  margin: auto;
  text-align: center;
  margin-top: 14px;
  background: red;
  border-radius: 3px;
  font-weight: 700;
  cursor: pointer;
`;

const lottieJson = require("../public/icons/not_found.json");
export default function Custom404() {
  return (
    <Container display={"flex"} height={"100%"}>
      <Content>
        <Lottie
          loop
          animationData={lottieJson}
          play
          style={{ width: "fit-content", height: "fit-content" }}
        />
        <p>
          دنبال چی می گردی <strong className="text-danger">همشهری</strong> !؟
        </p>
        <p>
          متاسفانه صفحه ای که به دنبال آن هستید یا در دسترس نیست، یا پاک شده، یا
          جا به جا شده یا ...
        </p>
        <Link href="/">
          <Button>{"بازگشت به صفحه اول"}</Button>
        </Link>
      </Content>
    </Container>
  );
}
