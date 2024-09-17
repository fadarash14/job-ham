import React, {
  Dispatch,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import styled from "styled-components";
import ModalSkeleton from "../utility/ModalSkeleton";
import Image from "next/image";
import {
  border,
  BorderProps,
  flexbox,
  FlexboxProps,
  layout,
  LayoutProps,
  space,
  SpaceProps,
} from "styled-system";
import _ from "lodash";

const Flex = styled.div<FlexboxProps | SpaceProps>`
  display: flex;
  flex: 1 1;
  width: 100%;
  height: 100%;
  flex-direction: column;
  position: relative;
  ${space}
  ${flexbox}
`;

const Cover = styled.div<SpaceProps | LayoutProps | BorderProps>`
  position: relative;
  object-fit: cover;
  overflow: hidden;
  margin: auto;
  ${border}
  ${layout}
    ${space}
`;

const Thumbnail = styled.div<SpaceProps | LayoutProps>`
  display: flex;
  position: relative;
  overflow-x: visible;
  margin: 0 auto;
  &::-webkit-scrollbar {
    display: none;
  }
  @media (min-width: 576px) {
    flex-wrap: wrap;
  }
  ${layout}
  ${space}
`;

const GalleryItems = styled.div<LayoutProps | BorderProps>`
  border-radius: 17px;
  overflow: hidden;
  position: relative;
  cursor: pointer;
  border: 3px solid transparent;
  &:not(:last-child) {
    margin-left: 10px;
  }
  ${border}
  ${layout}
`;

const Img = styled.div`
  position: absolute;
  cursor: pointer;
  &.right {
    right: 20px;
    bottom: 30px;
    height: 24px;
  }
  &.left {
    left: 20px;
    bottom: 30px;
    height: 24px;
  }
  &.fullscreenIcon {
    left: 20px;
    top: 20px;
    color: white;
  }
`;

const No = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  color: white;
  height: 28px;
`;

const Div = styled.div`
  & img {
    object-fit: cover !important;
  }
`;

const Index = styled.div`
  color: white;
  background: rgba(255, 255, 255, 35%);
  text-align: center;
  padding: 2px;
  width: 80px;
  display: flex;
  justify-content: space-around;
  border-radius: 8px;
  position: absolute;
  right: 50%;
  transform: translate(50%, 0);
  bottom: 30px;
`;

const Close = styled.div`
  position: absolute;
  left: 0;
  top: -40px;
  cursor: pointer;
  @media (max-width: 576px) {
    left: 10px;
  }
`;
const Shadow = styled.div<
  HTMLElement | LayoutProps | { shadow: boolean; right: boolean }
  // @ts-ignore
>((props: { shadow: boolean; right: boolean }) => {
  return {
    width: "100%",
    position: "relative",
    overflowX: "hidden",
    "&::-webkit-scrollbar": {
      display: "none",
    },
    "&::after": {
      content: '""',
      display: props.shadow ? "none" : "block",
      background:
        "linear-gradient(to left, rgba(255, 255, 255, 0.01) 0%, rgba(45,44,44,0.01) 84%)",
      width: "40px",
      left: 0,
      top: 0,
      position: "absolute",
      height: "100%",
    },
    "&::before": {
      content: '""',
      display: !props.right ? "none" : "block",
      background:
        "linear-gradient(to right, rgba(255, 255, 255, 0.01) 0%, rgba(45,44,44,0.01) 84%)",
      width: "40px",
      right: 0,
      top: 0,
      position: "absolute",
      height: "100%",
      zIndex: 10,
    },
  };
});

const List = styled.div`
  width: 100%;
  position: relative;
  overflow-x: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export default function FullScreen(props: {
  show: boolean;
  setShow: Dispatch<boolean>;
  images: any;
}) {
  const [index, setIndex] = useState(1);
  const [startT, setStartT] = useState<number | any>(null);
  const [endT, setEndT] = useState<number | any>(null);
  const [scrollEnd, setScrollEnd] = useState(false);
  const [ShR, setShR] = useState(false);

  const Data = props.images;
  const autoScroll = useRef(null);

  const swipeLeft = (e: any) => {
    e?.stopPropagation();
    if (index < Data.length - 1) {
      setIndex(index + 1);
    } else {
      setIndex(0);
    }
  };

  const swipeRight = (e: any) => {
    e?.stopPropagation();
    if (index > 0) {
      setIndex(index - 1);
    } else {
      setIndex(Data.length - 1);
    }
  };

  const ref = useRef(null);

  function startTouch(e: any) {
    setStartT(e.changedTouches[0].pageX);
  }

  function endTouch(e: any) {
    setEndT(e.changedTouches[0].pageX);
  }

  useEffect(() => {
    let e;
    if (startT - endT > 0) {
      //swipe left committed
      swipeLeft(e);
    } else {
      //swipe right committed
      swipeRight(e);
    }
  }, [endT]);

  function exit(e: any) {
    if (e.target && (e.target as any).contains(ref.current)) {
      props.setShow(false);
    }
  }
  function _onScrollY(e: UIEvent) {
    const target = e.target as HTMLDivElement;
    if (-target.scrollLeft + target.clientWidth === target.scrollWidth) {
      setScrollEnd(true);
    } else {
      setScrollEnd(false);
    }
    if (target.scrollLeft !== 0) {
      setShR(true);
    } else {
      setShR(false);
    }
  }

  const onScrollY = useCallback(_.debounce(_onScrollY, 100), []);

  return (
    <ModalSkeleton
      width={true}
      show={props.show}
      setShow={props.setShow}
      flex={"flex"}
      back={"transparent"}
      overflow={true}
    >
      <Flex onClick={(e: any) => exit(e)}>
        <Close onClick={() => props.setShow(false)}>
          <Image
            src={"/icons/white-close-modal.svg"}
            height={25}
            width={25}
            alt="close modal"
          />
        </Close>

        <Cover
          ref={ref}
          borderRadius={[0, "20px"]}
          width={["100%", "60vh"]}
          height={["45vh", "60vh"]}
          mb={"20px"}
          onTouchStart={(e: any) => startTouch(e)}
          onTouchEnd={(e: any) => endTouch(e)}
        >
          <Div>
            <Image
              src={
                props.images[index]?.original
                  ? props.images[index]?.original
                  : props.images[index]?.image
                  ? props.images[index]?.image
                  : "/null.svg"
              }
              fill
              alt={
                props.images[index]?.original
                  ? props.images[index]?.original
                  : props.images[index]?.image
                  ? props.images[index]?.image
                  : ""
              }
            />
          </Div>
          <Img className={"left"} onClick={swipeLeft}>
            <Image
              src={"/icons/gallery-arrow-left.svg"}
              height={24}
              width={24}
              alt="arrow left"
            />
          </Img>
          <Img className={"right"} onClick={swipeRight}>
            <Image
              src={"/icons/gallery-arrow-right.svg"}
              height={24}
              width={24}
              alt="arrow left"
            />
          </Img>
          <Img className={"fullscreenIcon"}>
            <div style={{ position: "relative" }}>
              <Image
                src={"/icons/fullscreen.svg"}
                height={25}
                width={25}
                alt="fullscreen"
              />
              <No>{Data.length}</No>
            </div>
          </Img>
          <Index>
            <div>{index + 1}</div>
            <div>از</div>
            <div>{Data.length}</div>
          </Index>
        </Cover>
        {
          <Shadow
            //@ts-ignore
            shadow={scrollEnd}
            //@ts-ignore
            right={(index + 1) * 100 - autoScroll?.current?.offsetWidth > 0}
          >
            {
              <List>
                {
                  <Thumbnail
                    style={{
                      //@ts-ignore
                      transform:
                        //@ts-ignore
                        (index + 1) * 100 - autoScroll?.current?.offsetWidth > 0
                          ? "translateX(" +
                            `${
                              (index + 1) * 100 -
                              //@ts-ignore
                              (autoScroll.current?.offsetWidth - 100)
                            }` +
                            "px)"
                          : null,
                    }}
                    ref={autoScroll}
                    onScroll={(e: any) => onScrollY(e)}
                  >
                    {Data.map((item: any, i: number) => (
                      <GalleryItems
                        key={i}
                        border={index === i ? "3px solid #db143d" : ""}
                        minWidth={
                          Data[i]?.thumbnailWidth
                            ? Data[i]?.thumbnailWidth
                            : "76px"
                        }
                        height={
                          Data[i]?.thumbnailHeight
                            ? Data[i]?.thumbnailHeight
                            : "96px"
                        }
                        onClick={() => setIndex(i)}
                      >
                        <Image
                          src={
                            Data[i]?.original
                              ? Data[i]?.original
                              : Data[i]?.image
                              ? Data[i]?.image
                              : "/null.svg"
                          }
                          fill
                          alt={
                            Data[i]?.original
                              ? Data[i]?.original
                              : Data[i]?.image
                              ? Data[i]?.image
                              : ""
                          }
                        />
                      </GalleryItems>
                    ))}
                  </Thumbnail>
                }
              </List>
            }
          </Shadow>
        }
      </Flex>
    </ModalSkeleton>
  );
}
