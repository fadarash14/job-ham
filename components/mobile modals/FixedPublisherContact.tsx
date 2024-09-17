import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import MobileContactModal from "../mobile modals/single agahi/MobileContactModal";
import { layout, LayoutProps } from "styled-system";
import { CSSTransition } from "react-transition-group";
import _ from "lodash";
import { loadContact } from "../../requests/contact";
import { useRouter } from "next/router";

const Contact = styled.div<HTMLElement | LayoutProps | { shadow: boolean }>(
  (props) => {
    return {
      padding: "5px 15px 20px 15px",
      background: "#F5F6FA",
      position: "fixed",
      bottom: 0,
      width: "100%",
      zIndex: 1021,
      //@ts-ignore
      boxShadow: props.shadow ? "" : "#f5f6fa 0px -20px 29px 0px",
    };
  },
  [layout]
);

const ContactInfo = styled.div`
  background: #db143d;
  border-radius: 10px;
  color: white;
  text-align: center;
  flex: 1 1 100%;
  display: flex;
  padding: 10px;
  font-weight: bolder;
  & > div {
    margin: auto;
  }
`;

export default function FixedPublisherContact(props: { contact: any }) {
  const [show, setShow] = useState(false);
  const [shadow, setShadow] = useState(false);
  const [contactInfo, setContact] = useState<
    Partial<{ mobile: string; email: string; telephone: string }>
  >(props.contact);

  const moreToCome = useCallback(
    _.throttle((e: any) => {
      if (window.scrollY + 174 === window.innerHeight) {
        setShadow(true);
      } else {
        setShadow(false);
      }
    }, 100),
    []
  );

  useEffect(() => {
    window.addEventListener("scroll", moreToCome);

    return () => {
      window.removeEventListener("scroll", moreToCome);
    };
  }, [moreToCome]);

  return (
    <Contact shadow={shadow} display={["flex", "none"]}>
      <ContactInfo onClick={() => setShow(true)}>
        <div>اطـلاعـات تمـاس آگهی دهنده</div>
      </ContactInfo>
      <MobileContactModal
        contactInfo={contactInfo}
        show={show}
        setshow={setShow}
      />
    </Contact>
  );
}
