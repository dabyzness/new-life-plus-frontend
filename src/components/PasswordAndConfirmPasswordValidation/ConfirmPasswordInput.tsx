import React, { useRef, ChangeEventHandler, KeyboardEventHandler } from "react";
import { WasFocused } from "../RegistrationForm/RegistrationForm";

import styles from "./ConfirmPasswordInput.module.css";

export interface ConfirmPasswordInputProps {
  passwordValue: string;
  confirmPasswordMatch: boolean;
  handleChange: ChangeEventHandler<HTMLInputElement>;
  handleValidation: KeyboardEventHandler<HTMLInputElement>;
  setWasFocused: Function;
  wasFocused: WasFocused;
}

function ConfirmPasswordInput(props: ConfirmPasswordInputProps) {
  const iconRef = useRef<HTMLElement>(null);

  function handleBlur() {
    if (!props.wasFocused.confirmPassword) {
      props.setWasFocused({ ...props.wasFocused, confirmPassword: true });
    }
    return;
  }

  return (
    <>
      <input
        className={`${styles.confirmPasswordInput} ${
          !props.confirmPasswordMatch && props.wasFocused.confirmPassword
            ? "input-error"
            : ""
        }`}
        type="password"
        name="confirmPassword"
        autoComplete="off"
        // placeholder="Re-enter Password"
        value={props.passwordValue}
        onChange={props.handleChange}
        onKeyUp={props.handleValidation}
        onBlur={handleBlur}
        required
      />
      <label
        className={`${props.passwordValue ? "notEmpty" : ""}`}
        htmlFor="confirmPassword"
      >
        Re-Enter Password
      </label>
      <i
        className={`${
          props.wasFocused.confirmPassword ? "validator-icon" : ""
        } ${
          props.confirmPasswordMatch && props.passwordValue
            ? "valid-icon"
            : "invalid-icon"
        }`}
        ref={iconRef}
      ></i>

      <ul
        className={`validation-prompt-container ${
          !props.confirmPasswordMatch && props.wasFocused.confirmPassword
            ? "has-errors"
            : ""
        }`}
      >
        <li
          className={`${
            !props.confirmPasswordMatch &&
            props.wasFocused.confirmPassword &&
            props.passwordValue
              ? "input-invalid"
              : "input-valid"
          }`}
        >
          Password does not match
        </li>

        <li
          className={`${
            !props.passwordValue && props.wasFocused.confirmPassword
              ? "input-invalid"
              : "input-valid"
          }`}
        >
          Password confirmation is required
        </li>
      </ul>

      {/* <span className={""}></span> */}

      {/* <div
        className={`${styles.confirmPasswordValidation} ${
          props.confirmPasswordMatch ? styles.validInput : styles.notValidInput
        }`}
      >
        Password Does not match
      </div> */}
    </>
  );
}

export { ConfirmPasswordInput };
