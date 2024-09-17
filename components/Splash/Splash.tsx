import dynamic from "next/dynamic";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import {
  showLoginModal,
  showLogoutModal,
  showSupportModal,
} from "../../store/pageConfig";
const ModalWrapper = dynamic(() => import("../log in/ModalWrapper"), {
  ssr: false,
});
const LogOutModal = dynamic(() => import("../profile/LogOutModal"), {
  ssr: false,
});
const LoginModal = dynamic(() => import("../jobs/LoginModal"), {
  ssr: false,
});
import { useQuery } from "@tanstack/react-query";
import { mutation } from "../../utils/request";
import { exitProfile } from "../../store/sign";
import Cookies from "js-cookie";
import styled from "styled-components";
import SupportModal from "../wizard/SupportModal";

const Whole = styled.div`
  z-index: 10300;
`;

export default function Splash() {
  const {
    showLoginModal: show,
    showLogout,
    showLogin,
    showSupport,
  } = useAppSelector((state) => state.pageConfig);
  const dispatch = useAppDispatch();
  useEffect(() => {
    //@ts-ignore
    if (typeof window !== "undefined" && window.rahnama) {
      //@ts-ignore
      if (window?.rahnama?.setVersion) {
        //@ts-ignore
        window?.rahnama?.setVersion(process.env.VERSION);
      }
    }
  }, []);

  let token = Cookies.get("token");

  function checkToken() {
    return mutation(
      "checkToken",
      null,
      { status: true, errorCode: true, errorMessage: true },
      { token: token }
    );
  }

  const { data } = useQuery({
    queryKey: ["checkToken"],
    queryFn: checkToken,
    enabled: !!token,
    gcTime: 0,
    staleTime: 0,
  });

  useEffect(() => {
    if (data && !data.status) {
      dispatch(exitProfile());
    }
  }, [data]);

  return (
    <Whole>
      {show && (
        <ModalWrapper
          show={show}
          setShow={(e) => dispatch(showLoginModal(e))}
        />
      )}
      {showLogout && (
        <LogOutModal
          logOut={showLogout}
          setLogOut={(e) => dispatch(showLogoutModal(e))}
        />
      )}
      {showLogin && (
        <LoginModal
          login={showLogin}
          setLogin={(e) => dispatch(showLoginModal(e))}
        />
      )}
      {showSupport && (
        <SupportModal
          setShow={(e) => dispatch(showSupportModal(e))}
          show={showSupport}
        />
      )}
    </Whole>
  );
}
