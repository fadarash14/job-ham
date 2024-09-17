import React from "react";
import styled from "styled-components";

const Container = styled.div`
  background: #f5f6fa;
  color: #474546;
  border-radius: 15px;
`;
const Title = styled.div`
  font-size: 18px;
  font-weight: 700;
  padding: 15px 20px 0px 0px;
`;
const Body = styled.div`
  font-size: 16px;
  padding: 0px 20px 10px 20px;
  text-align: justify;
  text-justify: inter-word;
  & p {
    line-height: 30px;
  }
`;

interface IProps {
  url: string;
  content: string;
}

export default function AboutCard(props: IProps) {
  return (
    <Container>
      <Title>درباره ما</Title>
      <Body
        dangerouslySetInnerHTML={{ __html: props.content }}
        className="c-pages-custom"
      />
      {/*<After shadow={!scrollEnd} />*/}
    </Container>
  );
}
