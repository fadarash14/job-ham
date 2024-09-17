import styled from "styled-components";

interface IProps {
  count: number;
  bgColor?: string;
}
const Span = styled.span<{ bgColor?: string }>`
  position: absolute;
  top: -7px;
  right: -10px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background-color: ${(props) => props.bgColor || "#e31c40"};
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 9px;
  font-weight: 500;
  z-index: 10;
`;
const Badge = ({ count, bgColor }: IProps) => {
  if (!count) return null;
  return <Span bgColor={bgColor}>{count}</Span>;
};

export default Badge;
