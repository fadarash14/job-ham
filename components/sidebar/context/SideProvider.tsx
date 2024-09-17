import SideBarContext from "./SideBarContext";
import {
  ReactChildren,
  ReactChild,
  useState,
  useEffect,
  PropsWithChildren,
} from "react";

export default function SideProvider(props: PropsWithChildren) {
  const [modalCityIsOpen, openModalCity] = useState<boolean>(false);
  const [sideBarIsOpen, openSideBar] = useState(false);
  const [currentFilters, setCurrentFilters] = useState<string[]>([]);
  const [openFilter, setOpenFilter] = useState<number>(-1);

  return (
    <SideBarContext.Provider
      value={{
        modalCityIsOpen,
        openModalCity,
        sideBarIsOpen,
        openSideBar,
        currentFilters,
        setCurrentFilters,
        openFilter,
        setOpenFilter,
      }}
    >
      {props.children}
    </SideBarContext.Provider>
  );
}
