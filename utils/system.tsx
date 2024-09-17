import React, { FC, PropsWithChildren } from "react";
import { ThemeProvider } from "styled-components";
import App from "next/app";
import theme from "./theme";

export const ThemeSystem: FC<PropsWithChildren> = (props) => (
  <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
);

export default App;
