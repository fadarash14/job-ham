import React from "react";
import { SideBarContextProps } from "../../../types";

const SideBarContext = React.createContext<Partial<SideBarContextProps>>({
  modalCityIsOpen: false,
  sideBarIsOpen: false,
  currentFilters: [],
  openModalCity: () => {},
});
export default SideBarContext;
