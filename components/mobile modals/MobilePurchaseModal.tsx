import React, { Dispatch, useState } from "react";
import MobileModalSkeleton from "./MobileModalSkeleton";
import styled from "styled-components";
import Image from "next/image";
import {
  SpaceProps,
  space,
  FlexboxProps,
  flexbox,
  LayoutProps,
  layout,
} from "styled-system";
import CostTicket from "../profile/CostTicket";
import { Clicked, Post } from "../../types";

const Img = styled.div<SpaceProps>`
  &.cursor {
    cursor: pointer;
  }
  ${space}
`;

const Flex = styled.div<FlexboxProps | SpaceProps>`
  display: flex;
  align-items: center;
  &.head {
    position: relative;
    padding-bottom: 10px;
    &::after {
      position: absolute;
      content: "";
      display: block;
      bottom: 0;
      height: 1px;
      background: grey;
      width: 100%;
      margin: 10px 0;
    }
  }

  ${flexbox}
  ${space}
`;
const Header = styled.div<FlexboxProps>`
  &::after {
    content: "";
    display: block;
    height: 1px;
    background: #db143d;
    margin: 10px 0;
  }
  ${flexbox}
`;

const Num = styled.div`
  color: #db143d;
  font-size: 18px;
`;
const SumPrice = styled.div`
  position: static;
  backdrop-filter: blur(4px);
  bottom: 20px;
  left: 0;
  right: 0;
  padding: 20px 30px;
  margin: 0px -20px -10px -20px;
`;
const Content = styled.div`
  overflow-y: scroll;
  max-height: 60vh;
  overscroll-behavior: contain;
`;

const PayButton = styled.div`
  background: #db143d;
  border-radius: 10px;
  color: white;
  padding: 5px 20px;
  cursor: pointer;
  margin: auto 0;
  display: flex;
  align-items: center;
`;

const Whole = styled.div<LayoutProps>`
  ${layout}
`;
export default function MobilePurchaseModal(props: {
  price: any;
  vasPrices: any;
  pay: boolean;
  setPay: Dispatch<boolean>;
  payInvoice: Function;
  payment: number;
  ads: Post;
  download: string;
}) {
  let initial;
  if (Boolean(props.payment)) {
    initial = {};
  } else {
    initial = { 0: { price: props.price.price / 10, id: props.price.id } };
  }
  // console.log(initial,'initial')
  const [clicked, handleOnClick] = useState<Clicked>(initial);
  const [loading, setLoading] = useState(false);

  function setBasket(id: number, price: number) {
    let _clicked = clicked;

    if (clicked.hasOwnProperty(id)) {
      delete _clicked[id];
    } else {
      _clicked = { ..._clicked, [id]: { id: id, price } };
    }

    handleOnClick({ ..._clicked });
  }

  return (
    <Whole display={["block", "none"]}>
      <MobileModalSkeleton
        show={props.pay}
        setshow={props.setPay}
        title={"پرداخت و ثبت آگهی"}
        icon={"/icons/purchase modal.svg"}
      >
        <div style={{ flex: "1 1 100%" }}>
          <Content className={"scroll-d-none"}>
            {!Boolean(props.payment) && (
              <CostTicket
                bg={"white"}
                title={props.price.name}
                price={
                  props.price.price == 0
                    ? "رایگان"
                    : (props.price.price / 10).toLocaleString()
                }
                flag={true}
                handleOnclick={void 0}
              />
            )}
            {props.vasPrices.map(
              (item: {
                id: number;
                vas_id: string | number;
                price: any;
                name: string;
              }) => {
                if (item.id === 1) {
                  if (props.ads.status === 1)
                    return (
                      <CostTicket
                        key={item.id}
                        bg={"white"}
                        title={item["name"]}
                        price={(item.price / 10).toLocaleString()}
                        flag={clicked.hasOwnProperty(item.id)}
                        handleOnclick={() =>
                          setBasket(item.id, item.price / 10)
                        }
                      />
                    );
                  else return null;
                } else {
                  return (
                    <CostTicket
                      key={item.id}
                      bg={"white"}
                      title={item["name"]}
                      price={(item.price / 10).toLocaleString()}
                      flag={clicked.hasOwnProperty(item.id)}
                      handleOnclick={() => setBasket(item.id, item.price / 10)}
                    />
                  );
                }
              }
            )}
          </Content>
        </div>
        <SumPrice>
          <Flex className={"head"} justifyContent={"space-between"}>
            <div>مبلغ کل</div>
            <Flex>
              <Num>
                {Object.keys(clicked)
                  // @ts-ignore
                  .reduce(function (acc: string, elem: string): number {
                    // @ts-ignore
                    return parseInt(acc) + parseInt(clicked[elem].price);
                  }, 0)
                  .toLocaleString()}
              </Num>
              <div>تومان</div>
            </Flex>
          </Flex>
          <Flex justifyContent={"space-between"}>
            <Flex>
              {props.download === "myket" && (
                <div style={{ marginLeft: "10px", cursor: "pointer" }}>
                  <Image
                    src={"/icons/myket.png"}
                    height={86}
                    width={81}
                    alt=""
                  />
                </div>
              )}

              {props.download === "bazar" && (
                <div style={{ marginLeft: "10px", cursor: "pointer" }}>
                  <Image
                    src={"/icons/bazar.png"}
                    height={86}
                    width={81}
                    alt=""
                  />
                </div>
              )}
              {/*<div style={{marginLeft:'10px',cursor:'pointer'}}>*/}
              {/*    <Image src={'/icons/sepah.svg'} height={'86px'} width={'81px'}/>*/}
              {/*</div>*/}
              {/*<div style={{cursor:'pointer'}}>*/}
              {/*    <Image src={'/icons/pasargad.svg'} height={'86px'} width={'81px'}/>*/}
              {/*</div>*/}
            </Flex>
            <PayButton
              onClick={() =>
                props.payInvoice(clicked, props.price.id, setLoading)
              }
            >
              {loading && (
                <img
                  src={"/icons/loading_j.gif"}
                  height={20}
                  width={20}
                  alt=""
                />
              )}
              پرداخت
            </PayButton>
          </Flex>
        </SumPrice>
      </MobileModalSkeleton>
    </Whole>
  );
}
