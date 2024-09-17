import CombinedCv from "@/components/cv/templates/CombinedCv";
import Moderncv from "@/components/cv/templates/Moderncv";
import SimpleCv from "@/components/cv/templates/SimpleCv";
import Footer from "@/components/footer/Footer";
import Address from "@/components/utility/Address";
import Box from "@/components/utility/Box";
import Container from "@/components/utility/Container";
import { getCV } from "@/requests/cv";
import { convertCv } from "@/utils/helper";
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import styled, { keyframes } from "styled-components";
import { IState } from "@/store/cv";
import {
  LayoutProps,
  SpaceProps,
  space,
  layout,
  FontSizeProps,
  FontWeightProps,
  ColorProps,
  color,
  fontSize,
  fontWeight,
  PositionProps,
  position,
} from "styled-system";
const BoxLayout = styled((props) => <Box {...props} />)<
  PositionProps | ColorProps
>(position, color);

const AddressWrapper = styled.div<LayoutProps | SpaceProps>`
  width: 90%;
  margin: 0 auto;
`;
const Divider = styled.div`
  flex-grow: 1;
  border-bottom: 1px solid #d1d1d1;
  height: 1rem;
`;
const Header = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
  margin-top: 10px;
  width: 100%;
`;
const Body = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-bottom: 10px;
  gap: 10px;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
  margin: 0 auto;

  & .cv {
    min-width: 387px;
    max-width: 640px;
    border: 1px solid transparent;
    transition: border-color 0.3s ease;
    &:hover {
      border-color: black;
    }
  }
`;
const ImageWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
type Data = Omit<IState, "isEdited" | "level">;
const Span = styled.span<
  FontSizeProps | FontWeightProps | SpaceProps | LayoutProps | ColorProps
>`
  text-align: right;
  // min-width: 20px;
  white-space: nowrap;
  ${color}
  ${fontSize}
  ${fontWeight}
  ${space}
  ${layout}
`;
const Title = styled.div<LayoutProps | SpaceProps>`
  display: flex;
  justify-content: center;
  ${space}
  ${layout}
`;

export default function Cvs() {
  const router = useRouter();
  const modernCvRef = useRef(null);
  const simpleCvRef = useRef(null);
  const combinedCvRef = useRef(null);
  const id = router.query.id;
  const handlePrintSimple = useReactToPrint({
    removeAfterPrint: true,
    content: () => simpleCvRef.current,
  });
  const handlePrintModern = useReactToPrint({
    removeAfterPrint: true,
    content: () => modernCvRef.current,
  });
  const handlePrintCombined = useReactToPrint({
    removeAfterPrint: true,
    content: () => combinedCvRef.current,
  });

  const address = router.pathname.split("/").splice(0, 4).join("/");
  let token: string = Cookies.get("token")!;
  const { data, isLoading, isFetched } = useQuery({
    queryKey: ["myResume"],
    queryFn: () => getCV(token),
    select: (res) => {
      const newData: Data = convertCv(res.data);

      return newData;
    },
    gcTime: Infinity,
  });
  return (
    <BoxLayout
      p={["0"]}
      // bg={"white"}
      height={"100%"}
      position={"static"}
      display={"flex"}
      flexDirection={"column"}
    >
      <Container>
        <AddressWrapper>
          <Address address={address} />
        </AddressWrapper>
        <Header>
          <Title>
            <Span color={"#474546"} fontSize={14}>
              قالب
            </Span>
          </Title>
          <Divider></Divider>
        </Header>
        {!isLoading ? (
          <Body>
            {id === "1" && (
              <SimpleCv
                onClick={handlePrintSimple}
                className="cv"
                ref={simpleCvRef}
                data={data!}
              />
            )}
            {id === "2" && (
              <Moderncv
                onClick={handlePrintModern}
                className="cv"
                ref={modernCvRef}
                data={data!}
              />
            )}
            {id === "3" && (
              <CombinedCv
                onClick={handlePrintCombined}
                className="cv"
                ref={combinedCvRef}
                data={data!}
              />
            )}
          </Body>
        ) : (
          <ImageWrapper>
            <Image
              src={"/icons/loading_j.gif"}
              height={100}
              width={100}
              alt=""
            />
          </ImageWrapper>
        )}
      </Container>
      <Footer isProfile />
    </BoxLayout>
  );
}
