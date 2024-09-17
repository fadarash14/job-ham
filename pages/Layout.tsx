import dynamic from "next/dynamic";
import React, { PropsWithChildren, useState } from "react";
const MobileSideBar = dynamic(
  () => import("@/components/profile/MobileSideBar"),
  {
    ssr: false,
  }
);
import {
  Placeholder,
  MobliePlaceholder,
} from "@/components/Layout/AppBarPlaceHolder";
import FiltersModal from "@/components/jobs/FiltersModal";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { OpenJobsFiltersModal } from "@/store/pageConfig";
const AppBarPlaceholder = () => <Placeholder />;
const MPlaceholder = () => <MobliePlaceholder />;
const MobileAppbar = dynamic(() => import("@/components/header/MobileAppbar"), {
  loading: () => <MobliePlaceholder />,
});
const AppBar = dynamic(() => import("@/components/header/appBar"), {
  loading: () => <AppBarPlaceholder />,
});

export default function Layout({ children }: PropsWithChildren) {
  const dispatch = useAppDispatch();
  const isFilterOpen = useAppSelector(
    (state) => state.pageConfig.jobFiltersModal
  );
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  const handleModalOpen = () => {};

  const handleModalClose = () => {
    dispatch(OpenJobsFiltersModal(false));
  };
  const handleMenuModalClose = () => {
    setIsMenuOpen(false);
  };
  const handleMenuOpen = () => {
    setIsMenuOpen(true);
  };
  const notShowPages = ["/job-detail"];
  const notValidMobileAppbar = ["/job-detail/[...id]"];
  const renderAppBar = () => {
    const isMainPage = router.pathname === "/[[...key]]" ? true : false;
    return (
      <>
        {isMainPage ? (
          <AppBar
            bg={"lipstick"}
            color={"white"}
            line={"1px solid white"}
            logo={true}
            button={"rgba(255,255,255,0.16)"}
            profilePage={router.pathname.startsWith("/user")}
            mainPage={false}
            onOpen={handleModalOpen}
          />
        ) : (
          <AppBar
            bg={"#F5F6FA"}
            color={"black"}
            line={"1px solid black"}
            logo={false}
            button={"rgba(255,255,255,0.16)"}
            profilePage={false}
            mainPage={true}
            onOpen={handleModalOpen}
          />
        )}
      </>
    );
  };
  const renderMoblieAppBar = () => {
    const isJobPage = router.pathname === "/jobs/[[...key]]" ? true : false;
    return (
      <>
        {isJobPage && (
          <FiltersModal isOpen={isFilterOpen} onClose={handleModalClose} />
        )}
        {!notValidMobileAppbar.includes(router.pathname) && (
          <MobileAppbar onOpen={handleMenuOpen} />
        )}
        <MobileSideBar isOpen={isMenuOpen} onClose={handleMenuModalClose} />
      </>
    );
  };

  return (
    <>
      {renderAppBar()}
      {renderMoblieAppBar()}
      {children}
    </>
  );
}
