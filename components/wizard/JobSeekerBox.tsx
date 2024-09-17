import Image from "next/image";
import Link from "next/link";
import React from "react";
import styled from "styled-components";
import Row from "../utility/Row";
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
import Cookies from "js-cookie";
import { useAppDispatch } from "@/store/hook";
import { showLoginModal } from "@/store/pageConfig";
const { v4: uuidv4 } = require("uuid");

const Title = styled.div<
  ColorProps | FontWeightProps | FontSizeProps | JustifyContentProps
>`
  margin: auto 0;
  z-index: 1000;
  display: flex;
  justify-content: end;
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
  margin-top: 10px;
  margin-left: auto;
  margin-right: auto;
  @media (max-width: 768px) {
    margin-top: 0px;
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
  justify-content: end;
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
  right: 25px;
  bottom: 109px;
  z-index: 1000;
  display: flex;
  align-items: center;
  margin-left: 10px;
  @media (max-width: 1310px) {
    display: none;
  }
`;
const Container = styled.div`
  // width: 220px;
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
    title: "معرفی شرکت ها",
    url: "/companies",
  },
  {
    title: "محاسبه حقوق و دستمزد",
    url: "/calculatePayments",
  },
  {
    title: "شرکت در آزمون",
    url: "/exams",
  },
  {
    title: "رزومه ساز",
    url: "/cv-builder",
  },
];
export default function JobSeekerBox() {
  const token = Cookies.get("token");
  const dispatch = useAppDispatch();
  const handlecvBuilder = (event: React.MouseEvent<HTMLElement>) => {
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
        justifyContent={["center", "end"]}
      >
        <span>بخش کارجویان</span>
      </Title>
      <CardWrapper>
        <Img>
          <Image
            style={{ position: "absolute" }}
            src={"/images/jobFinder.png"}
            alt="کارجو"
            width={450}
            height={650}
          />
        </Img>
        <Content>
          <Row
            className="row"
            justifyContent={"flex-end"}
            height={"fit-content"}
            width={["100%", "auto"]}
          >
            {links.map((item) => (
              <Col
                // flexGrow={1}
                // flexShrink={1}
                pb={"8px"}
                // maxWidth={["100%", "100%", "50%", "33.3%", "25%"]}
                // flexBasis={["50%", "50%", "50%", "50%", "50%"]}
                flex={"50%"}
                key={uuidv4()}
                flexBasis={["50%", "50%"]}
              >
                {item.url === "/cv-builder" ? (
                  <Link href={item.url}>
                    <Container onClick={handlecvBuilder}>
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
      </CardWrapper>
    </Box>
  );
}
