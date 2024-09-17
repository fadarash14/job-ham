import React from "react";
import styled from "styled-components";
import { Feature } from "../../types";
import {
  border,
  BorderProps,
  color,
  ColorProps,
  space,
  SpaceProps,
} from "styled-system";

const Card = styled.div<ColorProps | BorderProps | SpaceProps>`
  padding: 7px 4px;
  border: 1px solid rgba(209, 209, 209, 1);
  border-radius: 8px;
  direction: rtl;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  min-height: 110px;
  ${color}
  ${space}
    ${border}
`;

const Content = styled.div`
  margin-right: 8px;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Header = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: #474546;
  -webkit-line-clamp: 2;
  text-overflow: ellipsis;
  display: -webkit-box;
  max-width: 100%;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const Descript = styled.div`
  margin-top: 8px;
  margin-bottom: 8px;
  color: #474546;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Main = styled.div`
  display: flex;
`;

const DDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
interface IProps {
  feature: Feature;
  background: string;
  border: string;
  faveWizard?: Function;
}

function FeatureBox(props: IProps) {
  return (
    <Card mx={["0", "5px"]} bg={props.background} border={props.border}>
      <Main>
        <Content className="content">
          <Header className="header">{props.feature.header}</Header>
          <DDiv>
            <Descript>{props.feature.desc}</Descript>
          </DDiv>
        </Content>
      </Main>
    </Card>
  );
}

export default FeatureBox;

FeatureBox.defaultProps = {
  background: "white",
  border: "1px solid #E8E8E8",
};
