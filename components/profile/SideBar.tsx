import styled from "styled-components";
import { layout, LayoutProps, space, SpaceProps } from "styled-system";
import SideBarContext from "./JobSeekerSideBarContext";
import ManagerSideBarContext from "./ManagerSideBarContext";
import Cookies from "js-cookie";

type Props = {
  activePath: string;
  token?: string;
};

const ASide = styled.aside<LayoutProps | SpaceProps>`
  position: sticky;
  flex-basis: 25%;
  display: flex;
  flex-flow: column wrap;
  @media (max-width: 870px) {
    display: none !important;
  }
  @media (max-width: 1300px) {
    flex-basis: 35%;
  }

  ${layout}
  ${space}
`;
export default function SideBar(props: Props) {
  const role = Cookies.get("role");
  return (
    <ASide display={["none", "none", "flex", "flex"]} ml={[0, "20px"]}>
      {role && role == "1" ? (
        <ManagerSideBarContext
          token={props.token}
          activePath={props.activePath}
          onClose={() => console.log("close")}
        />
      ) : (
        <SideBarContext
          onClose={() => console.log("close")}
          token={props.token}
          activePath={props.activePath}
        />
      )}
    </ASide>
  );
}
