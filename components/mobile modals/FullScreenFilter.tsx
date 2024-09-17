import React, {
  Dispatch,
  PropsWithChildren,
  useContext,
  useState,
} from "react";
import styled, { keyframes } from "styled-components";
import { color, ColorProps, space, SpaceProps } from "styled-system";
import Image from "next/image";
const CityAreaFilter = dynamic(
  () => import("../sidebar/modalcity/CityAreaFilter")
);
const CheckBoxFilter = dynamic(() => import("../sidebar/checkBoxFilter"));
import Box from "../utility/Box";
const MobileModalSkeleton = dynamic(() => import("./MobileModalSkeleton"));
const CityAreaMobileModal = dynamic(() => import("./CityAreaMobileModal"));
import { search_keys_to_set_get } from "../../utils/searchConfig";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { setShowMobileFilter } from "../../store/mobilePage";
import clsx from "clsx";
import SideBarContext from "../sidebar/context/SideBarContext";
const CategoryFilterWrapper = dynamic(
  () => import("../sidebar/CategoryFilterWrapper")
);
import MobileCategoryBuilder from "./MobileCategoryBuilder";
import { init } from "../../utils/helper";
import router, { useRouter } from "next/router";
import dynamic from "next/dynamic";

const slideOut = keyframes`
 0% { display:block}
 100% {visibility:hidden}
`;

const ModalSkeletonMobile = styled.div`
  position: fixed;
  z-index: 100000;
  left: 0;
  top: 0;
  width: 100%;
  height: 0;
  overflow: hidden;
  visibility: hidden;
  transition: 1s visibility;
  &.show {
    visibility: visible;
    height: 100vh;
  }
`;
const Content = styled.div`
  height: 0;
  width: 100%;
  margin-top: 60px;
  color: #474546;
  background: #f5f6fa;
  overflow-y: scroll;
  display: flex;
  overflow: auto;
  flex-direction: column;
  padding: 20px 20px 10px 20px;
  margin-top: 100vh;
  transition: 1s margin;
  overscroll-behavior: none;
  &.slide {
    margin-top: 0px !important;
    padding-bottom: 90px !important;
    height: 100%;
  }
`;

const Img = styled.div<SpaceProps>`
  height: 25px;
  ${space}
`;
const Flex = styled.div<SpaceProps>`
  display: flex;
  align-items: center;

  ${space}
`;

const Header = styled.div`
  align-items: center;
  &::after {
    content: "";
    display: block;
    height: 1px;
    width: 100%;
    margin: 10px 0;
    background: #fcc155;
  }
`;
const SideBarPermanentCheckFilters = [
  { title: "عکــس دار", nameInUrl: search_keys_to_set_get["hasPicture"] },
  { title: "فــوری", nameInUrl: search_keys_to_set_get["instant"] },
  { title: "روزنــامه", nameInUrl: search_keys_to_set_get["newspaper"] },
  { title: "گرافــیـکی", nameInUrl: search_keys_to_set_get["graphical"] },
];

const CityBox = styled((props) => <Box {...props} />)<ColorProps>`
  padding: 12px 19px;
  color: black;
  margin: 5px -19px;
  ${color}
`;
const Span = styled.div<ColorProps>`
  font-size: 12px;
  font-weight: 500;
  margin: auto;
  margin-right: 10px;
  ${color}
`;

export default function FullScreenFilter(props: PropsWithChildren<any>) {
  const Eks: JSX.Element[] = SideBarPermanentCheckFilters.map(
    (filter: { title: string; nameInUrl: string }, key: number) => {
      //@ts-ignore
      return (
        <CheckBoxFilter
          key={key}
          title={filter.title}
          nameInUrl={filter.nameInUrl}
        />
      );
    }
  );
  const [show, setShow] = useState<boolean>(false);
  const { modalCityIsOpen, openModalCity } = useContext(SideBarContext);

  const dispatch = useAppDispatch();
  //@ts-ignore
  const { showMobileFilter } = useAppSelector((state) => state.mobileConfig);
  const router = useRouter();
  const obj = init(router.query, [search_keys_to_set_get["category"]]);

  return (
    <ModalSkeletonMobile className={clsx({ show: showMobileFilter })}>
      <Content className={clsx({ slide: showMobileFilter }, "scroll-d-none")}>
        <Header>
          <Flex>
            <Flex>
              <Img ml={"10px"}>
                <Image
                  height={20}
                  width={20}
                  src={"/icons/mobile filters.svg"}
                  alt=""
                />
              </Img>
              فیـلتــرها
            </Flex>
            <Img
              mr={"auto"}
              onClick={() => dispatch(setShowMobileFilter(false))}
            >
              <Image height={25} width={25} src={"/icons/remove.svg"} alt="" />
            </Img>
          </Flex>
        </Header>
        <CityBox
          bg={"rgba(209,209,209,0.3)"}
          display={"flex"}
          flexDirection={"column"}
        >
          <Box
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"space-between"}
            onClick={() => setShow(true)}
          >
            <Span>دسـتــه بـنــدی ها</Span>
            <Img>
              <Image
                height={24}
                width={24}
                src={"/icons/side-filter-arrow-mobile.svg"}
                alt=""
              />
            </Img>
          </Box>
          <div style={{ fontSize: "12px" }}>{obj.category?.name}</div>
        </CityBox>
        {
          //@ts-ignore
          <CityAreaFilter mobile={true} />
        }
        {
          //@ts-ignore
          <CategoryFilterWrapper mobile={true} />
        }
        {Eks}
      </Content>
      {
        //@ts-ignore
        <MobileModalSkeleton
          show={show}
          setshow={setShow}
          title={"دسـتــه بـنــدی ها"}
          icon={"/icons/mobile_black_category.svg"}
        >
          <MobileCategoryBuilder />
        </MobileModalSkeleton>
      }

      {
        //@ts-ignore
        <CityAreaMobileModal show={modalCityIsOpen} setshow={openModalCity} />
      }
    </ModalSkeletonMobile>
  );
}
