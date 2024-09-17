import React, { useState } from "react";
import styled from "styled-components";
import UplaodBanner from "./UploadBanner";
import Image from "next/image";
const Content = styled.div<{ banner: string }>`
  display: flex;
  border-top-right-radius: 16px;
  border-top-left-radius: 16px;
  width: 100%;
  height: 180px;
  background-image: ${({ banner }) => `url("${banner}")`};
  background-size: cover;
  background-repeat: no-repeat;
  position: relative;
  img {
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
  }
`;
type Props = {
  url: string;
  id: number;
};
const Banner = ({ url, id }: Props) => {
  const bannerSrc = "/icons/company-banner.svg";
  const [image, setImage] = useState(url);
  return (
    <>
      {" "}
      <Image src={image} alt="" width={100} height={100} />
      <Content banner={image ? image : bannerSrc}>
        <UplaodBanner image={image ? image : ""} id={id} setImage={setImage} />
      </Content>
    </>
  );
};

export default Banner;
