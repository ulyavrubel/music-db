import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const modalRoot = document.getElementById("modal");

const Modal = ({ children }) => {
  //refs in func components, like this in class components.
  //They're containers of state that live outside a function's closure state which means anytime I refer to elRef.current,
  //it's always referring to the same element (not like useState which returns var refered to the state of var when that function was called)
  const elRef = useRef(null);
  if (!elRef.current) {
    elRef.current = document.createElement("div");
  }

  useEffect(() => {
    modalRoot.appendChild(elRef.current);
    return () => modalRoot.removeChild(elRef.current); //cleaning up - removing div after modal is no longer beeing rendered
  }, []);

  return createPortal(<div>{children}</div>, elRef.current);
};

export default Modal;
