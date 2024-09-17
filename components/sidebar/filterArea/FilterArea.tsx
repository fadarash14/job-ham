import React, { useState } from "react";
import styled from "styled-components";
// @ts-ignore
import CreateAbleSelect from "react-select/creatable";

const WithFilter = styled.div`
  display: flex;
  flex-direction: column;
`;

const Yellow = styled.span`
  color: #fcc155;
  font-size: 14px;
  margin-right: 10px;
`;

const Form = styled.div`
  display: flex;
  margin: 10px;
`;

const options = [
  { value: "70", label: "70 میلیون تومان" },
  { value: "90", label: "90 میلیون تومان" },
  { value: "110", label: "110 میلیون تومان" },
];

export default function FilterArea() {
  const [ariaFocusMessage, setAriaFocusMessage] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const style = {
    blockquote: {
      fontStyle: "italic",
      fontSize: ".75rem",
      margin: "1rem 0",
    },
    label: {
      fontSize: ".75rem",
      fontWeight: "bold",
      lineHeight: 2,
    },
  };

  const onMenuOpen = () => setIsMenuOpen(true);
  const onMenuClose = () => setIsMenuOpen(false);

  const customStyles = {
    indicatorsContainer: () => ({
      position: "absolute",
      left: "-10px",
      top: "-10px",
    }),
    indicatorContainer: () => ({
      padding: "0",
    }),
    control: () => ({
      minWidth: "119px",
      height: "20px",
      background: "transparent",
      borderBottom: "1px solid rgba(255,255,255,0.5)",
      fontsize: "14px",
      marginRight: "10px",
      position: "relative",
      "&:hover": {
        borderBottom: "2px solid #fcc155",
      },
    }),
    placeholder: () => ({
      fontSize: "14px",
      lineHeight: "15px",
      opacity: "0.5",
    }),
    valueContainer: () => ({
      height: "20px",
    }),
    input: () => ({
      color: "white",
      fontSize: "14px",
      position: "absolute",
      top: "0",
    }),
    singleValue: () => ({
      position: "absolute",
      top: "0",
      fontSize: "14px",
      color: "white",
      overflow: "none",
      minWidth: "119px",
      lineHeight: "15px",
    }),
    menu: () => ({
      minWidth: "119px",
      color: "black",
      background: "white",
      fontSize: "12px",
      position: "absolute",
      top: "100%",
      zIndex: "2",
      marginRight: "10px",
      direction: "ltr",
      textAlign: "right",
      borderBottomLeftRadius: "14px",
      borderBottomRightRadius: "14px",
    }),
    menuList: () => ({
      overflowY: "scroll",
      height: "100px",
      marginRight: "3px",
      paddingRight: "3px",
    }),
  };

  return (
    <WithFilter>
      <Form>
        <Yellow>از</Yellow>
        <CreateAbleSelect
          isClearable
          aria-labelledby="aria-label"
          inputId="aria-example-input"
          name="aria-live-color"
          onMenuOpen={onMenuOpen}
          onMenuClose={onMenuClose}
          options={options}
          placeholder={"مثلا 70 متر"}
        />
      </Form>
      <Form>
        <Yellow>تا</Yellow>
        <CreateAbleSelect
          isClearable
          aria-labelledby="aria-label2"
          inputId="aria-example-input2"
          name="aria-live-color2"
          onMenuOpen={onMenuOpen}
          onMenuClose={onMenuClose}
          options={options}
          placeholder={"مثلا 110 متر"}
        />
      </Form>
    </WithFilter>
  );
}
