import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";

/**
 * Hook that alerts clicks outside of the passed ref
 */
export function useOutsideAlerter(
  ref: React.RefObject<HTMLDivElement | null>,
  setShow: (show: boolean) => void
) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
  function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setShow(false); // Call the setShow function when clicked outside
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, setShow]);
}

/**
 * Component that alerts if you click outside of it
 */
function DetectOutSideClick(props: {
  children: React.ReactNode;
  setShow: (show: boolean) => void;
}) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  useOutsideAlerter(wrapperRef, props.setShow); // Pass setShow as a parameter

  return <div ref={wrapperRef}>{props.children}</div>;
}

DetectOutSideClick.propTypes = {
  children: PropTypes.element.isRequired,
  setShow: PropTypes.func.isRequired, // Add propTypes for setShow
};

export default DetectOutSideClick;
