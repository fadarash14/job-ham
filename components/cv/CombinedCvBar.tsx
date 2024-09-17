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
  height: 2px;
  background-color: #d3e6e2;
  background-color: ${({ background }) =>
    background !== undefined ? background : "#d3e6e2"};
  border-radius: 10px;
`;

const Bar = styled.div<{ progress: number; color: string | undefined }>`
  height: 100%;
  background-color: ${({ color }) => (color !== undefined ? color : "#1abc9c")};
  border-radius: 10px;
  width: ${({ progress }) => `${progress}%`};
  transition: width 0.3s ease-in-out;
`;
const Span = styled.span<{ progress: number }>`
  font-size: 12px;
  margin-right: 20px;
  color: white;
`;
const Div = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;
const Square = styled.div<{ progress: number }>`
  width: 6px;
  height: 6px;
  background: #f3b31b;
  position: relative;
  right: ${({ progress }) => `${progress}%`};
  bottom: 4px;
`;

const CombinedCvBar: FC<ProgressBarProps> = ({
  progress,
  color,
  background,
  percentage = true,
}) => {
  return (
    <Div>
      <BarWrapper background={background}>
        <Bar color={color} progress={progress} />
        <Square progress={progress} />
      </BarWrapper>
      {percentage && <Span progress={progress}>{`${progress}%`}</Span>}
    </Div>
  );
};

export default CombinedCvBar;
