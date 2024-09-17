import styled from "styled-components";
import ISoftware from "../../../public/icons/download_red.svg";
import Image from "next/image";
import Link from "next/link";

const Footer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  direction: rtl;
  justify-content: space-between;
  margin-top: 20px;
  cursor: pointer;
`;

const Software = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: rgba(71, 69, 70, 0.66);
  border-radius: 20px;
  padding: 12px;
  position: relative;
  width: 182px;
  height: 80px;
`;

const Apps = styled.div`
  display: flex;
`;
const Profile = styled.div`
  display: flex;
  color: white;
`;
const Img = styled.div`
  cursor: pointer;
  height: 24px;
  &:not(:last-child) {
    margin-left: 5px;
  }
`;
const Span = styled.span`
  font-size: 12px;
  font-weight: 500;
  margin: auto;
  margin-right: 10px;
`;
const Namad = styled.div`
  flex: 1 1;
  height: 100%;
  object-fit: cover;
`;
const A = styled.a`
  cursor: pointer;
  width: 100%;
`;

export default function DownloadApp() {
  return (
    <Footer>
      <Link href={"/download"}>
        <Software>
          <Profile>
            <ISoftware />
            <Span>دانــلـود اپـلیـکـیــشـن</Span>
          </Profile>
          <Apps>
            <Img>
              <Image height={24} width={24} src={"/icons/android.svg"} alt="" />
            </Img>
            <Img>
              <Image height={24} width={24} src={"/icons/ios.svg"} alt="" />
            </Img>
            <Img>
              <Image height={24} width={24} src={"/icons/bazar.svg"} alt="" />
            </Img>
          </Apps>
        </Software>
      </Link>
      <Namad>
        {/* eslint-disable-next-line react/jsx-no-target-blank */}
        <a
          referrerPolicy="origin"
          target="_blank"
          //   rel="noopener"
          href="https://trustseal.enamad.ir/?id=189770&Code=usAG2JRqnaOtgrDtM8Xe"
        >
          <img
            referrerPolicy="origin"
            src="/Enamad.png"
            alt="نماد اعتماد الکترونیک"
            style={{ cursor: "pointer", width: "100%" }}
            id="usAG2JRqnaOtgrDtM8Xe"
          />
        </a>
      </Namad>
    </Footer>
  );
}
