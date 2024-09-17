import Image from "next/image";
import Link from "next/link";
import React from "react";
import styled from "styled-components";
import Row from "../utility/Row";
import Cookies from "js-cookie";
import Col from "../utility/Col";
import {
  color,
  ColorProps,
  fontSize,
  FontSizeProps,
  fontWeight,
  FontWeightProps,
  justifyContent,
  JustifyContentProps,
} from "styled-system";
import { useAppDispatch } from "@/store/hook";
import { showLoginModal } from "@/store/pageConfig";
const { v4: uuidv4 } = require("uuid");

const Title = styled.div<
  ColorProps | FontWeightProps | FontSizeProps | JustifyContentProps
>`
  margin: auto 0;
  z-index: 1000;
  display: flex;
  justify-content: start;
  margin-bottom: 20px;
  margin-top: 20px;
  & span {
    font-size: 16px;
    @media (max-width: 768px) {
      font-size: 14px;
      ${fontSize}
    }
    ${fontSize}
    ${fontWeight}
  }
  ${color}
  ${justifyContent}
`;
const Box = styled.div`
  width: 80%;
  margin-top: 180px;
  margin-bottom: 100px;
  margin-left: auto;
  margin-right: auto;
  @media (max-width: 768px) {
    margin: 50px auto;
    min-height: auto;
  }
`;
const CardWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  height: 253px;
  @media (max-width: 768px) {
    height: 100%;
  }
`;
const Content = styled.div`
  border-radius: 3px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: start;
  align-items: center;
  background-color: #e8e8e8;
  height: 235px;
  & > .row {
    @media (max-width: 768px) {
      flex-direction: column;
      top: 0px;
    }
  }
  @media (max-width: 1257px) {
    justify-content: center;
  }
  @media (max-width: 768px) {
    height: fit-content;
    padding: 15px;
  }
`;
const Icon = styled.div`
  right: 25px;
  top: 35px;
  z-index: 1000;
  display: flex;
  align-items: center;
  margin-left: 10px;
`;
const Img = styled.div`
  position: relative;
  z-index: 1000;
  display: flex;
  align-items: center;
  margin-left: 10px;
  @media (max-width: 1310px) {
    display: none;
  }
`;
const Container = styled.div`
  height: 65px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: white;
  border: 1px solid #707070;
  border-radius: 13px;
  @media (max-width: 768px) {
    height: 50px;
    margin-inline: 5px;
  }
`;

const links = [
  {
    title: "ثبت آگهی استخدام",
    url: "/wizard",
  },
  {
    title: "ارزیابی پیش از استخدام",
    url: "/preview",
  },
  {
    title: "بانک رزومه",
    url: "/resumeBank",
  },
  {
    title: "تعرفه خدمات",
    url: "/employer",
  },
];
export default function ManagerBox() {
  const token = Cookies.get("token");
  const dispatch = useAppDispatch();
  const handleRoute = (event: React.MouseEvent<HTMLElement>) => {
    if (!token) {
      event.preventDefault();
      dispatch(showLoginModal(true));
    }
  };

  return (
    <Box>
      <Title
        color={"#db143d"}
        fontWeight={600}
        fontSize={["16px", "18px"]}
        justifyContent={["center", "start"]}
      >
        <span>بخش کارفرمایان</span>
      </Title>
      <CardWrapper>
        <Content>
          <Row
            className="row"
            justifyContent={"flex-end"}
            height={"fit-content"}
            width={["100%", "auto"]}
          >
            {links.map((item) => (
              <Col
                pb={"8px"}
                flex={"50%"}
                key={uuidv4()}
                flexBasis={["50%", "50%"]}
              >
                {item.url === "/resumeBank" ? (
                  <Link href={item.url}>
                    <Container onClick={handleRoute}>
                      <Title fontWeight={500}>
                        <span style={{ marginRight: "10px" }}>
                          {item.title}
                        </span>
                      </Title>
                      <Icon>
                        <Image
                          src={"icons/arrow-left.svg"}
                          alt={"arrow"}
                          height={20}
                          width={20}
                        />
                      </Icon>
                    </Container>
                  </Link>
                ) : (
                  <Link href={item.url}>
                    <Container>
                      <Title fontWeight={500}>
                        <span style={{ marginRight: "10px" }}>
                          {item.title}
                        </span>
                      </Title>
                      <Icon>
                        <Image
                          src={"icons/arrow-left.svg"}
                          alt={"arrow"}
                          height={20}
                          width={20}
                        />
                      </Icon>
                    </Container>
                  </Link>
                )}
              </Col>
            ))}
          </Row>
        </Content>
        <Img>
          <Image
            style={{ position: "absolute", bottom: "18px", left: "-40px" }}
            src={"/images/employer.png"}
            alt="کارفرما"
            width={629}
            height={427}
          />
        </Img>
      </CardWrapper>
    </Box>
  );
}
