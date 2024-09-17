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
// import ImageEditor from "./ImageEditor";
import AdsUploadContext from "./AdsUploadContext";
import { ImageListType } from "react-images-uploading/dist/typings";
import AdsErrorMessage from "./AdsErrorMessage";
import NameInput from "./NameInput";
import ExplainInput from "./ExplainInput";
import SelectImageGalleryOrCamera from "./SelectGalleryAndCamera";
import { resizeBase64Img, ResizeImage } from "../../utils/helper";

const Parent = styled.div`
  justify-content: space-between;
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
`;
const Button = styled.button<ColorProps>`
  border: 1px dashed rgba(219, 20, 61, 0.16);
  height: 100%;
  width: 97px;
  height: 76px;
  border-radius: 15px;
  margin-left: 20px;
  cursor: pointer;
  min-width: fit-content;
  background: transparent;
  display: flex;
  text-align: center;
  ${color}
`;

const Content = styled.div<BorderProps>`
  border-radius: 15px;
  padding: 5px;
  display: flex;
  align-items: center;
  overflow-x: scroll;
  position: relative;
  cursor: pointer;
  flex: 1 1 90%;
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
  text-align: center;
  position: relative;
  & > img {
    height: 92px;
    width: 103px;
    border: 1px solid #d1d1d1;
    border-radius: 15px;
  }
`;

const ButtonPhoto = styled.button<BorderProps | ColorProps | SpaceProps>`
  border-radius: 5px;
  cursor: pointer;
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
  align-items: center;
  display: flex;
  margin: auto;
  ${layout}
  ${flexbox}
    ${space}
`;

