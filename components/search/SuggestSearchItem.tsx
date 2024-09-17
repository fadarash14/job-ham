import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";
type SuggestResponse = {
  name: string;
  family: string;
  jobTitle: string;
  id: number;
  cityName: string;
  setSubmitted: React.Dispatch<React.SetStateAction<boolean>>;
};
const SuggestSearchItem = ({
  name,
  family,
  jobTitle,
  id,
  cityName,
  setSubmitted,
}: SuggestResponse) => {
  const route = useRouter();
  const handleClick = () => {
    console.log({ id });
    route.push(`/resumeBank/${id}`);
    setSubmitted(true);
  };
  return (
    <Item onClick={handleClick}>
      <P>{jobTitle}</P>
      <Div>
        <P>{`${name} ${family} / ${cityName}`}</P>
      </Div>
    </Item>
  );
};

export default SuggestSearchItem;

const Item = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;
  width: 100%;
  padding: 10px 0;
  color: rgb(71, 69, 70, 0.58);
  &:hover {
    color: rgba(71, 69, 70, 0.95);
  }
  transition: color 0.1s ease-in-out;
`;
const P = styled.p`
  margin: 0 5px;
  font-size: 15px;
`;
const Div = styled.div`
  display: flex;
`;
