import React, { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import ImageUploading, { ImageType } from "react-images-uploading";
import {
  BorderProps,
  ColorProps,
  border,
  color,
  FlexboxProps,
  LayoutProps,
  SpaceProps,
  layout,
  flexbox,
  space,
} from "styled-system";
import Image from "next/image";
import AdsUploadContext from "@/components/addWizard/AdsUploadContext";
import { ImageListType } from "react-images-uploading/dist/typings";
import { ResizeImage } from "../../utils/helper";
import Cookies from "js-cookie";
import Toast from "../Toast/Toast";
import { useQueryClient } from "@tanstack/react-query";
import { removeBannerForCompany, setBanner } from "@/requests/profile/company";
const Parent = styled.div`
  justify-content: center;
  display: flex;
  flex-direction: column;
`;

const Title = styled.div<SpaceProps>`
  color: #474546;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 10px;
  display: flex;
  position: relative;
  align-item: center;
  &.lined::before {
    content: "";
    position: absolute;
    display: block;
    top: -20px;
    width: 100%;
    height: 1px;
    margin-bottom: 20px;
    background: #d1d1d1;
  }
  ${space}
`;
const Flex = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  // height: 130px;
`;
const Button = styled.button<ColorProps>`
  // border: 1px dashed rgba(219, 20, 61, 0.16);
  border: none;
  height: 100%;
  // width: 97px;
  height: 76px;
  border-radius: 15px;
  // margin-left: 20px;
  cursor: pointer;
  // min-width: fit-content;
  background: transparent;
  display: flex;
  text-align: center;
  ${color}
`;

const Content = styled.div<BorderProps>`
  // border-radius: 15px;
  // padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow-x: scroll;
  position: relative;
  cursor: pointer;
  flex: 1 1 100%;
  height: 100%;
  // top: 30px;
  ${border}
`;

const CheckPos = styled.div<LayoutProps>`
  ${layout}
`;
const TickPos = styled.div<LayoutProps>`
  display: flex;
  ${layout}
`;
const Tick = styled.div<LayoutProps>`
  margin: auto auto auto 0;
  height: 10px;
  ${layout}
`;
const Mute = styled.div`
  color: #acacac;
  font-size: 14px;
`;
const Red = styled.div`
  color: #db143d;
  font-size: 14px;
`;

const Item = styled.div`
  display: flex;
  z-index: 10;
  text-align: center;
  position: relative;

  aspect-ratio: 4/4;
  @media (max-width: 470px) {
    width: 70%;
    aspect-ratio: none;
  }
  & > img {
    border: 1px solid #d1d1d1;
    border-radius: 50%;
  }
`;

const ButtonPhoto = styled.button<BorderProps | ColorProps | SpaceProps>`
  border-radius: 5px;
  cursor: pointer;
  // z-index: 10000;
  // position: absolute;
  // top: 80px;
  margin: 0 auto;
  padding: 0;
  :first-child {
    margin-bottom: 2px;
  }
  ${color}
  ${border}
    ${space}
`;

const Input = styled.input`
  height: 40px;
  border: 1px solid #d1d1d1;
  border-radius: 15px;
  background: transparent;
  outline: none;
  width: 100%;
  padding-right: 10px;
  &:hover {
    border: 1px solid #f18f6b;
  }
`;
const Explain = styled.textarea`
  height: 112px;
  border: 1px solid #d1d1d1;
  border-radius: 15px;
  background: transparent;
  width: 100%;
  padding: 10px;
  outline: none;
  resize: none;
  &:hover {
    border: 1px solid #f18f6b;
  }
`;

const Wrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
  & > div {
    flex-basis: auto;
    margin: 5px;
  }
  & > div:first-child {
    margin-left: 5px;
    margin-right: 0;
  }
`;

const ParentB = styled.div`
  position: absolute;
  top: 5px;
  left: 5px;
  display: flex;
`;
const Img = styled.div<FlexboxProps | LayoutProps | SpaceProps>`
  margin: 10px 10px 0px 0px;
  display: flex;

  ${layout}
  ${flexbox}
    ${space}
`;
const IconWrapper = styled.div`
  width: 100%;
  display: flex;
  gap: 10px;
  margin: 10px 10px 0px 0px;
  padding: 2px;
  border-radius: 4px;
  background-color: #ffffff;
`;
const UplaodBanner = React.memo(
  (props: {
    setImage?: (image: any) => void;
    image: string | undefined;
    id?: number;
  }) => {
    const [images, setImages] = React.useState<ImageListType>([]);
    const [toast, setToast] = useState(false);
    const [message, setMessage] = useState("");
    const token = Cookies.get("token")!;
    const role = Cookies.get("role")!;
    const maxNumber = 10;
    const { imagesEditMode } = useContext(AdsUploadContext);
    const queryClient = useQueryClient();
    const onChange = async (imageList: ImageListType) => {
      let list = [];
      let pics = [];
      for (let i = 0; i < imageList.length - imagesEditMode.length; i++) {
        let data = imageList[i];
        let base64 = await ResizeImage(data["data_url"]);
        list.push({ ...data, data_url: base64 });
        pics.push(base64);
      }

      const res = await setBanner(pics[0].split(",")[1], props.id!, token);
      if (res.errorCode == 200) {
        setToast(true);
        setMessage("بنر با موفقیت اضافه شد");
        console.log(res);
        //queryClient.invalidateQueries({ queryKey: ["getMyCompany"] });
        if (props.setImage) {
          console.log(res.errorMessage);

          props.setImage(pics[0]);
        }
      }

      setImages(imageList);
    };
    const removePictureHander = async (e: any) => {
      e.preventDefault();
      const pic = props.image!;
      const namePic = pic.split("?AWSAccessKeyId")[0].split("itemspicture/")[1];

      const res = await removeBannerForCompany(pic, props.id!, token);
      if (!res.errorCode) {
        setToast(true);
        setMessage("عملیات با موفقیت انجام شد");
        console.log(res.errorMessage);
        setImages([]);
        if (props.setImage) {
          props.setImage("");
        }
      } else {
        console.log(res.errorMessage);
      }
    };
    return (
      <div className="App">
        <ImageUploading
          value={images}
          onChange={onChange}
          maxNumber={maxNumber}
          dataURLKey="data_url"
        >
          {({ onImageUpload, isDragging, dragProps }) => (
            <Parent className="upload__image-wrapper">
              <div>
                <Flex>
                  <Content className={"scroll-d-none"}>
                    <Button
                      onClick={onImageUpload}
                      style={isDragging ? { color: "red" } : undefined}
                      {...dragProps}
                      type="button"
                    >
                      {props?.image === "" ? (
                        <Img>
                          <Image
                            width={30}
                            height={30}
                            src={"/icons/respoonsice icons plus.svg"}
                            alt="افزودن"
                          />
                        </Img>
                      ) : (
                        <IconWrapper>
                          <Image
                            width={20}
                            height={20}
                            src={"/icons/edit ads.svg"}
                            alt="افزودن"
                          />
                        </IconWrapper>
                      )}
                    </Button>
                    {props?.image !== "" && (
                      <Button>
                        {" "}
                        <IconWrapper>
                          <Image
                            width={20}
                            height={20}
                            src={"/icons/remove_x.svg"}
                            alt="حذف"
                            onClick={(e) => removePictureHander(e)}
                          />
                        </IconWrapper>
                      </Button>
                    )}
                  </Content>
                </Flex>
              </div>
            </Parent>
          )}
        </ImageUploading>
        {toast && (
          <Toast
            setIsHovering={setToast}
            isHovering={toast}
            type={"success"}
            text={message}
            confirm={false}
          />
        )}
        {/* {
        <ImageEditor
          show={index !== -1}
          setShow={setIndex}
          //@ts-ignore
          src={pictures[index]}
          index={index}
        />
      } */}
      </div>
    );
  }
);
UplaodBanner.displayName = "UplaodBanner";
export default UplaodBanner;
