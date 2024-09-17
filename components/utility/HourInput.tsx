import React, { useState, useEffect, useRef } from "react";
import { isValid } from "./HourInputValidate";
import styled from "styled-components";

const Input = styled.input`
  font-weight: 300;
  display: flex;
  width: 100%;
  height: 26px;
  outline: none;
  border: 1px solid #d1d1d1;
  border-radius: 4px;
  align-items: center;
 justify-content: center;
  text-align: center;
  &:focus {
    outline-style: none;
  }
  &::-webkit-search-cancel-button {
    -webkit-appearance: none;
  }
  &::-webkit-search-decoration {
    -webkit-appearance: none;
  }
`;

interface TimeInputProps {
  initTime?: string;
  disabled?: boolean;
  mountFocus?: boolean;
  onTimeChange: (time: string) => void;
  type?: string;
  onFocusHandler?: (event: React.FocusEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
  name?: string;
  onBlurHandler?: (event: React.FocusEvent<HTMLInputElement>) => void;
  value?: string;
}

const TimeInput: React.FC<TimeInputProps> = ({
  initTime,
  disabled,
  mountFocus,
  onTimeChange,
  type,
  onFocusHandler,
  placeholder,
  className,
  name,
  onBlurHandler,
}) => {
  const [time, setTime] = useState<string>(initTime || "");

  const _input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!disabled && mountFocus) {
      setTimeout(() => {
        _input.current?.focus();
      }, 0);
    }
  });

  let lastVal = "";

  const onChangeHandler = (val: string) => {
    if (val === time) {
      return;
    }
    if (isValid(val)) {
      if (val.length === 2 && lastVal.length !== 3 && val.indexOf(":") === -1) {
        val = val + ":";
      }

      if (val.length === 2 && lastVal.length === 3) {
        val = val.slice(0, 1);
      }

      if (val.length > 5) {
        return false;
      }

      lastVal = val;
      setTime(val);

      if (val.length === 5) {
        onTimeChange(val);
      }
    }
  };

  const getType = (): string => {
    if (type) {
      return type;
    }
    return "tel";
  };

  useEffect(() => {
    setTime(initTime || "");
  }, [disabled, initTime]);

  return (
    <Input
      name={name || undefined}
      className={className}
      type={getType()}
      disabled={disabled}
      placeholder={placeholder}
      value={time}
      onChange={(e) => onChangeHandler(e.target.value)}
      onFocus={onFocusHandler ? (e) => onFocusHandler(e) : undefined}
      onBlur={onBlurHandler ? (e) => onBlurHandler(e) : undefined}
      ref={_input}
      min={0}
    />
  );
};

TimeInput.defaultProps = {
  placeholder: " ",
};

export default TimeInput;
