import React from "react";
import { TextBodyMedium } from "../typo";
import { BtnProps } from "./BtnProps";

export const ButtonTransparent = (props: BtnProps) => {
  const { children, icon, type, disabled, className = "" } = props;

  return (
    <button
      className={`btn
      hover:bg-transparent hover:text-green-3
      focus:bg-transparent focus:text-green-2
      focus-visible:bg-transparent focus-visible:text-green-2
      focus-visible:outline-green-2
      normal-case ${className}`}
      type={type}
      disabled={disabled}
    >
      {icon}
      <TextBodyMedium className={icon ? "ml-2" : ""}>{children}</TextBodyMedium>
    </button>
  );
};