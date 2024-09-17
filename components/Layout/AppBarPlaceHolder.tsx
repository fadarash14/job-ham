import styled from "styled-components";

const Placeholder = styled.div`
  min-height: 45px;
  width: 100%;
  background-color: #e31c40;
  @media (min-width: 575px) {
    min-height: 86px;
  }
`;
const MobliePlaceholder = styled.div`
  min-height: 45px;
  width: 100%;
  background-color: #f5f6fa;
  @media (min-width: 575px) {
    min-height: 86px;
  }
`;
export { Placeholder, MobliePlaceholder };
