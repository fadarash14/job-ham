import React, { FC } from "react";
import styled from "styled-components";
import { SpaceProps, background, space } from "styled-system";

type ProgressBarProps = {
  progress: number;
  background?: string;
  color?: string;
  percentage?: boolean;
};

const BarWrapper = styled.div<{ background: string | undefined }>`
  width: 100%;
  height: 5px;
  background-color: #d3e6e2;
  background-color: ${({ background }) =>
    background !== undefined ? background : "#d3e6e2"};
  border-radius: 10px;
`;

const Bar = styled.div<{ progress: number; color: string | undefined }>`
  height: 100%;
  // background-color: #1abc9c;
  background-color: ${({ color }) => (color !== undefined ? color : "#1abc9c")};
  border-radius: 10px;
  width: ${({ progress }) => `${progress}%`};
  transition: width 0.3s ease-in-out;
`;
const Span = styled.span<{ progress: number }>`
  font-size: 12px;
  margin-right: 20px;
  color: ${({ progress }) => (progress === 100 ? "#00b300" : "#000000")};
`;
const Div = styled.div`
  width: 90%;
`;

const ProgressBar: FC<ProgressBarProps> = ({
  progress,
  color,
  background,
  percentage = true,
}) => {
  return (
    <Div>
      {percentage && <Span progress={progress}>{`${progress}%`}</Span>}
      <BarWrapper background={background}>
        <Bar color={color} progress={progress} />
      </BarWrapper>
    </Div>
  );
};

export default ProgressBar;
