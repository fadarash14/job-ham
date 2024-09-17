import React, {
  Component,
  Dispatch,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from "react";
// @ts-ignore
import ImageEditorRc from "react-cropper-image-editor";
import "cropperjs/dist/cropper.css";
import AdsUploadContext from "./AdsUploadContext";
import ModalSkeleton from "../utility/ModalSkeleton";
import Image from "next/image";
import styled from "styled-components"; // see installation section above for versions of NPM older than 3.0.0
// If you choose not to use import, you need to assign Cropper to default
// var Cropper = require('react-cropper-image-editor').default
type Props = {
  src: string;
};

const Close = styled.div`
  position: fixed;
  left: 25%;
  top: 25%;
  cursor: pointer;
  @media (max-width: 576px) {
    top: 10%;
    left: 10%;
  }
`;

const ImageEditor = forwardRef(
  (
    {
      index,
      show,
      setShow,
    }: {
      show: boolean;
      setShow: Dispatch<number>;
      index: number;
    },
    ref
  ) => {
    const { setPicture, pictures, imagesEditMode } =
      useContext(AdsUploadContext);

    const saveAdsPicture = (e: any) => {
      let _pic = [...pictures];

      _pic.splice(0, 1, e);
      setPicture(_pic);
    };
    // const ref = useRef();

    // useEffect(()=>{
    //     alert('dd')
    //     if (ref.current){
    //         let image_gallery_div = ref.current;
    //         console.log(image_gallery_div, 'dddd')
    //     }
    // },[ref])
    // console.log(index);
    console.log(pictures[0]);
    return (
      <ModalSkeleton
        overflow={true}
        back={"transparent"}
        show={show}
        setShow={() => setShow(-1)}
        flex={"column"}
      >
        <ImageEditorRc
          ref={ref}
          crossOrigin="true" // boolean, set it to true if your image is cors protected or it is hosted on cloud like aws s3 image server
          src={pictures[0]}
          style={{
            display: "flex",
            flexDirection: "column",
            height: "40vh !important",
          }}
          aspectRatio={"16 / 9"}
          className={"editImages"}
          buttone={"چرخش"}
          guides={true}
          rotatable={true}
          imageName="image name with extension to download"
          saveImage={(e: any) => {
            saveAdsPicture(e);
            setShow(-1);
          }} // it has to catch the returned data and do it whatever you want
          responseType="blob/base64"
        />
        <Close onClick={() => setShow(-1)}>
          <Image
            height={30}
            width={30}
            src={"/icons/white-close-modal.svg"}
            alt=""
          />
        </Close>
      </ModalSkeleton>
    );
  }
);
ImageEditor.displayName = "ImageEditor";
export default ImageEditor;
