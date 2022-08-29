import React from "react";
import { classesOf } from "../../../../utils";
import { InputProps } from "../InputProps";
import { CalendarIcon } from "../../../icons";
import { TextBodyStandard } from "../../typography";

export const InputDate = (props: InputProps) => {
  const {
    value,
    placeholder,
    label,
    inputId,
    className = "",
    disabled = false,
    onChange,
    type,
  } = props;

  const firstValue = String(value) === "undefined" ? "" : String(value);
  const [localValue, setLocalValue] = React.useState(firstValue);
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocalValue(event.target.value);
    onChange?.(event.target.value);
  };

  const inputClasses = classesOf(
    "input w-full h-11",
    "focus:outline-none bg-light-2 text-black-4 dark:bg-black-2 dark:text-light-0",
    "placeholder:text-dark-4 placeholder:dark:text-dark-2",
    "disabled:placeholder:text-black-3 disabled:placeholder:opacity-20",
    "disabled:dark:text-black-3 disabled:dark:placeholder:text-black-3 disabled:dark:bg-black-2 disabled:text-dark-4 disabled:bg-light-2 disabled:border-none",
    "focus:dark:placeholder:text-light-0 focus:placeholder:text-black-4",
    "invalid:border-red-1 invalid:dark:border-red-1",
    !disabled &&
      "hover:placeholder:text-dark-3 hover:dark:placeholder:text-dark-3 hover:text-dark-3"
  );

  return (
    <>
      {label && (
        <label className="mb-2 block" htmlFor={inputId}>
          <TextBodyStandard className="dark:text-dark-3">
            {label}
          </TextBodyStandard>
        </label>
      )}
      <div
        className={`relative rounded-lg    
        text-dark-4 dark:text-dark-2 
        bg-light-2 dark:bg-black-2 
        hover:text-dark-3 hover:dark:text-dark-3
        focus-within:text-dark-3 focus-within:dark:text-dark-3 
        ${className}`}
      >
        <div className="pointer-events-none absolute right-4 bg-light-2 dark:bg-black-2" style={{top: 11}}>
          <button>
            <CalendarIcon size={20} />
          </button>
        </div>

        <input
          id={inputId}
          type={type}
          onChange={handleOnChange}
          className={inputClasses}
          disabled={disabled}
          value={localValue}
          placeholder={placeholder}
        />
      </div>
    </>
  );
};