export default function UploadVisuals(props: {
  proceed: boolean;
  message: string;
}) {
  // @ts-ignore
  const [images, setImages] = React.useState<ImageListType>([]);
  const [photos, setPhotos] = React.useState<string[]>([]);
  const [index, setIndex] = React.useState<number>(-1);
  const [approve, setApprove] = useState("");
  const [message, setMessage] = useState("");

  const maxNumber = 10;
  const {
    setPicture,
    pictures,
    setLevel,
    level,
    imagesEditMode,
    setImagesEditMode,
  } = useContext(AdsUploadContext);

  const onChange = async (
    imageList: ImageListType,
    addUpdatedIndex?: Array<number>
  ) => {
    let list = [];
    let pics = [];
    for (let i = 0; i < imageList.length - imagesEditMode.length; i++) {
      let data = imageList[i];
      // console.log('change has detected', data)
      let base64 = await ResizeImage(data["data_url"]);
      // console.log(base64,'base64')
      list.push({ ...data, data_url: base64 });
      pics.push(base64);
    }

    setImages(imageList);
    setPicture(pics);
  };
  const [status, setStatus] = useState("desktop");
  const [showModalPicker, setShowModalPicker] = useState(false);

  useEffect(() => {
    setMessage("");
  }, [pictures, imagesEditMode]);

  useEffect(() => {
    //@ts-ignore
    if (window && window.rahnama) {
      setStatus("mobile");
    }
  }, []);

  const onImageUpload = () => {
    setShowModalPicker(true);
  };

  const onImageRemove = (index: number) => {
    if (
      typeof window !== "undefined" &&
      //@ts-ignore
      window.rahnama &&
      //@ts-ignore
      window.rahnama.deleteImage
    ) {
      //@ts-ignore
      window.rahnama.deleteImage(index);
    }
    let _pictures = [...pictures];
    _pictures.splice(index, 1);
    setPicture(_pictures);
  };

  if (status === "mobile") {
    return (
      <div className="App">
        <Parent className="upload__image-wrapper">
          <div>
            <Title className={"lined"}>عـکـــس آگــهی</Title>
            {message !== "" ? <AdsErrorMessage message={message} /> : null}
            <Flex>
              <Content onClick={onImageUpload} className={"scroll-d-none"}>
                <Button>
                  <Img>
                    <Image
                      width={30}
                      height={30}
                      src={`/icons/Add images.svg`}
                      alt="افزودن"
                    />
                  </Img>
                </Button>
                <div>
                  <Mute>
                    اضافه کردن عکس میتواند بازدید آگهی شما را ۲ برابر افزایش
                    دهد.
                  </Mute>
                  <Red>حداکثر ۱۰ عـــکس</Red>
                </div>
              </Content>
            </Flex>
            <Wrap>
              {pictures.map((images, index) => (
                <Item key={index} className="image-item">
                  <img src={images} alt="" />
                  <ParentB className="image-item__btn-wrapper">
                    {/*<ButtonPhoto bg={'white'} border={'1px solid #d1d1d1'} onClick={() => onImageUpdate(index)}>تغییر</ButtonPhoto>*/}
                    <ButtonPhoto
                      bg={"transparent"}
                      border={"none"}
                      onClick={() => onImageRemove(index)}
                    >
                      <Image
                        height={30}
                        width={30}
                        src={"/icons/trash.svg"}
                        alt="trash"
                      />
                    </ButtonPhoto>
                    <ButtonPhoto
                      mr={"5px"}
                      bg={"transparent"}
                      border={"none"}
                      onClick={() => setIndex(index)}
                    >
                      <Image
                        height={30}
                        width={30}
                        src={"/icons/edit.svg"}
                        alt="ویرایش"
                      />
                    </ButtonPhoto>
                  </ParentB>
                </Item>
              ))}
              {imagesEditMode.map((images, index) => (
                <Item key={index} className="image-item">
                  <img src={images.src} alt="" />
                  <ParentB className="image-item__btn-wrapper">
                    {/*<ButtonPhoto bg={'white'} border={'1px solid #d1d1d1'} onClick={() => onImageUpdate(index)}>تغییر</ButtonPhoto>*/}
                    <ButtonPhoto
                      bg={"transparent"}
                      border={"none"}
                      onClick={() => {
                        let tmp = [...imagesEditMode];
                        tmp.splice(index, 1);
                        setImagesEditMode(tmp);
                      }}
                    >
                      <Image
                        height={30}
                        width={30}
                        src={"/icons/trash.svg"}
                        alt="trash"
                      />
                    </ButtonPhoto>
                  </ParentB>
                </Item>
              ))}
            </Wrap>
          </div>
        </Parent>
        <NameInput continue={props.proceed} message={props.message} />
        {/* <ExplainInput continue={props.proceed} /> */}
        {/* {
          <ImageEditor
            show={index !== -1}
            setShow={setIndex}
            //@ts-ignore
            src={pictures[index]}
            index={index}
          />
        } */}
        <SelectImageGalleryOrCamera
          show={showModalPicker}
          setShow={setShowModalPicker}
        />
      </div>
    );
  }

  return (
    <div className="App">
      <ImageUploading
        multiple
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
        dataURLKey="data_url"
      >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps,
        }) => (
          <Parent className="upload__image-wrapper">
            <div>
              <Title className={"lined"}>عـکـــس آگــهی</Title>
              <Flex>
                <Content
                  border={
                    approve !== "" ? "1px solid #00C39C" : "1px solid #d1d1d1"
                  }
                  onClick={onImageUpload}
                  className={"scroll-d-none"}
                >
                  <Button
                    style={isDragging ? { color: "red" } : undefined}
                    {...dragProps}
                    type="button"
                  >
                    <Img>
                      <Image
                        width={30}
                        height={30}
                        src={`/icons/Add images.svg`}
                        alt="افزودن"
                      />
                    </Img>
                  </Button>
                  <div>
                    <Mute>
                      اضافه کردن عکس میتواند بازدید آگهی شما را ۲ برابر افزایش
                      دهد.
                    </Mute>
                    <Red>حداکثر ۱۰ عـــکس</Red>
                  </div>
                  {/*<button onClick={onImageRemoveAll}>Remove all images</button>*/}
                </Content>
                <CheckPos width={"24px"}>
                  {/*{message !=='' ?*/}
                  {/*    <AdsErrorMessage message={message}/> : null}*/}
                  {approve !== "" ? (
                    <TickPos>
                      <Tick>
                        <Image
                          src={"/icons/green tick.svg"}
                          height={10}
                          width={15}
                          alt=""
                        />
                      </Tick>
                    </TickPos>
                  ) : null}
                </CheckPos>
              </Flex>
              <Wrap>
                {pictures.map((images, index) => (
                  <Item key={index} className="image-item">
                    <img src={images} alt="" />
                    <ParentB className="image-item__btn-wrapper">
                      {/*<ButtonPhoto bg={'white'} border={'1px solid #d1d1d1'} onClick={() => onImageUpdate(index)}>تغییر</ButtonPhoto>*/}
                      <ButtonPhoto
                        bg={"transparent"}
                        border={"none"}
                        onClick={() => setIndex(index)}
                      >
                        <Image
                          height={20}
                          width={20}
                          src={"/icons/edit.svg"}
                          alt="ویرایش"
                        />
                      </ButtonPhoto>
                      <ButtonPhoto
                        mr={"5px"}
                        bg={"transparent"}
                        border={"none"}
                        onClick={() => {
                          let _pictures = [...pictures];
                          _pictures.splice(index, 1);
                          setPicture(_pictures);
                          onImageRemove(index);
                        }}
                      >
                        <Image
                          height={20}
                          width={20}
                          src={"/icons/grey-remove.svg"}
                          alt=""
                        />
                      </ButtonPhoto>
                    </ParentB>
                  </Item>
                ))}
                {imagesEditMode.map((images, index) => (
                  <Item key={index} className="image-item">
                    <img src={images.src} alt="" />
                    <ParentB className="image-item__btn-wrapper">
                      {/*<ButtonPhoto bg={'white'} border={'1px solid #d1d1d1'} onClick={() => onImageUpdate(index)}>تغییر</ButtonPhoto>*/}
                      <ButtonPhoto
                        bg={"transparent"}
                        border={"none"}
                        onClick={() => {
                          let tmp = [...imagesEditMode];
                          tmp.splice(index, 1);
                          setImagesEditMode(tmp);
                        }}
                      >
                        <Image
                          height={20}
                          width={20}
                          src={"/icons/grey-remove.svg"}
                          alt=""
                        />
                      </ButtonPhoto>
                    </ParentB>
                  </Item>
                ))}
              </Wrap>
            </div>
          </Parent>
        )}
      </ImageUploading>
      <NameInput continue={props.proceed} message={props.message} />
      {/* <ExplainInput continue={props.proceed} /> */}

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
