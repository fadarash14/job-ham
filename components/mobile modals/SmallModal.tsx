import { Dispatch, PropsWithChildren, useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { layout, LayoutProps, space, SpaceProps } from "styled-system";
import Image from "next/image";
import { useDetectClickOutside } from "react-detect-click-outside";
import Link from "next/link";
import { DownloadTypesApp } from "../../utils/mobileConfig";
const slideOut = keyframes`
 0% { visibility:show}
 100% {visibility:hidden}
`;

const Modal = styled.div<LayoutProps>`
  position: fixed;
  z-index: 10300;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  // background-color: rgb(45 44 44 / 71%);
  direction: rtl;
  font-size: 16px;
  // box-shadow: inset -22px -100px 104px 8px #00000087;
  &.show {
  }
  &.hide {
    animation: 0.1s ${slideOut} 1s forwards;
  }

  ${layout}
`;

const slideIn = keyframes`
 0% { transform: scale(0)}
 100% {transform: scale(1)}
`;
const slideOff = keyframes`
 0% { transform: scale(1)}
 100% {transform: scale(0)}
`;

const ModalContent = styled.div`
  width: 200px;
  border-radius: 20px;
  color: #474546;
  overflow: hidden;
  background: white;
  padding: 15px;
  position: absolute;
  top: 5%;
  left: 12%;
  &.show {
    animation: 1s ${slideIn} ease-in-out forwards;
  }

  &.hide {
    animation: 1s ${slideOff} ease-in-out forwards;
  }
`;
const Div = styled.div`
  &::after {
    content: "";
    display: block;
    height: 1px;
    width: auto;
    margin: 10px 0;
    background: #d1d1d1;
  }
`;
const Flex = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Img = styled.div<SpaceProps>`
  height: 19px;
  ${space}
`;
export default function SmallModal(props: { closeModal: Dispatch<any> }) {
  const ref = useDetectClickOutside({ onTriggered: props.closeModal });
  const [isMobileMyket, setMobile] = useState(false);
  useEffect(() => {
    // @ts-ignore
    if (window && window.rahnama) {
      // @ts-ignore
      let downloadType = window?.rahnama?.getDownloadType();
      if (downloadType === DownloadTypesApp.Myket) {
        setMobile(true);
      }
    }
  }, []);

  const setRateAppMyket = () => {
    if (window && "rahnama" in window) {
      // @ts-ignore
      window.rahnama.setRateAppMyket();
    }
  };

  return (
    <Modal ref={ref}>
      <ModalContent>
        <Link href={"/jobs"}>
          <Div>
            <Flex className={"line"}>
              <div>فرصت های شغلی</div>
              <Img>
                <Image
                  height={19}
                  width={19}
                  src={"/icons/small modal icons.svg"}
                  alt="small-modal"
                />
              </Img>
            </Flex>
          </Div>
        </Link>
        <Link href={"/cv-builder"}>
          <Div>
            <Flex className={"line"}>
              <div>روزمه ساز</div>
              <Img>
                <Image
                  height={19}
                  width={19}
                  src={"/icons/small modal icons.svg"}
                  alt="small-modal"
                />
              </Img>
            </Flex>
          </Div>
        </Link>

        {isMobileMyket ? (
          <Link href={"https://rahnama.com/mag"}>
            <Div>
              <Flex>
                <div>معرفی شرکت ها</div>
                <Img>
                  <Image
                    height={19}
                    width={19}
                    src={"/icons/small modal icons.svg"}
                    alt="small-modal"
                  />
                </Img>
              </Flex>
            </Div>
          </Link>
        ) : (
          <Link href={"https://rahnama.com/mag"}>
            <Flex>
              <div>معرفی شرکت ها</div>
              <Img>
                <Image
                  height={19}
                  width={19}
                  src={"/icons/small modal icons.svg"}
                  alt="small-modal"
                />
              </Img>
            </Flex>
          </Link>
        )}

        {isMobileMyket && (
          <Flex onClick={setRateAppMyket}>
            <div>ثبت نظر در مایکت</div>
            <Img>
              <Image
                height={19}
                width={19}
                src={"/icons/small modal icons.svg"}
                alt="small-modal"
              />
            </Img>
          </Flex>
        )}
      </ModalContent>
    </Modal>
  );
}
