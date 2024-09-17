import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
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
import Image from "next/image";
import FullScreen from "./FullScreen";
import { useAppDispatch } from "@/store/hook";
import _ from "lodash";
// import { AppBar } from "../header/appBar";

const Flex = styled.div<FlexboxProps | SpaceProps>`
  display: flex;
  flex: 1 1;
  width: 100%;
  height: 100%;
  flex-direction: column;
  ${space}
  ${flexbox}
`;

const Cover = styled.div<SpaceProps | BorderProps>`
  position: relative;
  height: 327px;
  width: 100%;
  object-fit: cover;
  overflow: hidden;
  ${border}
  ${space}
`;

const Thumbnail = styled.div<LayoutProps>`
  display: flex;
  position: relative;
  overflow-x: visible;
  margin: 0 auto;
  &::-webkit-scrollbar {
    display: none;
  }
  ${layout}
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
const Piece = styled.div`
  position: relative;
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

const Shadow = styled.div<
  | HTMLElement
  | LayoutProps
  | { shadow: boolean; right: boolean; single: boolean }
  // @ts-ignore
>((props: { shadow: boolean; right: boolean; single: boolean }) => {
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
      background: props.single
        ? "linear-gradient(to left, rgba(255, 255, 255, 0.01) 0%, #f5f6f4 84%)"
        : "linear-gradient(to left, rgba(255, 255, 255, 0.01) 0%, #ffffff 84%)",
      width: "40px",
      left: 0,
      top: 0,
      position: "absolute",
      height: "100%",
    },
    "&::before": {
      content: '""',
      display: !props.right ? "none" : "block",
      background: props.single
        ? "linear-gradient(to right, rgba(255, 255, 255, 0.01) 0%, #f5f6f4 84%)"
        : "linear-gradient(to left, rgba(255, 255, 255, 0.01) 0%, #fffff 84%)",
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
// const Shadow=styled.div`
//     width:100%;
//     position:relative;
//     &::after{
//         content:"";
//         display:block;
//         background:red;
//         width:40px;
//         left:0;
//         top:0;
//         position:absolute;
//         height:100%;
//     }
// `
export default function SadiGallery(props: { images: any; single: boolean }) {
  const [index, setIndex] = useState(1);
  const [show, setShow] = useState(false);
  const [startT, setStartT] = useState<number | any>(null);
  const [endT, setEndT] = useState<number | any>(null);
  const [scrollEnd, setScrollEnd] = useState(false);
  const [ShR, setShR] = useState(false);

  const Data = props.images;
  const ref = useRef(null);
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
    <Flex>
      <Cover
        ref={ref}
        borderRadius={[0, "20px"]}
        mb={["0px", "20px"]}
        onClick={() => setShow(true)}
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
          <Piece>
            <Image
              src={"/icons/fullscreen.svg"}
              height={35}
              width={35}
              alt="fullscreen"
            />
            <No>{Data.length}</No>
          </Piece>
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
          single={props.single}
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
                  display={["none", "flex"]}
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
                          : "97px"
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
      <FullScreen setShow={setShow} show={show} images={Data} />
    </Flex>
  );
}

SadiGallery.defaultProps = {
  single: true,
};
