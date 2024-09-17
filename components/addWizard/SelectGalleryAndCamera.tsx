import Image from "next/image";
import React, { Dispatch, useCallback, useContext, useState } from "react";
import styled, { keyframes } from "styled-components";
import MobileModalSkeleton from "../mobile modals/MobileModalSkeleton";
import Resizer from "react-image-file-resizer";
import AdsUploadContext from "./AdsUploadContext";
import _ from "lodash";

const Content = styled.div`
  display: flex;
  flex-direction: column;
  background: white;
  margin: 10px 0;
`;
const Item = styled.label`
  padding: 10px 0;
  display: flex;
  align-items: center;
  &:not(:last-child) {
    border-bottom: 1px solid #d1d1d1;
  }
  span {
    margin-right: 5px;
  }
  .ads-upload-input {
    border: none;
    display: none;
  }
`;

export default function SelectImageGalleryOrCamera({
  show,
  setShow,
}: {
  show: boolean;
  setShow: Dispatch<boolean>;
}) {
  const [toast, setToast] = useState("");
  const { setPicture } = useContext(AdsUploadContext);
  const resizeFile = (file: File) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        768,
        768,
        "JPEG",
        70,
        0,
        (uri) => {
          resolve(uri);
        },
        "base64",
        768,
        768
      );
    });
  const _pickCamera = () => {
    console.log("gallery picker");
    // @ts-ignore
    if (window && window.rahnama) {
      //@ts-ignore
      window.rahnama.cameraPicker();
    }
  };

  const _pickGallery = () => {
    console.log("gallery picker");
    //@ts-ignore
    if (window && window.rahnama) {
      //@ts-ignore
      window.rahnama.galleryPicker();
    }
  };
  const pickGallery = useCallback(_.debounce(_pickGallery, 1000), []);
  const pickCamera = useCallback(_.debounce(_pickCamera, 1000), []);

  const onSelectFile = async (e: any) => {
    setShow(false);
    const files = e.target.files;
    console.log(files, "files");
    if (files.length > 10) {
      console.log("image length is bigger than 10");
      setToast(" حداکثر 10 عکس انتخاب کنید");
      return;
    }
    const images: string[] = [];
    for (let file of files) {
      //@ts-ignore
      const image: string = await resizeFile(file);
      images.push(image);
    }
    setPicture(images);
  };

  return (
    <MobileModalSkeleton
      show={show}
      setshow={setShow}
      title={" "}
      icon={"/icons/Add images.svg"}
      mt={"70vh"}
    >
      <Content>
        {/*<Item className="sheet-button" onClick={() => pickCamera()}>*/}
        {/*    <span>عکــس با دوربین</span>*/}
        {/*    <Image width={'18px'} height={'18px'} src={'/icons/pick_camer.svg'}/>*/}
        {/*    <input className="ads-upload-input" type="file" accept="image/*" multiple onChange={onSelectFile} />*/}
        {/*</Item>*/}
        <Item className="sheet-button" onClick={() => pickGallery()}>
          <span>عکـس از گـــالری</span>
          <Image
            width={18}
            height={18}
            src={"/icons/pick_gallery.svg"}
            alt=""
          />
          <input
            className="ads-upload-input"
            type="file"
            accept="image/*"
            multiple
            onChange={onSelectFile}
          />
        </Item>
      </Content>
    </MobileModalSkeleton>
  );
}
