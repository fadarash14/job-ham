import { ReactNode } from "react";
import styled from "styled-components";
import Image from "next/image";
import { SpaceProps, space } from "styled-system";
import JobSeekerSideBarContext from "./JobSeekerSideBarContext";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useAppSelector } from "@/store/hook";
import DefaultSideBarContext from "./DefaultSideBarContext";
import ManagerSideBarContext from "./ManagerSideBarContext";

const MenuModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: flex-start;
  align-items: center;
  overflow: hidden;
  transform: translateX(-100%);
  transition: transform 0.3s ease-in-out;
  z-index: 10000;

  &.open {
    transform: translateX(0);
  }
`;

const MenuContent = styled.div`
  width: 100%;
  height: 100%;
  background-color: #fff;
  overflow-y: auto;
  ::-webkit-scrollbar {
    display: none;
  }
`;
const IDiv = styled.div<SpaceProps>`
  display: flex;
  justify-content: end;
  margin: 10px;
  ${space};
`;
interface Iprops {
  isOpen: boolean;
  onClose: () => void;
  children?: ReactNode;
  // activePath: string;
  // token?: string;
}
const Menu = ({ isOpen, onClose, children }: Iprops) => {
  const token = Cookies.get("token");
  const role: number = useAppSelector((state) => state.sign.roles);
  const router = useRouter();
  const activePath = router.pathname;
  const renderContext = () => {
    if (!token) {
      return (
        <DefaultSideBarContext activePath={activePath} onClose={onClose} />
      );
    } else if (token && role == 2) {
      return (
        <JobSeekerSideBarContext
          token={token}
          activePath={activePath}
          onClose={onClose}
        />
      );
    } else {
      return (
        <ManagerSideBarContext activePath={activePath} onClose={onClose} />
      );
    }
  };

  return (
    <MenuModal className={isOpen ? "open" : ""} onClick={onClose}>
      <MenuContent onClick={(e) => e.stopPropagation()}>
        <IDiv onClick={onClose}>
          <Image
            src={"/icons/mobile-left-arrow.svg"}
            height={25}
            width={25}
            alt=""
          />
        </IDiv>
        {renderContext()}
      </MenuContent>
    </MenuModal>
  );
};

export default Menu;
